import { chapters, topics } from "../utils/topicCatalog.js";
import TopicCard from "./TopicCard.jsx";

export default function TopicCollection({
  activeGroup,
  query,
  visibleTopics,
  onSelectGroup,
  onClear,
  onOpenTopic,
}) {
  const activeChapter = chapters.find((chapter) => chapter.id === activeGroup);
  const sectionTitle = query ? "Search results" : (activeChapter?.short ?? "The field guide");
  return (
    <section className="topics-section" id="concepts" aria-labelledby="topics-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            THE REFERENCE INDEX <span className="tiny-rule" />
          </span>
          <h2 id="topics-title">
            {sectionTitle}
            <span className="heading-period">.</span>
          </h2>
          <p className="section-desc">
            Select a concept for its definition, purpose, examples, sources, and operational notes.
          </p>
        </div>
        <div className="results-count">
          <b>{visibleTopics.length.toString().padStart(2, "0")}</b>
          <span>
            {" "}
            / {topics.length.toString().padStart(2, "0")}
            <small>
              {query ? "MATCHING" : activeGroup === "all" ? "IN THE GUIDE" : "IN CHAPTER"}
            </small>
          </span>
        </div>
      </div>

      {activeGroup === "all" && !query && (
        <div className="chapter-pills" aria-label="Filter concepts by chapter">
          <button
            className="chapter-pill is-selected"
            aria-pressed="true"
            onClick={() => onSelectGroup("all")}
          >
            All practices <span>{topics.length}</span>
          </button>
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={`chapter-pill pill-${chapter.color}`}
              aria-pressed="false"
              onClick={() => onSelectGroup(chapter.id)}
            >
              {chapter.short}
              <span>{topics.filter((item) => item.group === chapter.id).length}</span>
            </button>
          ))}
        </div>
      )}

      {visibleTopics.length ? (
        <div className="topic-grid">
          {visibleTopics.map((item, index) => (
            <TopicCard
              key={`${item.group}-${item.title}`}
              item={item}
              index={index}
              onOpen={onOpenTopic}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-mark">⌕</span>
          <h3>No concept found</h3>
          <p>Try a service name, pattern, or support term.</p>
          <button onClick={onClear}>
            Clear search and filters <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
    </section>
  );
}
