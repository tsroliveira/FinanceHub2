import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  LineChart,
  List,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wallet,
  BarChart3,
  BarChart4,
  Star,
  Users,
  LogIn,
  LogOut,
} from "lucide-react";

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({
  icon: Icon,
  label,
  active = false,
  collapsed = false,
  onClick,
}: SidebarLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all duration-200 text-left",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center",
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </button>
  );
};

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div
      className={cn(
        "relative h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex-shrink-0",
        collapsed ? "w-16" : "w-56",
        className,
      )}
    >
      <div className="p-4">
        <div
          className={cn(
            "flex items-center gap-2",
            collapsed && "justify-center",
          )}
        >
          <div className="h-8 w-8 rounded-md bg-primary/90 flex items-center justify-center">
            <BarChart4 size={18} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <h1 className="font-semibold text-xl text-sidebar-foreground">
              Finance<span className="text-primary">Hub</span>
            </h1>
          )}
        </div>
      </div>

      <div className="absolute top-4 -right-3 z-10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <div className="px-2 mt-6 space-y-6">
        <div className="space-y-1">
          <SidebarLink
            icon={LayoutDashboard}
            label="Dashboard"
            active={isActive("/")}
            collapsed={collapsed}
            onClick={() => handleNavigation("/")}
          />
          <SidebarLink
            icon={List}
            label="Project List"
            active={isActive("/project-list")}
            collapsed={collapsed}
            onClick={() => handleNavigation("/project-list")}
          />
          <SidebarLink
            icon={Star}
            label="Top ROI"
            active={isActive("/top-roi")}
            collapsed={collapsed}
            onClick={() => handleNavigation("/top-roi")}
          />
          <SidebarLink
            icon={TrendingUp}
            label="Trending"
            active={isActive("/trending")}
            collapsed={collapsed}
            onClick={() => handleNavigation("/trending")}
          />
          <SidebarLink
            icon={BarChart3}
            label="Analytics"
            active={isActive("/analytics")}
            collapsed={collapsed}
            onClick={() => handleNavigation("/analytics")}
          />
        </div>

        <div className="pt-4 border-t border-sidebar-border">
          <p
            className={cn(
              "text-xs uppercase text-sidebar-foreground/60 mb-2 px-3",
              collapsed && "text-center",
            )}
          >
            {collapsed ? "More" : "Analytics"}
          </p>
          <div className="space-y-1">
            <SidebarLink
              icon={LineChart}
              label="Market Insights"
              active={isActive("/market-insights")}
              collapsed={collapsed}
              onClick={() => handleNavigation("/market-insights")}
            />
            <SidebarLink
              icon={Wallet}
              label="Portfolios"
              active={isActive("/portfolios")}
              collapsed={collapsed}
              onClick={() => handleNavigation("/portfolios")}
            />
            <SidebarLink
              icon={Users}
              label="Social Trends"
              active={isActive("/social-trends")}
              collapsed={collapsed}
              onClick={() => handleNavigation("/social-trends")}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 w-full px-2">
        <SidebarLink
          icon={Settings}
          label="Settings"
          active={isActive("/settings")}
          collapsed={collapsed}
          onClick={() => handleNavigation("/settings")}
        />
        {user ? (
          <SidebarLink
            icon={LogOut}
            label="Logout"
            collapsed={collapsed}
            onClick={handleLogout}
          />
        ) : (
          <SidebarLink
            icon={LogIn}
            label="Login"
            active={isActive("/login-form")}
            collapsed={collapsed}
            onClick={() => handleNavigation("/login-form")}
          />
        )}

        {user && !collapsed && (
          <div className="mt-2 px-3 text-xs text-sidebar-foreground/60 truncate">
            Logado como: <br />
            <span className="font-medium">{user.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}
