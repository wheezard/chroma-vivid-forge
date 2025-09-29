import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  User, 
  FileText, 
  Shield, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Home,
  Activity,
  Users,
  Key,
  History,
  Bell,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardSidebarProps {
  userRole: 'patient' | 'provider';
  walletAddress: string;
  onDisconnect: () => void;
}

export const DashboardSidebar = ({ userRole, walletAddress, onDisconnect }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const patientNavItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: FileText, label: "Medical Records", path: "/records" },
    { icon: Shield, label: "Consent Management", path: "/consent" },
    { icon: Activity, label: "Health Analytics", path: "/analytics" },
    { icon: History, label: "Access History", path: "/history" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const providerNavItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Patient Records", path: "/patients" },
    { icon: FileText, label: "Create Record", path: "/create-record" },
    { icon: Key, label: "Access Requests", path: "/access-requests" },
    { icon: Activity, label: "Analytics", path: "/analytics" },
    { icon: History, label: "Audit Trail", path: "/audit" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const navItems = userRole === 'patient' ? patientNavItems : providerNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn(
      "h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-medical-green to-medical-bright rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">AfriHealth</h2>
              <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
            </div>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hover:bg-medical-green/10"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-border">
          <div className="bg-medical-green/5 rounded-lg p-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-medical-soft to-medical-green rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-medical-deep" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground capitalize">{userRole}</p>
                <p className="text-xs text-muted-foreground truncate">{walletAddress}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
              isActive 
                ? "bg-medical-green text-white" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
              collapsed && "justify-center"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
              collapsed ? "h-6 w-6" : "h-5 w-5"
            )} />
            {!collapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {!collapsed && (
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Button>
        )}
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!collapsed && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={onDisconnect}
              className="flex-1 justify-start gap-3 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </Button>
          )}
          {collapsed && (
            <Button 
              variant="ghost"
              size="icon"
              onClick={onDisconnect}
              className="h-10 w-10 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};