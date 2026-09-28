import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AbbreviationDialog from "./components/AbbreviationDialog.jsx";
import GuideHero from "./components/GuideHero.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TopicCollection from "./components/TopicCollection.jsx";
import TopicDrawer from "./components/TopicDrawer.jsx";
import TopBar from "./components/TopBar.jsx";
import { topics } from "./utils/topicCatalog.js";
import { matchesTopic } from "./utils/searchTopics.js";
import "./App.css";

function App() {
  const [activeGroup, setActiveGroup] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isAbbreviationOpen, setIsAbbreviationOpen] = useState(false);
  const searchRef = useRef(null);
  const cardTriggerRef = useRef(null);
  const abbreviationTriggerRef = useRef(null);

  const closeTopic = useCallback(() => {
    setSelectedTopic(null);
    window.requestAnimationFrame(() => cardTriggerRef.current?.focus());
  }, []);

  const closeAbbreviations = useCallback(() => {
    setIsAbbreviationOpen(false);
    window.requestAnimationFrame(() => abbreviationTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !selectedTopic &&
        !isAbbreviationOpen
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        if (selectedTopic) closeTopic();
        else if (isAbbreviationOpen) closeAbbreviations();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeAbbreviations, closeTopic, isAbbreviationOpen, selectedTopic]);

  const visibleTopics = useMemo(
    () =>
      topics.filter((item) => {
        const inGroup = activeGroup === "all" || item.group === activeGroup;
        return inGroup && matchesTopic(item, query);
      }),
    [activeGroup, query],
  );

  const clearFilters = () => {
    setQuery("");
    setActiveGroup("all");
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeGroup={activeGroup}
        onSelect={setActiveGroup}
        hasDialog={Boolean(selectedTopic || isAbbreviationOpen)}
      />
      <main id="top" className="main-content" inert={Boolean(selectedTopic || isAbbreviationOpen)}>
        <TopBar
          activeGroup={activeGroup}
          query={query}
          onQueryChange={setQuery}
          searchRef={searchRef}
          abbreviationButtonRef={abbreviationTriggerRef}
          onOpenAbbreviations={() => setIsAbbreviationOpen(true)}
        />
        <div className="content-wrap">
          <GuideHero />
          <TopicCollection
            activeGroup={activeGroup}
            query={query}
            visibleTopics={visibleTopics}
            onSelectGroup={setActiveGroup}
            onClear={clearFilters}
            onOpenTopic={(item, trigger) => {
              cardTriggerRef.current = trigger;
              setSelectedTopic(item);
            }}
          />
          <footer className="page-footer">
            <span>AZURE AND INTEGRATION GUIDE</span>
            <span>
              FOR SUPPORT TEAMS AND LEARNERS <b>·</b> 2026
            </span>
          </footer>
        </div>
      </main>
      <TopicDrawer item={selectedTopic} onClose={closeTopic} />
      {isAbbreviationOpen && <AbbreviationDialog onClose={closeAbbreviations} />}
    </div>
  );
}

export default App;
