import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
      if (event.key === "Escape" && selectedTopic) closeTopic();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeTopic, selectedTopic]);

  const visibleTopics = useMemo(() => topics.filter((item) => {
    const inGroup = activeGroup === "all" || item.group === activeGroup;
    return inGroup && matchesTopic(item, query);
  }), [activeGroup, query]);

  const clearFilters = () => {
    setQuery("");
    setActiveGroup("all");
  };

  return (
    <div className="app-shell">
      <Sidebar activeGroup={activeGroup} onSelect={setActiveGroup} hasDialog={Boolean(selectedTopic)} />
      <main id="top" className="main-content" inert={Boolean(selectedTopic)}>
        <TopBar activeGroup={activeGroup} query={query} onQueryChange={setQuery} searchRef={searchRef} />
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
          <footer className="page-footer"><span>FIELD GUIDE / INTEGRATION SYSTEMS</span><span>BUILT FOR THE ON-CALL AND THE CURIOUS <b>·</b> 2026</span></footer>
        </div>
      </main>
      <TopicDrawer item={selectedTopic} onClose={closeTopic} />
    </div>
  );
}

export default App;
