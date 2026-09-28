import { findChapter } from "../utils/topicCatalog.js";

export default function TopBar({
  activeGroup,
  query,
  onQueryChange,
  searchRef,
  abbreviationButtonRef,
  onOpenAbbreviations,
}) {
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
      <div className="topbar-actions">
        <button
          ref={abbreviationButtonRef}
          type="button"
          className="abbreviation-trigger"
          onClick={onOpenAbbreviations}
          aria-label="Open abbreviation cheatsheet"
        >
          <span className="abbreviation-trigger-mark" aria-hidden="true">
            Aa
          </span>
          <span className="abbreviation-trigger-label" aria-hidden="true">
            Abbreviation cheatsheet
          </span>
        </button>
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
      </div>
    </header>
  );
}
