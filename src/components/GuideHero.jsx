import RouteMap from "./RouteMap.jsx";
import { topics, chapters } from "../utils/topicCatalog.js";

export default function GuideHero() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" /> A GUIDE TO CONNECTED SYSTEMS
          </div>
          <h1 id="hero-title">
            When systems
            <br />
            <i>need to talk.</i>
          </h1>
          <p className="hero-deck">
            A guide to Azure integration, network security, messages, EDI, and the support teams
            that keep systems running.
          </p>
          <a className="hero-link" href="#topics">
            Browse topics <span aria-hidden="true">↓</span>
          </a>
        </div>
        <RouteMap />
      </section>
      <section className="guide-strip" aria-label="How to use this guide">
        <div className="strip-label">
          How it
          <br />
          fits together
        </div>
        <p>
          Services <b>connect</b> systems. Sign-in and network rules <b>control</b> access. Messages{" "}
          <b>move</b> work. Support teams <b>restore</b> service.
        </p>
        <div className="strip-count">
          <strong>{topics.length}</strong>
          <span>
            topics
            <br />
            in {chapters.length} chapters
          </span>
        </div>
      </section>
    </>
  );
}
