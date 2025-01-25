import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, GripHorizontal, Settings, Maximize2, Share2, Trash2, Edit } from "lucide-react";
import { Layout } from "@/components/Layout";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

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
            <Settings className="text-gray-400" size={20} />
          </div>
          <h3 className="text-lg font-semibold mt-2 text-gray-700">{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold">{value}</span>
            <span className={`flex items-center ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {trend === "up" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            </span>
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

  return (
    <Layout>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".cursor-move"
      >
        <div key="stats1">
          <StatCard title="Revenue" value="$50,240" trend="up" />
        </div>
        <div key="stats2">
          <StatCard title="Users" value="1,429" trend="up" />
        </div>
        <div key="stats3">
          <StatCard title="Conversion" value="24.5%" trend="down" />
        </div>
        <div key="chart">
          <ChartWidget />
        </div>
      </ResponsiveGridLayout>
    </Layout>
  );
};

export default Index;