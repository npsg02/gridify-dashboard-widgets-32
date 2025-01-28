import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, GripHorizontal, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface StatWidgetProps {
  title: string;
  value: string;
  trend: "up" | "down";
}

export const StatWidget = ({ title, value, trend }: StatWidgetProps) => {
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