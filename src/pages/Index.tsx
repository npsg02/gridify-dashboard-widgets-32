import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DashboardChecklist } from "@/components/DashboardChecklist";
import { StatWidget } from "@/components/widgets/StatWidget";
import { ChartWidget } from "@/components/widgets/ChartWidget";
import { AddWidgetDialog } from "@/components/AddWidgetDialog";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Index = () => {
  const { toast } = useToast();
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [isScrollable, setIsScrollable] = useState(true);
  const [layouts, setLayouts] = useState({
    lg: [
      { i: "stats1", x: 0, y: 0, w: 3, h: 2 },
      { i: "stats2", x: 3, y: 0, w: 3, h: 2 },
      { i: "stats3", x: 6, y: 0, w: 3, h: 2 },
      { i: "chart", x: 0, y: 2, w: 12, h: 4 },
      { i: "checklist", x: 0, y: 3, w: 12, h: 4 },
    ],
  });

  const handleLayoutChange = (layout: any, layouts: any) => {
    setLayouts(layouts);
    toast({
      title: "Layout updated",
      description: "Widget positions have been saved",
    });
  };

  const addWidget = (type: string) => {
    const newId = `${type}${Date.now()}`;
    const newLayouts = {
      lg: [
        ...layouts.lg,
        {
          i: newId,
          x: (layouts.lg.length * 3) % 12,
          y: Infinity,
          w: 3,
          h: 2,
        },
      ],
    };
    setLayouts(newLayouts);
    setShowAddWidget(false);
    toast({
      title: "Widget Added",
      description: `New ${type} widget has been added to your dashboard`,
    });
  };

  return (
    <Layout>
      <div className={`p-4 ${!isScrollable ? "h-screen overflow-hidden" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Switch
                id="scrollable-mode"
                checked={isScrollable}
                onCheckedChange={setIsScrollable}
              />
              <Label htmlFor="scrollable-mode">Scrollable Dashboard</Label>
            </div>
          </div>
          <Button onClick={() => setShowAddWidget(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Widget
          </Button>
        </div>

        <AddWidgetDialog
          open={showAddWidget}
          onOpenChange={setShowAddWidget}
          onAddWidget={addWidget}
        />

        <div className={!isScrollable ? "h-[calc(100vh-12rem)] overflow-hidden" : ""}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
            onLayoutChange={handleLayoutChange}
            draggableHandle=".cursor-move"
          >
            {layouts.lg.map((layout) => (
              <div key={layout.i}>
                {layout.i.includes("stats") ? (
                  <StatWidget
                    title="Revenue"
                    value="$50,240"
                    trend="up"
                  />
                ) : layout.i.includes("checklist") ? (
                  <DashboardChecklist />
                ) : (
                  <ChartWidget />
                )}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </Layout>
  );
};

export default Index;