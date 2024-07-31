"use client";
import React, { useState, createContext, useContext } from "react";

// Context to share the selected tab state and set function
const TabsContext = createContext();

export function Tabs({ children }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

export function Tab({ children, index }) {
  const { selectedTab, setSelectedTab } = useContext(TabsContext);
  const isSelected = selectedTab === index;

  return (
    <button
      className={`tab ${isSelected ? "selected" : ""}`}
      onClick={() => setSelectedTab(index)}
    >
      {children}
    </button>
  );
}

export function TabPanel({ children, index }) {
  const { selectedTab } = useContext(TabsContext);
  return selectedTab === index ? (
    <div className="tab-panel">{children}</div>
  ) : null;
}
