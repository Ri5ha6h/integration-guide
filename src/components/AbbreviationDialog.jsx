import { useEffect, useRef, useState } from "react";
import { abbreviations } from "../utils/abbreviations.js";

export default function AbbreviationDialog({ onClose }) {
  const [query, setQuery] = useState("");
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
      "button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])",
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

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredAbbreviations = abbreviations.filter(({ term, fullForm, definition }) =>
    `${term} ${fullForm} ${definition}`.toLocaleLowerCase().includes(normalizedQuery),
  );

  return (
    <div className="abbreviation-dialog-shade">
      <section
        ref={dialogRef}
        className="abbreviation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="abbreviation-title"
        onKeyDown={keepFocusInside}
      >
        <div className="abbreviation-dialog-topline">
          <div>
            <span className="eyebrow">GUIDE REFERENCE</span>
            <h2 id="abbreviation-title">Abbreviation cheatsheet</h2>
          </div>
          <button
            className="close-button"
            type="button"
            onClick={onClose}
            aria-label="Close abbreviation cheatsheet"
          >
            ×
          </button>
        </div>
        <p className="abbreviation-intro">
          Full forms and short definitions for terms used across the guide topics.
        </p>
        <label className="abbreviation-filter-label" htmlFor="abbreviation-filter">
          Filter abbreviations
        </label>
        <input
          ref={searchRef}
          id="abbreviation-filter"
          className="abbreviation-filter"
          type="search"
          placeholder="Search a term or definition…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className="abbreviation-count" aria-live="polite">
          Showing {filteredAbbreviations.length} of {abbreviations.length} abbreviations
        </p>
        <div className="abbreviation-list-wrap">
          <dl className="abbreviation-list">
            {filteredAbbreviations.map(({ term, fullForm, definition }) => (
              <div className="abbreviation-entry" key={term}>
                <dt>{term}</dt>
                <dd>
                  <strong>{fullForm}</strong>
                  <span>{definition}</span>
                </dd>
              </div>
            ))}
          </dl>
          {filteredAbbreviations.length === 0 && (
            <p className="abbreviation-empty">No abbreviations match that search.</p>
          )}
        </div>
      </section>
      <button
        type="button"
        className="abbreviation-dialog-backdrop"
        onClick={onClose}
        aria-label="Close abbreviation cheatsheet"
      />
    </div>
  );
}
