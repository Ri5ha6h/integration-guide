import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chapters, findChapter, topics } from "./data";
import "./App.css";

const notes = [
  ["definition", "In plain terms"],
  ["purpose", "What it does"],
  ["usedWhen", "Where it fits"],
  ["why", "Why teams use it"],
  ["operatorNote", "On the operations desk"],
];

function RouteMap() {
  return (
    <div className="route-card" aria-label="A typical integration path from request to resolution">
      <div className="route-card-top">
        <span className="eyebrow">A request, end to end</span>
        <span className="route-live"><i /> SYSTEM PATH</span>
      </div>
      <div className="route-map">
        <div className="route-node node-ingress"><span className="node-indicator" aria-hidden="true" /><span className="node-symbol">↗</span><small>01 / INGRESS</small><b>Request</b><em>Front Door · APIM</em></div>
        <div className="route-node node-orchestrate"><span className="node-indicator" aria-hidden="true" /><span className="node-symbol">⌘</span><small>02 / LOGIC</small><b>Orchestrate</b><em>Logic Apps · Functions</em></div>
        <div className="route-node node-transport"><span className="node-indicator" aria-hidden="true" /><span className="node-symbol">⇢</span><small>03 / TRANSPORT</small><b>Move work</b><em>Service Bus · RabbitMQ</em></div>
        <div className="route-node node-observe"><span className="node-indicator" aria-hidden="true" /><span className="node-symbol">⌁</span><small>04 / SIGNAL</small><b>Observe</b><em>Monitor · App Insights</em></div>
        <div className="route-node node-support"><span className="node-indicator" aria-hidden="true" /><span className="node-symbol">◉</span><small>05 / RESPONSE</small><b>Resolve</b><em>Alerts · ServiceNow</em></div>
      </div>
      <div className="route-foot"><span>IDENTITY + NETWORK GUARD EVERY HOP</span><span className="route-key"><i /> DATA FLOW</span></div>
    </div>
  );
}

function TopicDrawer({ item, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!item) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [item]);
  if (!item) return null;
  const chapter = findChapter(item.group);
  const keepFocusInside = (event) => {
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return (
    <div className="drawer-shade" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className="topic-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onKeyDown={keepFocusInside}>
        <div className="drawer-topline"><span className={`chapter-code color-${chapter.color}`}>{chapter.code}</span><button ref={closeButtonRef} className="close-button" onClick={onClose} aria-label="Close concept details">×</button></div>
        <div className="drawer-intro">
          <span className="eyebrow">{chapter.label}</span>
          <h2 id="drawer-title">{item.title}</h2>
          <p>{item.summary}</p>
        </div>
        <div className="detail-notes">
          {notes.map(([key, label], index) => (
            <article className="detail-note" key={key}>
              <span className="detail-index">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{label}</h3><p>{item[key]}</p></div>
            </article>
          ))}
        </div>
        <div className="drawer-bottom"><span>FIELD NOTE / {chapter.code}-{String(topics.indexOf(item) + 1).padStart(2, "0")}</span><button onClick={onClose}>Back to the guide <span aria-hidden="true">↗</span></button></div>
      </section>
    </div>
  );
}

function App() {
  const [activeGroup, setActiveGroup] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const searchRef = useRef(null);
  const cardTriggerRef = useRef(null);
  const closeTopic = useCallback(() => {
    setSelectedTopic(null);
    window.requestAnimationFrame(() => cardTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape" && selectedTopic) {
        closeTopic();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeTopic, selectedTopic]);

  const visibleTopics = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return topics.filter((item) => {
      const inGroup = activeGroup === "all" || item.group === activeGroup;
      const searchable = [item.title, item.summary, ...notes.map(([key]) => item[key])].join(" ").toLowerCase();
      return inGroup && (!normalized || searchable.includes(normalized));
    });
  }, [activeGroup, query]);

  const sectionTitle = query ? "Search results" : activeGroup === "all" ? "The field guide" : findChapter(activeGroup).short;

  return (
    <div className="app-shell">
      <aside className="side-rail" inert={Boolean(selectedTopic)}>
        <a href="#top" className="brand-lockup" aria-label="Signal Room, home">
          <span className="brand-mark"><svg viewBox="0 0 36 36" aria-hidden="true"><path d="M4 19h7l4-10 7 19 4-9h6" /></svg></span>
          <span className="brand-name">signal<span>/</span>room<small>INTEGRATION FIELD GUIDE</small></span>
        </a>

        <div className="rail-rule" />
        <nav className="chapter-nav" aria-label="Guide chapters">
          <p className="nav-label">THE HANDBOOK</p>
          <button className={`nav-item ${activeGroup === "all" ? "is-active" : ""}`} onClick={() => setActiveGroup("all")}>
            <span className="nav-icon nav-all">⌂</span><span className="nav-copy">All concepts<small>Browse the whole guide</small></span><span className="nav-count">{topics.length}</span>
          </button>
          {chapters.map((chapter) => {
            const count = topics.filter((item) => item.group === chapter.id).length;
            return <button key={chapter.id} className={`nav-item ${activeGroup === chapter.id ? "is-active" : ""}`} onClick={() => setActiveGroup(chapter.id)}>
              <span className={`nav-icon color-${chapter.color}`}>{chapter.code}</span><span className="nav-copy">{chapter.short}<small>{chapter.label}</small></span><span className="nav-count">{count}</span>
            </button>;
          })}
        </nav>

        <div className="rail-bottom">
          <div className="rail-rule" />
          <div className="rail-callout"><span className="callout-mark">↳</span><div><b>Start with the flow</b><p>Follow a message from entry point to recovery.</p></div></div>
          <div className="rail-meta"><span>REFERENCE / 01</span><span>AZURE + OPS</span></div>
        </div>
      </aside>

      <main id="top" className="main-content" inert={Boolean(selectedTopic)}>
        <header className="topbar">
          <div className="breadcrumb"><span>FIELD NOTES</span><b>/</b><span>{activeGroup === "all" ? "SYSTEMS OVERVIEW" : findChapter(activeGroup).code + " / " + findChapter(activeGroup).short.toUpperCase()}</span></div>
          <div className="search-wrap"><span className="search-icon" aria-hidden="true">⌕</span><label className="sr-only" htmlFor="topic-search">Search concepts</label><input ref={searchRef} id="topic-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a concept…" /><kbd>⌘ K</kbd></div>
        </header>

        <div className="content-wrap">
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-eyebrow"><span className="eyebrow-dot" /> A PRACTICAL MAP FOR COMPLEX SYSTEMS</div>
              <h1 id="hero-title">When systems<br /><i>need to talk.</i></h1>
              <p className="hero-deck">A field guide to Azure integration, secure networks, message flows, and the people who keep them running.</p>
              <a className="hero-link" href="#concepts">Find your way through <span>↓</span></a>
            </div>
            <RouteMap />
          </section>

          <section className="guide-strip" aria-label="How to use this guide">
            <div className="strip-label">A useful<br />mental model</div>
            <p>Services <b>connect</b> the work. Identity and networks <b>bound</b> it. Messages <b>carry</b> it. Operations <b>restore</b> it.</p>
            <div className="strip-count"><strong>{topics.length}</strong><span>concepts<br />across 4 practices</span></div>
          </section>

          <section className="topics-section" id="concepts" aria-labelledby="topics-title">
            <div className="section-heading">
              <div><span className="eyebrow">THE REFERENCE INDEX <span className="tiny-rule" /></span><h2 id="topics-title">{sectionTitle}<span className="heading-period">.</span></h2><p className="section-desc">Select a concept for its definition, purpose, use cases, and operational notes.</p></div>
              <div className="results-count"><b>{visibleTopics.length.toString().padStart(2, "0")}</b><span> / {topics.length.toString().padStart(2, "0")}<small>{query ? "MATCHING" : activeGroup === "all" ? "IN THE GUIDE" : "IN CHAPTER"}</small></span></div>
            </div>

            {activeGroup === "all" && !query && <div className="chapter-pills" aria-label="Filter concepts by chapter">
              <button className="chapter-pill is-selected" onClick={() => setActiveGroup("all")}>All practices <span>{topics.length}</span></button>
              {chapters.map((chapter) => <button key={chapter.id} className={`chapter-pill pill-${chapter.color}`} onClick={() => setActiveGroup(chapter.id)}>{chapter.short}<span>{topics.filter((item) => item.group === chapter.id).length}</span></button>)}
            </div>}

            {visibleTopics.length ? <div className="topic-grid">
              {visibleTopics.map((item, index) => {
                const chapter = findChapter(item.group);
                return <article key={`${item.group}-${item.title}`} className="topic-card">
                  <div className="topic-card-head"><span className={`chapter-code color-${chapter.color}`}>{chapter.code}</span><span className="topic-card-index">{String(index + 1).padStart(2, "0")}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="topic-card-foot"><span>{chapter.short.toUpperCase()}</span><span className="card-arrow" aria-hidden="true">↗</span></div>
                  <button type="button" className="topic-card-hit" aria-label={`Open notes for ${item.title}`} onClick={(event) => { cardTriggerRef.current = event.currentTarget; setSelectedTopic(item); }} />
                </article>;
              })}
            </div> : <div className="empty-state"><span className="empty-mark">⌕</span><h3>No concept found</h3><p>Try a service name, pattern, or support term.</p><button onClick={() => { setQuery(""); setActiveGroup("all"); }}>Clear search and filters <span>↗</span></button></div>}
          </section>

          <footer className="page-footer"><span>FIELD GUIDE / INTEGRATION SYSTEMS</span><span>BUILT FOR THE ON-CALL AND THE CURIOUS <b>·</b> 2026</span></footer>
        </div>
      </main>
      <TopicDrawer item={selectedTopic} onClose={closeTopic} />
    </div>
  );
}

export default App;
