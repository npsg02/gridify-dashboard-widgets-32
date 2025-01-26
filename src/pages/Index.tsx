import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, GripHorizontal, Settings, Maximize2, Share2, Trash2, Edit, Plus } from "lucide-react";
import { Layout } from "@/components/Layout";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Create the ResponsiveGridLayout by applying WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive);

// Sample data for the chart
const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
];

const StatCard = ({ title, value, trend }: { title: string; value: string; trend: "up" | "down" }) => {
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);

  const handleEdit = () => {
    toast({
      title: "Edit Widget",
      description: "Opening widget editor...",
    });
  };

  const handleFullscreen = () => {
    toast({
      title: "Fullscreen",
      description: "Opening widget in fullscreen...",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Widget",
      description: "Opening share dialog...",
    });
  };

  const handleRemove = () => {
    toast({
      title: "Remove Widget",
      description: "Widget removed from dashboard",
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-4 h-full">
          <div className="flex items-center justify-between">
            <GripHorizontal className="cursor-move text-gray-400" size={20} />
            <Settings 
              className="text-gray-400 cursor-pointer hover:text-gray-600" 
              size={20} 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSettings(true);
              }}
            />
          </div>
          <h3 className="text-lg font-semibold mt-2 text-gray-700">{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold">{value}</span>
            <span className={`flex items-center ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {trend === "up" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            </span>
          </div>

          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Widget Settings</DialogTitle>
                <DialogDescription>
                  Configure your widget settings here.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <button onClick={handleEdit} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  <Edit className="inline mr-2 h-4 w-4" />
                  Edit
                </button>
                <button onClick={handleFullscreen} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  <Maximize2 className="inline mr-2 h-4 w-4" />
                  Fullscreen
                </button>
                <button onClick={handleShare} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md">
                  <Share2 className="inline mr-2 h-4 w-4" />
                  Share
                </button>
                <button onClick={handleRemove} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-red-600">
                  <Trash2 className="inline mr-2 h-4 w-4" />
                  Remove
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem onClick={handleFullscreen}>
          <Maximize2 className="mr-2 h-4 w-4" />
          Fullscreen
        </ContextMenuItem>
        <ContextMenuItem onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleRemove} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const ChartWidget = () => {
  const { toast } = useToast();

  const handleEdit = () => {
    toast({
      title: "Edit Widget",
      description: "Opening widget editor...",
    });
  };

  const handleFullscreen = () => {
    toast({
      title: "Fullscreen",
      description: "Opening widget in fullscreen...",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Widget",
      description: "Opening share dialog...",
    });
  };

  const handleRemove = () => {
    toast({
      title: "Remove Widget",
      description: "Widget removed from dashboard",
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-4 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Performance</h3>
            <div className="flex items-center gap-2">
              <GripHorizontal className="cursor-move text-gray-400" size={20} />
              <Settings className="text-gray-400" size={20} />
            </div>
          </div>
          <div className="h-[200px]">
            <LineChart width={500} height={200} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" />
            </LineChart>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem onClick={handleFullscreen}>
          <Maximize2 className="mr-2 h-4 w-4" />
          Fullscreen
        </ContextMenuItem>
        <ContextMenuItem onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleRemove} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

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

        <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Widget</DialogTitle>
              <DialogDescription>
                Choose a widget type to add to your dashboard
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => addWidget("stats")}
              >
                <div className="text-2xl">📊</div>
                Statistics
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => addWidget("chart")}
              >
                <div className="text-2xl">📈</div>
                Chart
              </Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddWidget(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                  <StatCard
                    title="Revenue"
                    value="$50,240"
                    trend="up"
                  />
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
