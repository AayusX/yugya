/**
 * Stockwise — fictional sample data for the inventory demo.
 * The shop, suppliers, stock counts, and prices are invented.
 */

import type { TourStep } from "@/lib/demos/tour";

export type StockwiseView = "dashboard" | "products" | "sales" | "alerts";

export const STOCKWISE_SHOP = {
  name: "Butwal Hardware & Suppliers",
  address: "Traffic Chowk, Butwal-11, Rupandehi",
  hours: "Open 8:00 – 18:30",
};

export type StockwiseProduct = {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  rack: string;
  supplier: string;
  stock: number;
  cost: number;
  price: number;
  lowAt: number;
};

export const STOCKWISE_CATEGORIES = [
  "Electrical",
  "Plumbing",
  "Hardware",
  "Paint & finishing",
  "Tools",
];

export const STOCKWISE_UNITS = ["piece", "pair", "set", "roll", "box", "bag", "bottle"];

export const STOCKWISE_SUPPLIERS = [
  "Himalayan Electricals",
  "Rupandehi Plumbing Supply",
  "Butwal Hardware Depot",
  "Lumbini Paints",
  "Siddhartha Tools",
];

export const STOCKWISE_PRODUCTS: StockwiseProduct[] = [
  { id: "sw-p01", sku: "EL-1042", name: "LED bulb 9W, pack of 2", category: "Electrical", unit: "piece", rack: "E1", supplier: "Himalayan Electricals", stock: 46, cost: 240, price: 320, lowAt: 12 },
  { id: "sw-p02", sku: "EL-1055", name: "Extension board, 4 socket", category: "Electrical", unit: "piece", rack: "E1", supplier: "Himalayan Electricals", stock: 8, cost: 610, price: 780, lowAt: 10 },
  { id: "sw-p03", sku: "EL-1061", name: "Copper wire 1.5mm, 90m roll", category: "Electrical", unit: "roll", rack: "E2", supplier: "Himalayan Electricals", stock: 14, cost: 2210, price: 2650, lowAt: 4 },
  { id: "sw-p04", sku: "EL-1078", name: "MCB 16A, single pole", category: "Electrical", unit: "piece", rack: "E2", supplier: "Himalayan Electricals", stock: 35, cost: 185, price: 260, lowAt: 10 },
  { id: "sw-p05", sku: "EL-1083", name: "Switch socket 6A", category: "Electrical", unit: "piece", rack: "E2", supplier: "Himalayan Electricals", stock: 52, cost: 98, price: 145, lowAt: 15 },
  { id: "sw-p06", sku: "PL-2011", name: "PVC elbow 25mm", category: "Plumbing", unit: "piece", rack: "P1", supplier: "Rupandehi Plumbing Supply", stock: 3, cost: 28, price: 45, lowAt: 20 },
  { id: "sw-p07", sku: "PL-2024", name: "Tap mixer, basin type", category: "Plumbing", unit: "piece", rack: "P1", supplier: "Rupandehi Plumbing Supply", stock: 11, cost: 1120, price: 1450, lowAt: 3 },
  { id: "sw-p08", sku: "PL-2036", name: "GI pipe 1 inch, 6m", category: "Plumbing", unit: "piece", rack: "P2", supplier: "Rupandehi Plumbing Supply", stock: 22, cost: 810, price: 990, lowAt: 5 },
  { id: "sw-p09", sku: "PL-2047", name: "PVC pipe 1 inch, 3m", category: "Plumbing", unit: "piece", rack: "P2", supplier: "Rupandehi Plumbing Supply", stock: 18, cost: 330, price: 420, lowAt: 6 },
  { id: "sw-p10", sku: "PL-2059", name: "Solvent cement 100ml", category: "Plumbing", unit: "piece", rack: "P1", supplier: "Rupandehi Plumbing Supply", stock: 9, cost: 130, price: 180, lowAt: 6 },
  { id: "sw-p11", sku: "HW-3012", name: "Padlock 50mm, brass body", category: "Hardware", unit: "piece", rack: "H1", supplier: "Butwal Hardware Depot", stock: 17, cost: 430, price: 560, lowAt: 6 },
  { id: "sw-p12", sku: "HW-3027", name: "Hinge pair 4 inch, steel", category: "Hardware", unit: "pair", rack: "H1", supplier: "Butwal Hardware Depot", stock: 2, cost: 135, price: 190, lowAt: 10 },
  { id: "sw-p13", sku: "HW-3038", name: "Wood screws 2 inch, box of 100", category: "Hardware", unit: "box", rack: "H2", supplier: "Butwal Hardware Depot", stock: 26, cost: 165, price: 240, lowAt: 8 },
  { id: "sw-p14", sku: "HW-3044", name: "Door handle, aluminium", category: "Hardware", unit: "piece", rack: "H2", supplier: "Butwal Hardware Depot", stock: 13, cost: 640, price: 850, lowAt: 4 },
  { id: "sw-p15", sku: "PA-4015", name: "Wall putty 25kg", category: "Paint & finishing", unit: "bag", rack: "F1", supplier: "Lumbini Paints", stock: 9, cost: 930, price: 1150, lowAt: 4 },
  { id: "sw-p16", sku: "PA-4022", name: "Paint brush 4 inch", category: "Paint & finishing", unit: "piece", rack: "F1", supplier: "Lumbini Paints", stock: 24, cost: 105, price: 150, lowAt: 8 },
  { id: "sw-p17", sku: "PA-4031", name: "Thinner 1 litre", category: "Paint & finishing", unit: "bottle", rack: "F2", supplier: "Lumbini Paints", stock: 4, cost: 290, price: 380, lowAt: 6 },
  { id: "sw-p18", sku: "TL-5014", name: "Power drill 650W with bit set", category: "Tools", unit: "set", rack: "T1", supplier: "Siddhartha Tools", stock: 5, cost: 3950, price: 4800, lowAt: 2 },
  { id: "sw-p19", sku: "TL-5021", name: "Spirit level 600mm", category: "Tools", unit: "piece", rack: "T1", supplier: "Siddhartha Tools", stock: 6, cost: 540, price: 720, lowAt: 3 },
  { id: "sw-p20", sku: "TL-5033", name: "Measuring tape 5m", category: "Tools", unit: "piece", rack: "T2", supplier: "Siddhartha Tools", stock: 28, cost: 175, price: 260, lowAt: 8 },
];

export type StockwiseSaleLine = {
  productId: string;
  qty: number;
  rate: number;
};

export type StockwiseSale = {
  id: string;
  time: string;
  payment: "Cash" | "Online";
  lines: StockwiseSaleLine[];
  total: number;
};

/** Three bills already written today, so the day book starts with history. */
export const STOCKWISE_SALES: StockwiseSale[] = [
  {
    id: "B-0141",
    time: "09:12",
    payment: "Cash",
    lines: [
      { productId: "sw-p01", qty: 3, rate: 320 },
      { productId: "sw-p05", qty: 1, rate: 145 },
    ],
    total: 1105,
  },
  {
    id: "B-0142",
    time: "10:05",
    payment: "Online",
    lines: [
      { productId: "sw-p16", qty: 2, rate: 150 },
      { productId: "sw-p17", qty: 1, rate: 380 },
    ],
    total: 680,
  },
  {
    id: "B-0143",
    time: "11:40",
    payment: "Cash",
    lines: [
      { productId: "sw-p11", qty: 1, rate: 560 },
      { productId: "sw-p12", qty: 1, rate: 190 },
    ],
    total: 750,
  },
];

export const STOCKWISE_STEPS: TourStep[] = [
  {
    id: "sw-welcome",
    title: "Welcome to Stockwise",
    body:
      "A working counter and stock ledger for a fictional hardware shop in Butwal. Everything runs in your browser on sample records, and nothing is sent anywhere. The tour takes about two minutes and can be skipped at any step.",
  },
  {
    id: "sw-daybook",
    view: "dashboard",
    target: "sw-daybook",
    title: "Today, on one page",
    body:
      "The day book lists the bills written today and adds them up. The takings, item counts, and reorder count are sums of the records in this list \u2014 nothing is typed twice.",
    action: "Try it \u2014 write a bill, then return here to see it join the day book.",
  },
  {
    id: "sw-stock",
    view: "products",
    target: "sw-stock",
    title: "Every item is a stock card",
    body:
      "SKU, rack, supplier, cost, and selling price sit on the same record as the count. The ledger can be searched or filtered, and items at or below their reorder level are marked where you would see them.",
    action: "Try it \u2014 switch the ledger to low stock only.",
  },
  {
    id: "sw-bill",
    view: "sales",
    target: "sw-bill",
    title: "A bill that moves the shelf",
    body:
      "Add items to the bill and the line amounts and bill total are computed. Completing it writes the bill to the day book and takes the quantities off stock, while an over-sale is refused with the count that is actually there.",
    action: "Try it \u2014 add a line, then complete the bill.",
  },
  {
    id: "sw-reorder",
    view: "alerts",
    target: "sw-reorder",
    title: "Reorder by supplier",
    body:
      "Items at or below their reorder level are grouped by the supplier who delivers them, with a suggested quantity. Receiving adds the units to stock and clears the item from the list.",
    action: "Try it \u2014 receive one of the items.",
  },
];
