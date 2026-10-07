import { useEffect, useMemo, useRef, useState } from "react";
import { chapters } from "../utils/chapters.js";
import { videoReferences } from "../utils/videoReferences.js";

export default function VideoReferenceDialog({ onClose }) {
  const [query, setQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState("all");
  const searchRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const keepFocusInside = (event) => {
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll(
      "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])",
    );
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

  const filteredReferences = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return videoReferences.filter((reference) => {
      const inChapter = activeChapter === "all" || reference.chapters.includes(activeChapter);
      const searchableText = `${reference.title} ${reference.channel} ${reference.topics.join(" ")}`;
      return inChapter && searchableText.toLocaleLowerCase().includes(normalizedQuery);
    });
  }, [activeChapter, query]);

  return (
    <div className="video-dialog-shade">
      <section
        ref={dialogRef}
        className="video-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-dialog-title"
        onKeyDown={keepFocusInside}
      >
        <div className="video-dialog-topline">
          <div>
            <span className="eyebrow">CHAPTER LEARNING REFERENCES</span>
            <h2 id="video-dialog-title">Video references</h2>
          </div>
          <button
            className="close-button"
            type="button"
            onClick={onClose}
            aria-label="Close video references"
          >
            ×
          </button>
        </div>
        <p className="video-dialog-intro">
          Curated YouTube walkthroughs, grouped by the guide topics they cover. Links open in a new
          tab.
        </p>
        <label className="video-search-label" htmlFor="video-reference-search">
          Search videos or covered topics
        </label>
        <input
          ref={searchRef}
          id="video-reference-search"
          className="video-search"
          type="search"
          placeholder="Try “Service Bus”, “AS2” or “PIM”…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="video-chapter-filters" aria-label="Filter video references by chapter">
          <button
            type="button"
            className={`video-chapter-filter${activeChapter === "all" ? " is-active" : ""}`}
            aria-pressed={activeChapter === "all"}
            onClick={() => setActiveChapter("all")}
          >
            All chapters
          </button>
          {chapters.map((chapter) => (
            <button
              type="button"
              className={`video-chapter-filter${activeChapter === chapter.id ? " is-active" : ""}`}
              aria-pressed={activeChapter === chapter.id}
              key={chapter.id}
              onClick={() => setActiveChapter(chapter.id)}
            >
              {chapter.short.toUpperCase() === chapter.code.toUpperCase() ? (
                chapter.short
              ) : (
                <>
                  <span>{chapter.code}</span> {chapter.short}
                </>
              )}
            </button>
          ))}
        </div>
        <p className="video-reference-count" aria-live="polite">
          Showing {filteredReferences.length} of {videoReferences.length} videos
        </p>
        <div className="video-reference-list-wrap">
          <ul className="video-reference-list">
            {filteredReferences.map((reference) => (
              <li className="video-reference-entry" key={reference.url}>
                <div className="video-reference-heading">
                  <a href={reference.url} target="_blank" rel="noreferrer">
                    {reference.title}
                    <span className="video-external-mark" aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {reference.channel && (
                    <span className="video-reference-channel">{reference.channel}</span>
                  )}
                </div>
                <div className="video-reference-coverage">
                  <span className="video-coverage-label">Covers</span>
                  <ul className="video-topic-list">
                    {reference.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div className="video-reference-chapters" aria-label="Chapters">
                  {reference.chapters.map((chapterId) => {
                    const chapter = chapters.find(({ id }) => id === chapterId);
                    return (
                      <span key={chapterId} title={chapter?.label}>
                        {chapter?.code}
                      </span>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
          {filteredReferences.length === 0 && (
            <p className="video-reference-empty">No video references match those filters.</p>
          )}
        </div>
      </section>
      <button
        type="button"
        className="video-dialog-backdrop"
        onClick={onClose}
        aria-label="Close video references"
      />
    </div>
  );
}
