import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Globe,
  BarChart3,
  Package,
  MessageSquare,
  QrCode,
  Sparkles,
  Lightbulb,
  ChevronRight,
  Building2
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Website Builder", url: "/website-builder", icon: Globe },
  { title: "Sales Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Products", url: "/products", icon: Package },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "QR Code", url: "/qr-code", icon: QrCode },
  { title: "AI Tools", url: "/ai-tools", icon: Sparkles },
  { title: "Tips", url: "/tips", icon: Lightbulb },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r bg-card shadow-soft">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-foreground">Break-Even</h1>
                <p className="text-xs text-muted-foreground">Business Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth group
                        ${isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-medium"
                          : "hover:bg-accent hover:text-accent-foreground"
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          <ChevronRight 
                            className={`w-4 h-4 ml-auto transition-smooth ${
                              isActive(item.url) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`} 
                          />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}