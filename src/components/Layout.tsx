
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Award, 
  Bell, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Home, 
  LogOut,
  MessageSquare, 
  Settings, 
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: Home, href: "/", current: true },
    { name: "Activity", icon: Activity, href: "/activity", current: false },
    { name: "Workouts", icon: Calendar, href: "/workouts", current: false },
    { name: "Community", icon: MessageSquare, href: "/community", current: false },
    { name: "Achievements", icon: Award, href: "/achievements", current: false },
    { name: "Health", icon: Heart, href: "/health", current: false },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile header */}
      {isMobile && (
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white border-b border-border px-4 h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <ChevronRight className={`h-5 w-5 transition-all ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
            <span className="ml-2 text-xl font-bold text-fitness-primary">PulseTrack</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>
      )}

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black/50" onClick={toggleMobileMenu}>
          <div className="absolute top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white p-4" 
               onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    item.current
                      ? "bg-fitness-soft-purple text-fitness-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="mt-auto pt-5 border-t border-border">
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 p-3 rounded-lg text-muted-foreground hover:bg-muted"
                  onClick={toggleMobileMenu}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground mt-2">
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside
          className={`bg-sidebar transition-all duration-300 text-sidebar-foreground border-r border-border flex flex-col ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <div className={`p-4 flex ${collapsed ? "justify-center" : "justify-between"} items-center border-b border-sidebar-border`}>
            {!collapsed && <span className="text-xl font-bold">PulseTrack</span>}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <TooltipProvider>
              {navigation.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "space-x-3"
                      } p-3 rounded-lg ${
                        item.current
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>

          <div className={`p-4 border-t border-sidebar-border ${collapsed ? "items-center" : ""}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/settings"
                    className={`flex items-center ${
                      collapsed ? "justify-center" : "space-x-3"
                    } p-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50`}
                  >
                    <Settings className="h-5 w-5" />
                    {!collapsed && <span>Settings</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    Settings
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`w-full ${
                      collapsed ? "justify-center" : "justify-start"
                    } text-sidebar-foreground hover:bg-sidebar-accent/50 mt-2`}
                  >
                    <LogOut className="h-5 w-5" />
                    {!collapsed && <span className="ml-3">Logout</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    Logout
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
