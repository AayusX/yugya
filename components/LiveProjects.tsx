import Link from "next/link";
import { LIVE_PROJECTS, type LiveProject } from "@/lib/projects";

function LiveStatus({ status }: { status: LiveProject["status"] }) {
  return (
    <span className="live-status">
      <span aria-hidden="true" />
      {status}
    </span>
  );
}

/**
 * Full editorial entries for /work/. Each entry shows the project, its visible
 * category, a factual description, the live status, a visit link and genuine
 * desktop/mobile screenshots captured from the live site.
 */
export function LiveProjectEntries() {
  return (
    <div className="live-projects">
      {LIVE_PROJECTS.map((project, index) => (
        <article className="project-entry live-project reveal" id={project.id} key={project.id}>
          <div className="project-entry-head">
            <span className="num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="live-project-category">{project.category}</p>
              <h2>{project.name}</h2>
            </div>
            <LiveStatus status={project.status} />
          </div>

          <div className="live-project-body">
            <div className="live-project-copy">
              <p className="lead">{project.description}</p>

              <dl className="live-project-facts">
                {project.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="live-project-actions">
                <a
                  className="btn btn-secondary"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Visit live website <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <span className="live-project-domain">{project.domain}</span>
              </div>
            </div>

            <div className="live-project-previews">
              <figure className="live-project-desktop">
                <div className="live-project-frame">
                  <img
                    src={project.desktopImage}
                    alt={project.desktopAlt}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>Desktop · {project.captured}</figcaption>
              </figure>

              <figure className="live-project-mobile">
                <div className="live-project-frame">
                  <img
                    src={project.mobileImage}
                    alt={project.mobileAlt}
                    width={390}
                    height={844}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>Mobile · {project.captured}</figcaption>
              </figure>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Compact rows for the home page. They link to the full entry on /work/ so the
 * live-site link and the factual project notes stay together.
 */
export function LiveProjectIndex() {
  return (
    <div className="live-project-index">
      {LIVE_PROJECTS.map((project) => (
        <Link
          className="live-project-row reveal"
          href={`/work/#${project.id}`}
          key={project.id}
        >
          <img
            className="live-project-row-thumb"
            src={project.thumbImage}
            alt={`${project.name} live website preview`}
            width={360}
            height={225}
            loading="lazy"
            decoding="async"
          />
          <div className="live-project-row-copy">
            <div className="live-project-row-top">
              <h3>{project.name}</h3>
              <LiveStatus status={project.status} />
            </div>
            <p className="live-project-row-category">
              {project.category} · {project.domain}
            </p>
            <p className="live-project-row-detail">{project.description}</p>
          </div>
          <span className="arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </div>
  );
}
