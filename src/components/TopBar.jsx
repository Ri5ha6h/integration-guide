import { findChapter } from "../utils/topicCatalog.js";

export default function TopBar({ activeGroup, query, onQueryChange, searchRef }) {
  const chapter = activeGroup === "all" ? null : findChapter(activeGroup);
  return (
    <header className="topbar">
      <div className="breadcrumb"><span>FIELD NOTES</span><b>/</b><span>{chapter ? `${chapter.code} / ${chapter.short.toUpperCase()}` : "SYSTEMS OVERVIEW"}</span></div>
      <div className="search-wrap"><span className="search-icon" aria-hidden="true">⌕</span><label className="sr-only" htmlFor="topic-search">Search concepts</label><input ref={searchRef} id="topic-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Find a concept…" /><kbd aria-hidden="true">⌘ K</kbd></div>
    </header>
  );
}
