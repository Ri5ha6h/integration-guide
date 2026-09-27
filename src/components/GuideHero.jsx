import RouteMap from "./RouteMap.jsx";
import { topics, chapters } from "../utils/topicCatalog.js";

export default function GuideHero() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" /> A PRACTICAL MAP FOR COMPLEX SYSTEMS
          </div>
          <h1 id="hero-title">
            When systems
            <br />
            <i>need to talk.</i>
          </h1>
          <p className="hero-deck">
            A field guide to Azure integration, secure networks, message flows, EDI, and the people
            who keep them running.
          </p>
          <a className="hero-link" href="#concepts">
            Find your way through <span aria-hidden="true">↓</span>
          </a>
        </div>
        <RouteMap />
      </section>
      <section className="guide-strip" aria-label="How to use this guide">
        <div className="strip-label">
          A useful
          <br />
          mental model
        </div>
        <p>
          Services <b>connect</b> the work. Identity and networks <b>bound</b> it. Messages{" "}
          <b>carry</b> it. Operations <b>restore</b> it.
        </p>
        <div className="strip-count">
          <strong>{topics.length}</strong>
          <span>
            concepts
            <br />
            across {chapters.length} practices
          </span>
        </div>
      </section>
    </>
  );
}
