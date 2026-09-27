import { findChapter } from "../utils/topicCatalog.js";

export default function TopicCard({ item, index, onOpen }) {
  const chapter = findChapter(item.group);
  return (
    <article className="topic-card">
      <div className="topic-card-head">
        <span className={`chapter-code color-${chapter.color}`}>{chapter.code}</span>
        <span className="topic-card-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="topic-card-foot">
        <span>{chapter.short.toUpperCase()}</span>
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <button
        type="button"
        className="topic-card-hit"
        aria-label={`Open topic: ${item.title}`}
        onClick={(event) => onOpen(item, event.currentTarget)}
      />
    </article>
  );
}
