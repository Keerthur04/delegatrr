/* =============================================================
   DELEGATR App.tsx — Signal Design System
   Routes: Landing, New Task, Team Setup, AI Assign, Dashboard, Checklist
   ============================================================= */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DelegatrProvider } from "./contexts/DelegatrContext";
import Landing from "./pages/Landing";
import NewTask from "./pages/NewTask";
import TeamSetup from "./pages/TeamSetup";
import AIAssign from "./pages/AIAssign";
import Dashboard from "./pages/Dashboard";
import Checklist from "./pages/Checklist";
import AppLayout from "./components/AppLayout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/app/new-task">
        {() => (
          <AppLayout>
            <NewTask />
          </AppLayout>
        )}
      </Route>
      <Route path="/app/team-setup">
        {() => (
          <AppLayout>
            <TeamSetup />
          </AppLayout>
        )}
      </Route>
      <Route path="/app/ai-assign">
        {() => (
          <AppLayout>
            <AIAssign />
          </AppLayout>
        )}
      </Route>
      <Route path="/app/dashboard">
        {() => (
          <AppLayout>
            <Dashboard />
          </AppLayout>
        )}
      </Route>
      <Route path="/app/checklist/:employeeId?">
        {(params) => (
          <AppLayout>
            <Checklist employeeId={params.employeeId} />
          </AppLayout>
        )}
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <DelegatrProvider>
          <TooltipProvider>
            <Toaster position="bottom-right" theme="dark" />
            <Router />
          </TooltipProvider>
        </DelegatrProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
