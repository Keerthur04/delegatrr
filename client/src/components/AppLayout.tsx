/* =============================================================
   AppLayout — Signal Design: Fixed sidebar + main content area
   ============================================================= */

import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Plus,
  Users,
  Sparkles,
  CheckSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDelegatr } from "@/contexts/DelegatrContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  step?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "New Task", href: "/app/new-task", icon: Plus, step: 1 },
  { label: "Team Setup", href: "/app/team-setup", icon: Users, step: 2 },
  { label: "AI Assign", href: "/app/ai-assign", icon: Sparkles, step: 3 },
  { label: "Checklists", href: "/app/checklist", icon: CheckSquare },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const { currentStep } = useDelegatr();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col h-full transition-all duration-300 ease-in-out relative z-20",
          "border-r border-border",
          "bg-sidebar",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center h-16 px-4 border-b border-border", collapsed && "justify-center px-0")}>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/15 border border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            {!collapsed && (
              <span className="text-foreground font-semibold text-base tracking-tight">
                Delegatr
              </span>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest px-2 mb-3">
              Workflow
            </p>
          )}
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href + "/");
            const Icon = item.icon;
            const isStepComplete = item.step !== undefined && currentStep > item.step;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-2.5 py-2 rounded-md text-sm font-medium transition-all duration-150 group",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <div className="relative shrink-0">
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    {isStepComplete && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                  {!collapsed && isActive && (
                    <span className="ml-auto w-1 h-4 rounded-full bg-primary" />
                  )}
                </div>
              </Link>
            );
          })}

          {!collapsed && (
            <>
              <div className="border-t border-border my-3" />
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest px-2 mb-3">
                Settings
              </p>
            </>
          )}
          {collapsed && <div className="border-t border-border my-2" />}
          <Link href="/app/dashboard">
            <div
              className={cn(
                "flex items-center gap-3 px-2.5 py-2 rounded-md text-sm font-medium transition-all duration-150 group",
                "text-muted-foreground hover:text-foreground hover:bg-secondary",
                collapsed && "justify-center px-0"
              )}
            >
              <Settings className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0" />
              {!collapsed && <span>Settings</span>}
            </div>
          </Link>
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "flex items-center justify-center w-full py-1.5 rounded-md",
              "text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-xs gap-1.5"
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
