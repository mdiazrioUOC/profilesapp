import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["All", "To do", "In Progress", "Complete"];

export default function FilterTabs () {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex gap-3 px-6 pb-6 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "px-8 py-3 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap",
            activeTab === tab
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
