import Link from "next/link";
import { DEMOS } from "@/lib/demos/registry";

/**
 * The five demo entries, shared by the home page and the work page. Server
 * component; each row links to its demo intro page. Deliberately an editorial
 * list (the same rhythm as the capability rows in globals.css) rather than a
 * card grid, so it reads as part of the studio site instead of a template.
 */
export default function DemoIndex() {
  return (
    <div className="demo-index">
      {DEMOS.map((demo, index) => (
        <Link key={demo.id} className="demo-row reveal" href={demo.path}>
          <span className="num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="demo-row-copy">
            <h3>{demo.name}</h3>
            <p className="demo-row-kind">{demo.kind}</p>
          </div>
          <div className="demo-row-detail">
            <p className="demo-row-tagline">{demo.tagline}</p>
            <p className="demo-row-meta">
              {demo.features.length} modules · Guided tour · {demo.tourNote}
            </p>
          </div>
          <img
            className="demo-row-thumb"
            src={demo.previewThumb}
            alt={`${demo.name} — ${demo.kind} demo preview`}
            width={360}
            height={206}
            loading="lazy"
            decoding="async"
          />
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
