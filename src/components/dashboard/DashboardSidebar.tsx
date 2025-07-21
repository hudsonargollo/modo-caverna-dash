import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  FileText, 
  Settings, 
  Upload,
  Mountain,
  TrendingUp,
  PieChart
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Análise Financeira", url: "/financial", icon: DollarSign },
  { title: "Clientes", url: "/customers", icon: Users },
  { title: "Relatórios", url: "/reports", icon: FileText },
  { title: "Upload CSV", url: "/upload", icon: Upload },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Gráficos", url: "/charts", icon: PieChart },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} glass-effect shadow-xl border-r border-primary/10`}>
      <SidebarHeader className="border-b border-sidebar-border glass-effect">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Mountain className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sidebar-foreground">Modo Caverna</span>
              <span className="text-xs text-primary/60">Dashboard</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="p-2">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}