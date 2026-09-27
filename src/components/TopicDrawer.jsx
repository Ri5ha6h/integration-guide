import { useEffect, useRef } from "react";
import { findChapter, topics } from "../utils/topicCatalog.js";

const notes = [
  ["definition", "In plain terms"],
  ["purpose", "What it does"],
  ["usedWhen", "Where it fits"],
  ["why", "Why teams use it"],
  ["example", "Example"],
  ["operatorNote", "On the operations desk"],
];

export default function TopicDrawer({ item, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;
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
        <div className="drawer-topline">
          <span className={`chapter-code color-${chapter.color}`}>{chapter.code}</span>
          <button ref={closeButtonRef} className="close-button" onClick={onClose} aria-label="Close concept details">×</button>
        </div>
        <div className="drawer-intro">
          <span className="eyebrow">{chapter.label}</span>
          <h2 id="drawer-title">{item.title}</h2>
          <p>{item.summary}</p>
        </div>
        <div className="detail-notes">
          {notes.filter(([key]) => item[key]).map(([key, label], index) => (
            <article className={`detail-note ${key === "example" ? "detail-example" : ""}`} key={key}>
              <span className="detail-index">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{label}</h3><p>{item[key]}</p></div>
            </article>
          ))}
        </div>
        {item.sources?.length > 0 && (
          <section className="drawer-sources" aria-labelledby="source-heading">
            <h3 id="source-heading">Read the primary references</h3>
            <ul>
              {item.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<span aria-hidden="true"> ↗</span></a></li>
              ))}
            </ul>
          </section>
        )}
        <div className="drawer-bottom"><span>FIELD NOTE / {chapter.code}-{String(topics.indexOf(item) + 1).padStart(2, "0")}</span><button onClick={onClose}>Back to the guide <span aria-hidden="true">↗</span></button></div>
      </section>
    </div>
  );
}
