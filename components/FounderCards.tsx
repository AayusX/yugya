import { FOUNDERS } from "@/lib/site";

/**
 * The two founder portrait cards. Shared by the about page (`#founders`) and
 * the home page so the markup, images and links stay identical in both places.
 * Server component — no state.
 */
export default function FounderCards() {
  return (
    <div className="founder-grid">
      {FOUNDERS.map((founder, index) => (
        <article className="founder-card reveal" key={founder.email}>
          <figure className="founder-portrait">
            <div className="founder-portrait-frame">
              <img
                src={`${founder.imageBase}-1200.jpg`}
                srcSet={`${founder.imageBase}-640.jpg 640w, ${founder.imageBase}-960.jpg 960w, ${founder.imageBase}-1200.jpg 1200w`}
                sizes="(max-width: 900px) calc(100vw - 4rem), 560px"
                alt={founder.alt}
                width={1200}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <span>
                {String(index + 1).padStart(2, "0")} — {founder.role}
              </span>{" "}
              <span>{founder.handle ?? founder.name}</span>
            </figcaption>
          </figure>

          <div className="founder-copy">
            <h3>{founder.name}</h3>
            <dl className="founder-links">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${founder.email}`}>{founder.email}</a>
                </dd>
              </div>
              <div>
                <dt>Portfolio</dt>
                <dd>
                  <a href={founder.portfolio} target="_blank" rel="noreferrer noopener">
                    {founder.portfolioLabel}{" "}
                    <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}
