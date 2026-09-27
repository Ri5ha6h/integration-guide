import { findChapter } from "../utils/topicCatalog.js";

export default function TopBar({ activeGroup, query, onQueryChange, searchRef }) {
  const chapter = activeGroup === "all" ? null : findChapter(activeGroup);
  const sectionName =
    chapter && chapter.short.toUpperCase() === chapter.code.toUpperCase()
      ? chapter.short.toUpperCase()
      : chapter && `${chapter.code} / ${chapter.short.toUpperCase()}`;
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>GUIDE</span>
        <b>/</b>
        <span>{sectionName ?? "ALL CHAPTERS"}</span>
      </div>
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>
        <label className="sr-only" htmlFor="topic-search">
          Search topics
        </label>
        <input
          ref={searchRef}
          id="topic-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search topics…"
        />
        <kbd aria-hidden="true">⌘ K / Ctrl K</kbd>
      </div>
    </header>
  );
}
