import { chapters, topics } from "../utils/topicCatalog.js";

export default function Sidebar({ activeGroup, onSelect, hasDialog }) {
  return (
    <aside className="side-rail" inert={hasDialog}>
      <a href="#top" className="brand-lockup" aria-label="Signal Room, home">
        <span className="brand-mark">
          <svg viewBox="0 0 36 36" aria-hidden="true">
            <path d="M4 19h7l4-10 7 19 4-9h6" />
          </svg>
        </span>
        <span className="brand-name">
          signal<span>/</span>room<small>INTEGRATION GUIDE</small>
        </span>
      </a>
      <div className="rail-rule" />
      <nav className="chapter-nav" aria-label="Guide chapters">
        <p className="nav-label">CHAPTERS</p>
        <button
          className={`nav-item ${activeGroup === "all" ? "is-active" : ""}`}
          aria-current={activeGroup === "all" ? "page" : undefined}
          onClick={() => onSelect("all")}
        >
          <span className="nav-icon nav-all">⌂</span>
          <span className="nav-copy">
            All topics<small>Browse the whole guide</small>
          </span>
          <span className="nav-count">{topics.length}</span>
        </button>
        {chapters.map((chapter) => {
          const count = topics.filter((item) => item.group === chapter.id).length;
          return (
            <button
              key={chapter.id}
              className={`nav-item ${activeGroup === chapter.id ? "is-active" : ""}`}
              aria-current={activeGroup === chapter.id ? "page" : undefined}
              onClick={() => onSelect(chapter.id)}
            >
              <span className={`nav-icon color-${chapter.color}`}>{chapter.code}</span>
              <span className="nav-copy">
                {chapter.short}
                <small>{chapter.label}</small>
              </span>
              <span className="nav-count">{count}</span>
            </button>
          );
        })}
      </nav>
      <div className="rail-bottom">
        <div className="rail-rule" />
        <div className="rail-callout">
          <span className="callout-mark">↳</span>
          <div>
            <b>Start with the flow</b>
            <p>Follow a message from start to recovery.</p>
          </div>
        </div>
        <div className="rail-meta">
          <span>GUIDE / 01</span>
          <span>AZURE + SUPPORT</span>
        </div>
      </div>
    </aside>
  );
}
