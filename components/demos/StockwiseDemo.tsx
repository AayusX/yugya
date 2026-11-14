"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  STOCKWISE_CATEGORIES,
  STOCKWISE_PRODUCTS,
  STOCKWISE_SALES,
  STOCKWISE_SHOP,
  STOCKWISE_SUPPLIERS,
  STOCKWISE_UNITS,
  type StockwiseProduct,
  type StockwiseSale,
  type StockwiseView,
} from "@/lib/demos/stockwise";
import { useDemoWindow } from "./demo-shared";

const VIEWS: Array<{ id: StockwiseView; label: string }> = [
  { id: "dashboard", label: "Counter" },
  { id: "products", label: "Stock" },
  { id: "sales", label: "Sales" },
  { id: "alerts", label: "Reorder" },
];

type BillLine = { productId: string; qty: number };

type ProductDraft = {
  sku: string;
  name: string;
  category: string;
  unit: string;
  rack: string;
  supplier: string;
  stock: string;
  cost: string;
  price: string;
  lowAt: string;
};

const EMPTY_PRODUCT: ProductDraft = {
  sku: "",
  name: "",
  category: STOCKWISE_CATEGORIES[0],
  unit: STOCKWISE_UNITS[0],
  rack: "",
  supplier: STOCKWISE_SUPPLIERS[0],
  stock: "",
  cost: "",
  price: "",
  lowAt: "",
};

function rs(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function activityStamp(): string {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function unitWord(count: number, unit: string): string {
  if (count === 1) return unit;
  return unit.endsWith("x") ? `${unit}es` : `${unit}s`;
}

function plural(count: number, word: string): string {
  return `${count} ${unitWord(count, word)}`;
}

export default function StockwiseDemo() {
  const { activeView, setView } = useDemoWindow();
  const [products, setProducts] = useState<StockwiseProduct[]>(STOCKWISE_PRODUCTS);
  const [sales, setSales] = useState<StockwiseSale[]>(STOCKWISE_SALES);
  const [nextBill, setNextBill] = useState(144);
  const [billLines, setBillLines] = useState<BillLine[]>([]);
  const [payment, setPayment] = useState<"Cash" | "Online">("Cash");
  const [pickerId, setPickerId] = useState(STOCKWISE_PRODUCTS[0].id);
  const [pickerQty, setPickerQty] = useState("1");
  const [billError, setBillError] = useState("");
  const [lastBill, setLastBill] = useState<{ id: string; total: number; items: number } | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [lowOnly, setLowOnly] = useState(false);
  const [draft, setDraft] = useState<ProductDraft>(EMPTY_PRODUCT);
  const [addError, setAddError] = useState("");
  const [addDone, setAddDone] = useState("");
  const [activity, setActivity] = useState<Array<{ time: string; text: string }>>([]);
  // Mounted only inside the demo overlay, so this never renders on the server.
  const [today] = useState(() => new Date());

  const dayName = today.toLocaleDateString("en-GB", { weekday: "long" });
  const dateLabel = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const byId = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products]
  );

  const lowStock = useMemo(
    () => products.filter((product) => product.stock <= product.lowAt),
    [products]
  );

  const takings = useMemo(
    () => sales.reduce((total, sale) => total + sale.total, 0),
    [sales]
  );

  const dayItems = useMemo(
    () =>
      sales.reduce(
        (total, sale) => total + sale.lines.reduce((count, line) => count + line.qty, 0),
        0
      ),
    [sales]
  );

  const inventoryValue = useMemo(
    () => products.reduce((total, product) => total + product.stock * product.cost, 0),
    [products]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (lowOnly && product.stock > product.lowAt) return false;
      if (!query) return true;
      return (
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.supplier.toLowerCase().includes(query)
      );
    });
  }, [products, search, category, lowOnly]);

  const draftLines = useMemo(
    () =>
      billLines.flatMap((line) => {
        const product = byId.get(line.productId);
        if (!product) return [];
        return [{ ...line, product, amount: line.qty * product.price }];
      }),
    [billLines, byId]
  );

  const billTotal = draftLines.reduce((total, line) => total + line.amount, 0);
  const billQty = draftLines.reduce((total, line) => total + line.qty, 0);
  const pickerProduct = byId.get(pickerId);
  const pickerTaken = billLines.find((line) => line.productId === pickerId)?.qty ?? 0;
  const pickerAvailable = pickerProduct ? pickerProduct.stock - pickerTaken : 0;

  const supplierGroups = useMemo(() => {
    return STOCKWISE_SUPPLIERS.map((supplier) => {
      const items = lowStock
        .filter((product) => product.supplier === supplier)
        .map((product) => ({
          product,
          suggested: Math.max(1, product.lowAt + 10 - product.stock),
        }));
      return { supplier, items };
    }).filter((group) => group.items.length > 0);
  }, [lowStock]);

  const pushActivity = (text: string) => {
    setActivity((current) => [{ time: activityStamp(), text }, ...current]);
  };

  const addLine = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = byId.get(pickerId);
    if (!product) {
      setBillError("Choose an item from the shelf list.");
      return;
    }
    const qty = Number(pickerQty);
    if (!Number.isInteger(qty) || qty < 1) {
      setBillError("Quantity must be a whole number of at least 1.");
      return;
    }
    const alreadyOnBill = billLines.find((line) => line.productId === product.id)?.qty ?? 0;
    const available = product.stock - alreadyOnBill;
    if (available <= 0) {
      setBillError(
        `${product.name} is out of stock on the shelf. Receive a delivery before billing it.`
      );
      return;
    }
    if (qty > available) {
      setBillError(
        `Only ${plural(available, "unit")} of ${product.name} are left off the shelf.`
      );
      return;
    }

    setBillLines((current) => {
      const existing = current.find((line) => line.productId === product.id);
      if (existing) {
        return current.map((line) =>
          line.productId === product.id ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [...current, { productId: product.id, qty }];
    });
    setPickerQty("1");
    setBillError("");
    setLastBill(null);
  };

  const removeLine = (productId: string) => {
    setBillLines((current) => current.filter((line) => line.productId !== productId));
    setBillError("");
  };

  const completeBill = () => {
    if (billLines.length === 0) {
      setBillError("Add at least one line before completing the bill.");
      return;
    }
    const id = `B-${String(nextBill).padStart(4, "0")}`;
    const sale: StockwiseSale = {
      id,
      time: activityStamp(),
      payment,
      lines: billLines.map((line) => ({
        productId: line.productId,
        qty: line.qty,
        rate: byId.get(line.productId)?.price ?? 0,
      })),
      total: billTotal,
    };
    setProducts((current) =>
      current.map((product) => {
        const line = billLines.find((entry) => entry.productId === product.id);
        return line ? { ...product, stock: product.stock - line.qty } : product;
      })
    );
    setSales((current) => [sale, ...current]);
    setNextBill((value) => value + 1);
    setBillLines([]);
    setBillError("");
    setLastBill({ id, total: billTotal, items: billQty });
    pushActivity(`${id} completed — ${plural(billQty, "item")}, ${rs(billTotal)} ${payment.toLowerCase()}.`);
  };

  const receiveStock = (product: StockwiseProduct) => {
    const qty = Math.max(1, product.lowAt + 10 - product.stock);
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id ? { ...item, stock: item.stock + qty } : item
      )
    );
    pushActivity(`Received ${plural(qty, product.unit)} of ${product.name} from ${product.supplier}.`);
  };

  const setField = <K extends keyof ProductDraft>(field: K, value: ProductDraft[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setAddError("");
    setAddDone("");
  };

  const addProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sku = draft.sku.trim().toUpperCase();
    const name = draft.name.trim();
    const rack = draft.rack.trim().toUpperCase();
    const stock = Number(draft.stock);
    const cost = Number(draft.cost);
    const price = Number(draft.price);
    const lowAt = Number(draft.lowAt);

    if (sku.length < 4) {
      setAddError("Give the item a SKU of at least four characters, such as EL-1090.");
      return;
    }
    if (products.some((product) => product.sku.toUpperCase() === sku)) {
      setAddError(`SKU ${sku} is already on another stock card.`);
      return;
    }
    if (name.length < 3) {
      setAddError("Give the item a name the counter would recognise.");
      return;
    }
    if (!rack) {
      setAddError("Give the shelf or rack location, such as E3.");
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setAddError("Opening stock must be a whole number of units.");
      return;
    }
    if (!Number.isFinite(cost) || cost <= 0) {
      setAddError("Enter the cost price per unit in rupees.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setAddError("Enter the selling price per unit in rupees.");
      return;
    }
    if (!Number.isInteger(lowAt) || lowAt < 1) {
      setAddError("Set a reorder level of at least 1.");
      return;
    }

    const product: StockwiseProduct = {
      id: `sw-p${Date.now()}`,
      sku,
      name,
      category: draft.category,
      unit: draft.unit,
      rack,
      supplier: draft.supplier,
      stock,
      cost,
      price,
      lowAt,
    };

    setProducts((current) => [...current, product]);
    setDraft({ ...EMPTY_PRODUCT, category: draft.category, supplier: draft.supplier });
    setSearch("");
    setCategory("all");
    setLowOnly(false);
    setAddError("");
    setAddDone(
      `${sku} added — ${plural(stock, product.unit)} on rack ${rack} at ${rs(price)} each.`
    );
    pushActivity(`Stock card created — ${name} (${sku}), ${plural(stock, product.unit)}.`);
  };

  return (
    <div className="sw-shell">
      <header className="sw-sign">
        <div className="sw-sign-row">
          <p className="sw-sign-brand">
            <span className="sw-sign-mark" aria-hidden="true">
              BH
            </span>
            <span className="sw-sign-name">
              <strong>{STOCKWISE_SHOP.name}</strong>
              <small>{STOCKWISE_SHOP.address}</small>
            </span>
          </p>
          <p className="sw-sign-meta">
            <span>{STOCKWISE_SHOP.hours}</span>
            <small>
              {dayName}, {dateLabel}
            </small>
          </p>
        </div>

        <nav className="sw-tabs" aria-label="Stockwise sections">
          {VIEWS.map((view) => {
            const count =
              view.id === "products"
                ? products.length
                : view.id === "alerts"
                  ? lowStock.length
                  : view.id === "sales" && billLines.length > 0
                    ? billLines.length
                    : null;
            return (
              <button
                key={view.id}
                type="button"
                className="sw-tab"
                aria-current={activeView === view.id ? "page" : undefined}
                onClick={() => setView(view.id)}
              >
                <span>{view.label}</span>
                {count !== null ? (
                  <small className={view.id === "alerts" && lowStock.length > 0 ? "is-alert" : undefined}>
                    {count}
                  </small>
                ) : null}
              </button>
            );
          })}
        </nav>
      </header>

      <div className="sw-page">
        {activeView === "dashboard" ? (
          <section className="sw-view" aria-labelledby="sw-day-title">
            <div className="sw-viewhead">
              <p className="sw-kicker">Counter · {dateLabel}</p>
              <h1 id="sw-day-title">The day book</h1>
              <p className="sw-lede">
                Every figure below is summed from the bills and the stock records in this
                session — nothing is entered twice.
              </p>
            </div>

            <section className="sw-till" aria-label="Today at a glance">
              <dl>
                <dt>Bills</dt>
                <dd>{sales.length}</dd>
              </dl>
              <dl>
                <dt>Items sold</dt>
                <dd>{dayItems}</dd>
              </dl>
              <dl>
                <dt>Takings</dt>
                <dd>{rs(takings)}</dd>
              </dl>
              <dl>
                <dt>Due for reorder</dt>
                <dd className={lowStock.length > 0 ? "is-alert" : undefined}>
                  {lowStock.length}
                </dd>
              </dl>
            </section>

            <div className="sw-daygrid">
              <div className="sw-sheet" data-tour="sw-daybook">
                <header className="sw-sheet-head">
                  <h2>Bills written today</h2>
                  <p>
                    {plural(sales.length, "bill")} · {plural(dayItems, "item")}
                  </p>
                </header>
                <ol className="sw-bills">
                  {sales.map((sale) => (
                    <li key={sale.id} className="sw-bill-row">
                      <p className="sw-bill-id">
                        <strong>{sale.id}</strong>
                        <small>
                          {sale.time} · {sale.payment}
                        </small>
                      </p>
                      <p className="sw-bill-what">
                        {sale.lines.map((line) => {
                          const product = byId.get(line.productId);
                          return (
                            <span key={line.productId}>
                              {line.qty} × {product?.name ?? "Item"}
                            </span>
                          );
                        })}
                      </p>
                      <p className="sw-bill-amount">{rs(sale.total)}</p>
                    </li>
                  ))}
                </ol>
                <div className="sw-sheet-foot">
                  <p>
                    Day total <strong>{rs(takings)}</strong>
                  </p>
                  <button type="button" className="sw-link" onClick={() => setView("sales")}>
                    Write a bill <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>

              <aside className="sw-side">
                <section className="sw-sideblock" aria-labelledby="sw-mini-title">
                  <h2 id="sw-mini-title">Reorder now</h2>
                  {lowStock.length > 0 ? (
                    <ul className="sw-minilist">
                      {lowStock.slice(0, 4).map((product) => (
                        <li key={product.id}>
                          <span>{product.name}</span>
                          <small>
                            {product.stock} on hand · reorder at {product.lowAt}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="sw-empty">Every item is above its reorder level.</p>
                  )}
                  <button type="button" className="sw-link" onClick={() => setView("alerts")}>
                    Open the reorder list <span aria-hidden="true">→</span>
                  </button>
                </section>

                <section className="sw-sideblock" aria-labelledby="sw-session-title">
                  <h2 id="sw-session-title">This session</h2>
                  {activity.length > 0 ? (
                    <ol className="sw-log">
                      {activity.slice(0, 6).map((entry) => (
                        <li key={`${entry.time}-${entry.text}`}>
                          <time>{entry.time}</time>
                          <span>{entry.text}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="sw-empty">
                      Completing a bill or receiving a delivery is written here with the time
                      it happened.
                    </p>
                  )}
                </section>
              </aside>
            </div>
          </section>
        ) : null}

        {activeView === "products" ? (
          <section className="sw-view" aria-labelledby="sw-stock-title">
            <div className="sw-viewhead">
              <p className="sw-kicker">Stock ledger</p>
              <h1 id="sw-stock-title">Stock on hand</h1>
              <p className="sw-lede">
                {plural(products.length, "item")} across {STOCKWISE_CATEGORIES.length} categories
                · {lowStock.length} at or below the reorder level · stock value{" "}
                {rs(inventoryValue)} at cost
              </p>
            </div>

            <div className="sw-stockgrid">
              <div className="sw-ledger" data-tour="sw-stock">
                <div className="sw-toolbar">
                  <label className="sw-search">
                    <span className="sw-label">Search</span>
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Item, SKU or supplier"
                      autoComplete="off"
                    />
                  </label>
                  <label className="sw-selectfield">
                    <span className="sw-label">Category</span>
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option value="all">All categories</option>
                      {STOCKWISE_CATEGORIES.map((entry) => (
                        <option key={entry} value={entry}>
                          {entry}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="sw-toggle"
                    aria-pressed={lowOnly}
                    onClick={() => setLowOnly((value) => !value)}
                  >
                    Low stock only
                  </button>
                  <p className="sw-count">
                    {filtered.length} of {products.length}
                  </p>
                </div>

                <div className="sw-tablewrap">
                  <table className="sw-table">
                    <caption className="sw-sr">
                      Stock cards with SKU, location, supplier, count and prices
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">Item</th>
                        <th scope="col">Rack</th>
                        <th scope="col" className="sw-num">Unit</th>
                        <th scope="col" className="sw-num">Stock</th>
                        <th scope="col" className="sw-num">Reorder</th>
                        <th scope="col" className="sw-num">Cost</th>
                        <th scope="col" className="sw-num">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((product) => {
                        const low = product.stock <= product.lowAt;
                        return (
                          <tr key={product.id} className={low ? "sw-row-low" : undefined}>
                            <td className="sw-sku">{product.sku}</td>
                            <th scope="row">
                              <span className="sw-item-name">{product.name}</span>
                              <small className="sw-item-supplier">{product.supplier}</small>
                            </th>
                            <td className="sw-rack">{product.rack}</td>
                            <td className="sw-num sw-unit">{product.unit}</td>
                            <td className="sw-num sw-stockcell">
                              <strong>{product.stock}</strong>
                              {low ? (
                                <span className="sw-flag">{product.stock === 0 ? "Out" : "Low"}</span>
                              ) : null}
                            </td>
                            <td className="sw-num sw-muted">{product.lowAt}</td>
                            <td className="sw-num sw-muted">{rs(product.cost)}</td>
                            <td className="sw-num">{rs(product.price)}</td>
                          </tr>
                        );
                      })}
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="sw-empty-row">
                            Nothing matches “{search}” with this category. Clear the search or
                            choose another category.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>

                <p className="sw-footnote">
                  Counts change when a bill is completed or a delivery is received. Cost is what
                  the shop paid per unit; price is what the counter charges.
                </p>
              </div>

              <form className="sw-cardform" onSubmit={addProduct} noValidate>
                <h2>New stock card</h2>
                <p className="sw-formnote">
                  The item joins the same ledger the counter bills from.
                </p>

                <label className="sw-field">
                  <span className="sw-label">Item name</span>
                  <input
                    value={draft.name}
                    onChange={(event) => setField("name", event.target.value)}
                    placeholder="e.g. Insulation tape 19mm"
                    autoComplete="off"
                  />
                </label>

                <div className="sw-field-row">
                  <label className="sw-field">
                    <span className="sw-label">SKU</span>
                    <input
                      value={draft.sku}
                      onChange={(event) => setField("sku", event.target.value)}
                      placeholder="EL-1090"
                      autoComplete="off"
                    />
                  </label>
                  <label className="sw-field">
                    <span className="sw-label">Category</span>
                    <select
                      value={draft.category}
                      onChange={(event) => setField("category", event.target.value)}
                    >
                      {STOCKWISE_CATEGORIES.map((entry) => (
                        <option key={entry} value={entry}>
                          {entry}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="sw-field-row">
                  <label className="sw-field">
                    <span className="sw-label">Unit</span>
                    <select
                      value={draft.unit}
                      onChange={(event) => setField("unit", event.target.value)}
                    >
                      {STOCKWISE_UNITS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="sw-field">
                    <span className="sw-label">Rack</span>
                    <input
                      value={draft.rack}
                      onChange={(event) => setField("rack", event.target.value)}
                      placeholder="E3"
                      autoComplete="off"
                    />
                  </label>
                </div>

                <label className="sw-field">
                  <span className="sw-label">Supplier</span>
                  <select
                    value={draft.supplier}
                    onChange={(event) => setField("supplier", event.target.value)}
                  >
                    {STOCKWISE_SUPPLIERS.map((supplier) => (
                      <option key={supplier} value={supplier}>
                        {supplier}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="sw-field-row">
                  <label className="sw-field">
                    <span className="sw-label">Opening stock</span>
                    <input
                      inputMode="numeric"
                      value={draft.stock}
                      onChange={(event) => setField("stock", event.target.value)}
                      placeholder="0"
                      autoComplete="off"
                    />
                  </label>
                  <label className="sw-field">
                    <span className="sw-label">Reorder at</span>
                    <input
                      inputMode="numeric"
                      value={draft.lowAt}
                      onChange={(event) => setField("lowAt", event.target.value)}
                      placeholder="8"
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="sw-field-row">
                  <label className="sw-field">
                    <span className="sw-label">Cost (Rs.)</span>
                    <input
                      inputMode="numeric"
                      value={draft.cost}
                      onChange={(event) => setField("cost", event.target.value)}
                      placeholder="0"
                      autoComplete="off"
                    />
                  </label>
                  <label className="sw-field">
                    <span className="sw-label">Price (Rs.)</span>
                    <input
                      inputMode="numeric"
                      value={draft.price}
                      onChange={(event) => setField("price", event.target.value)}
                      placeholder="0"
                      autoComplete="off"
                    />
                  </label>
                </div>

                {addError ? (
                  <p className="sw-error" role="alert">
                    {addError}
                  </p>
                ) : null}
                {addDone ? (
                  <p className="sw-confirmed" role="status">
                    {addDone}
                  </p>
                ) : null}

                <button type="submit" className="sw-primary">
                  Add to the ledger
                </button>
              </form>
            </div>
          </section>
        ) : null}

        {activeView === "sales" ? (
          <section className="sw-view" aria-labelledby="sw-bill-title">
            <div className="sw-viewhead">
              <p className="sw-kicker">Counter · new bill</p>
              <h1 id="sw-bill-title">Write a bill</h1>
              <p className="sw-lede">
                Line amounts and the bill total are computed. The shelf count changes when the
                bill is completed, not before.
              </p>
            </div>

            <div className="sw-billgrid">
              <div className="sw-billpad" data-tour="sw-bill">
                <form className="sw-addline" onSubmit={addLine} noValidate>
                  <label className="sw-field sw-addline-item">
                    <span className="sw-label">Item</span>
                    <select
                      value={pickerId}
                      onChange={(event) => setPickerId(event.target.value)}
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} — {product.stock} {product.unit} in stock
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="sw-field sw-addline-qty">
                    <span className="sw-label">Quantity</span>
                    <input
                      inputMode="numeric"
                      value={pickerQty}
                      onChange={(event) => setPickerQty(event.target.value)}
                      autoComplete="off"
                    />
                  </label>
                  <button type="submit" className="sw-primary sw-addline-btn">
                    Add line
                  </button>
                  <p className="sw-available">
                    {pickerProduct
                      ? `${plural(pickerAvailable, pickerProduct.unit)} available to bill`
                      : "Choose an item"}
                  </p>
                </form>

                {billError ? (
                  <p className="sw-error" role="alert">
                    {billError}
                  </p>
                ) : null}
                {lastBill ? (
                  <p className="sw-confirmed" role="status">
                    {lastBill.id} completed — {plural(lastBill.items, "item")},{" "}
                    {rs(lastBill.total)}. The bill is in the day book and stock is updated.
                  </p>
                ) : null}

                <div className="sw-lineswrap">
                  <table className="sw-lines">
                    <caption className="sw-sr">Lines on the current bill</caption>
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col" className="sw-num">
                          Rate
                        </th>
                        <th scope="col" className="sw-num">
                          Qty
                        </th>
                        <th scope="col" className="sw-num">
                          Amount
                        </th>
                        <th scope="col">
                          <span className="sw-sr">Remove</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {draftLines.map((line) => (
                        <tr key={line.productId}>
                          <th scope="row">{line.product.name}</th>
                          <td className="sw-num sw-muted">{rs(line.product.price)}</td>
                          <td className="sw-num">{line.qty}</td>
                          <td className="sw-num">{rs(line.amount)}</td>
                          <td className="sw-remove-cell">
                            <button
                              type="button"
                              className="sw-remove"
                              onClick={() => removeLine(line.productId)}
                              aria-label={`Remove ${line.product.name} from the bill`}
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                      {draftLines.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="sw-empty-row">
                            No lines yet. Add an item from the shelf list above.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>

                <div className="sw-billfoot">
                  <fieldset className="sw-pay">
                    <legend className="sw-label">Payment</legend>
                    <div className="sw-pay-options">
                      {(["Cash", "Online"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="sw-pay-btn"
                          aria-pressed={payment === option}
                          onClick={() => setPayment(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <p className="sw-billtotal">
                    <span>
                      {plural(billQty, "item")} on the bill
                    </span>
                    <strong>{rs(billTotal)}</strong>
                  </p>

                  <button type="button" className="sw-primary sw-complete" onClick={completeBill}>
                    Complete bill
                  </button>
                </div>

                <p className="sw-footnote">
                  Completing the bill takes these quantities off stock and files it in the day
                  book. Selling more than the shelf holds is refused.
                </p>
              </div>

              <aside className="sw-billside" aria-labelledby="sw-today-bills">
                <h2 id="sw-today-bills">Today’s bills</h2>
                <ol className="sw-bills sw-bills-compact">
                  {sales.map((sale) => (
                    <li key={sale.id} className="sw-bill-row">
                      <p className="sw-bill-id">
                        <strong>{sale.id}</strong>
                        <small>{sale.time}</small>
                      </p>
                      <p className="sw-bill-amount">{rs(sale.total)}</p>
                    </li>
                  ))}
                </ol>
                <p className="sw-daytotal">
                  Takings <strong>{rs(takings)}</strong>
                </p>
              </aside>
            </div>
          </section>
        ) : null}

        {activeView === "alerts" ? (
          <section className="sw-view" aria-labelledby="sw-reorder-title">
            <div className="sw-viewhead">
              <p className="sw-kicker">Purchasing</p>
              <h1 id="sw-reorder-title">Reorder list</h1>
              <p className="sw-lede">
                Items at or below the reorder level, grouped by the supplier who delivers them.
                Suggestions are the reorder level plus a ten-unit buffer.
              </p>
            </div>

            <div className="sw-suppliers" data-tour="sw-reorder">
              {supplierGroups.map((group) => (
                <section className="sw-supplier" key={group.supplier}>
                  <header className="sw-supplier-head">
                    <h2>{group.supplier}</h2>
                    <p>{plural(group.items.length, "item")} to reorder</p>
                  </header>
                  <ul className="sw-supplier-list">
                    {group.items.map(({ product, suggested }) => (
                      <li key={product.id}>
                        <div className="sw-reorder-item">
                          <p className="sw-reorder-name">
                            {product.name}
                            <span className="sw-sku">{product.sku}</span>
                          </p>
                          <small>
                            {product.stock} on hand · reorder at {product.lowAt} · rack{" "}
                            {product.rack} · {product.unit}
                          </small>
                        </div>
                        <p className="sw-reorder-qty">
                          Suggest <strong>{suggested}</strong> {unitWord(suggested, product.unit)}
                        </p>
                        <button
                          type="button"
                          className="sw-primary sw-receive"
                          onClick={() => receiveStock(product)}
                        >
                          Receive {suggested}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              {supplierGroups.length === 0 ? (
                <div className="sw-sheet sw-reorder-empty">
                  <h2>Nothing to reorder</h2>
                  <p>
                    Every item is above its reorder level. Items return to this list when a bill
                    takes stock down to the threshold.
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <p className="sw-foot">
          {STOCKWISE_SHOP.name} is a fictional shop. Sample records; this session is not saved
          anywhere.
        </p>
      </div>
    </div>
  );
}
