import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar"
import { Plus, LayoutDashboard, Settings, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarContent>
            <SidebarHeader className="p-4">
              <h2 className="text-lg font-semibold">Widgets</h2>
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>
            </SidebarHeader>
            <Separator />
            <SidebarGroup>
              <SidebarGroupLabel>Available Widgets</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    <span>Stats Card</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    <span>Chart Widget</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1">
          <header className="border-b sticky top-0 bg-background z-50">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <Select defaultValue="default">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Dashboard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Dashboard</SelectItem>
                    <SelectItem value="custom">Custom Dashboard</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Dashboard
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}