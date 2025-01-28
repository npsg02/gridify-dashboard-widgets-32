import { Card } from "@/components/ui/card";
import { Check, Circle } from "lucide-react";
import { useState } from "react";

interface ChecklistItem {
  title: string;
  items: {
    text: string;
    checked: boolean;
    subItems?: { text: string; checked: boolean; }[];
  }[];
}

const initialChecklist: ChecklistItem[] = [
  {
    title: "Phase 1: Planning & Setup",
    items: [
      { text: "Define dashboard goals", checked: false },
      { text: "Sketch the layout", checked: false },
      { text: "Choose a tech stack", checked: false },
      { text: "Initialize the project", checked: false },
      { text: "Configure version control", checked: false },
    ],
  },
  {
    title: "Phase 2: Core Dashboard Features",
    items: [
      { text: "Build responsive base layout", checked: false },
      { text: "Add drag-and-drop functionality", checked: false },
      { text: "Implement user authentication", checked: false },
      { text: "Create a widget library", checked: false },
    ],
  },
  {
    title: "Phase 3: Widget Development",
    items: [
      { 
        text: "Progress Trackers", 
        checked: false,
        subItems: [
          { text: "Goal progress bars/thermometers", checked: false },
          { text: "Savings/milestone trackers", checked: false },
        ]
      },
      { 
        text: "Habit & Routine Widgets", 
        checked: false,
        subItems: [
          { text: "Calendar-based habit streak tracker", checked: false },
          { text: "Daily task checklist", checked: false },
        ]
      },
      { 
        text: "Inspiration Widgets", 
        checked: false,
        subItems: [
          { text: "Motivational quote generator", checked: false },
          { text: "Image gallery for goal visualization", checked: false },
        ]
      },
      { 
        text: "Data-Driven Widgets", 
        checked: false,
        subItems: [
          { text: "Countdown timers for deadlines/events", checked: false },
          { text: "API-fed widgets", checked: false },
        ]
      },
    ],
  },
  {
    title: "Phase 4: Data Integration",
    items: [
      { text: "Manual input forms", checked: false },
      { text: "Third-party API connections", checked: false },
      { text: "Database setup", checked: false },
      { text: "Real-time syncing", checked: false },
    ],
  },
  {
    title: "Phase 5: Customization & UX",
    items: [
      { text: "Widget settings menu", checked: false },
      { text: "Theming options", checked: false },
      { text: "Export/share functionality", checked: false },
      { text: "Error handling", checked: false },
    ],
  },
  {
    title: "Phase 6: Testing",
    items: [
      { text: "Cross-device responsiveness", checked: false },
      { text: "User testing", checked: false },
      { text: "Data validation", checked: false },
      { text: "Performance optimization", checked: false },
    ],
  },
];

export function DashboardChecklist() {
  const [checklist, setChecklist] = useState(initialChecklist);

  const toggleItem = (phaseIndex: number, itemIndex: number, subItemIndex?: number) => {
    const newChecklist = [...checklist];
    if (typeof subItemIndex === 'number') {
      const subItem = newChecklist[phaseIndex].items[itemIndex].subItems?.[subItemIndex];
      if (subItem) {
        subItem.checked = !subItem.checked;
      }
    } else {
      newChecklist[phaseIndex].items[itemIndex].checked = !newChecklist[phaseIndex].items[itemIndex].checked;
    }
    setChecklist(newChecklist);
  };

  return (
    <Card className="p-6 overflow-auto max-h-[calc(100vh-12rem)]">
      <h2 className="text-2xl font-bold mb-6">Dashboard Development Checklist</h2>
      <div className="space-y-8">
        {checklist.map((phase, phaseIndex) => (
          <div key={phase.title} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">{phase.title}</h3>
            <div className="space-y-3 pl-4">
              {phase.items.map((item, itemIndex) => (
                <div key={item.text}>
                  <div 
                    className="flex items-start gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded-sm"
                    onClick={() => toggleItem(phaseIndex, itemIndex)}
                  >
                    {item.checked ? (
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                    )}
                    <span className={item.checked ? "line-through text-muted-foreground" : ""}>
                      {item.text}
                    </span>
                  </div>
                  {item.subItems && (
                    <div className="pl-6 space-y-2 mt-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <div 
                          key={subItem.text}
                          className="flex items-start gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded-sm"
                          onClick={() => toggleItem(phaseIndex, itemIndex, subIndex)}
                        >
                          {subItem.checked ? (
                            <Check className="h-4 w-4 text-primary mt-0.5" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground mt-0.5" />
                          )}
                          <span className={subItem.checked ? "line-through text-muted-foreground" : ""}>
                            {subItem.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}