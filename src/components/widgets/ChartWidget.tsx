import { Card } from "@/components/ui/card";
import { GripHorizontal, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useToast } from "@/hooks/use-toast";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
];

export const ChartWidget = () => {
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
        <ContextMenuItem onClick={handleEdit}>Edit</ContextMenuItem>
        <ContextMenuItem onClick={handleFullscreen}>Fullscreen</ContextMenuItem>
        <ContextMenuItem onClick={handleShare}>Share</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleRemove} className="text-red-600">
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};