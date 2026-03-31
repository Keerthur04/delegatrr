/* =============================================================
   Dashboard — Manager view with live progress tracking
   Signal Design: Asymmetric layout with progress rings and bars
   ============================================================= */

import { motion } from "framer-motion";
import { BarChart3, Users, Zap, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { useDelegatr } from "@/contexts/DelegatrContext";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { task, employees, assignments } = useDelegatr();

  if (!task || assignments.length === 0) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <BarChart3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">No Active Task</h2>
          <p className="text-muted-foreground mb-6">
            Create a task and set up your team to see the dashboard.
          </p>
          <Link href="/app/new-task">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start a New Task
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate metrics
  const totalSubtasks = assignments.reduce((sum, a) => sum + a.subtasks.length, 0);
  const completedSubtasks = assignments.reduce(
    (sum, a) => sum + a.subtasks.filter((st) => st.status === "done").length,
    0
  );
  const inProgressSubtasks = assignments.reduce(
    (sum, a) => sum + a.subtasks.filter((st) => st.status === "in_progress").length,
    0
  );
  const overallProgress = Math.round((completedSubtasks / totalSubtasks) * 100);

  const avgMatchScore = Math.round(
    assignments.reduce((sum, a) => sum + a.matchScore, 0) / assignments.length
  );

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
              {task.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl">{task.description}</p>
          </div>
          <Link href="/app/new-task">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
              New Task
            </Button>
          </Link>
        </div>

        {/* Task meta */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            Due {new Date(task.deadline).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            {employees.length} team {employees.length === 1 ? "member" : "members"}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            {task.tags.length > 0 ? task.tags.join(", ") : "No tags"}
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall progress card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 glass-card rounded-xl p-6 border border-primary/10"
        >
          <p className="text-xs text-muted-foreground mono mb-4">OVERALL PROGRESS</p>
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-primary mono mb-1">{overallProgress}%</div>
              <p className="text-muted-foreground text-sm">
                {completedSubtasks} of {totalSubtasks} tasks done
              </p>
            </div>
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="oklch(1 0 0 / 8%)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="oklch(0.72 0.14 185)"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                  animate={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - overallProgress / 100)}` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">In Progress</span>
              <span className="text-foreground font-medium">{inProgressSubtasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed</span>
              <span className="text-primary font-medium">{completedSubtasks}</span>
            </div>
          </div>
        </motion.div>

        {/* Team metrics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-xl p-6 border border-primary/10"
        >
          <p className="text-xs text-muted-foreground mono mb-4">TEAM METRICS</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Avg. Match Score</p>
              <div className="text-3xl font-bold text-primary mono">{avgMatchScore}%</div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Team Members</p>
              <div className="text-3xl font-bold text-foreground mono">{employees.length}</div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Total Subtasks</p>
              <div className="text-3xl font-bold text-foreground mono">{totalSubtasks}</div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">On Track</p>
              <div className="text-3xl font-bold text-primary mono">
                {Math.round((assignments.filter((a) => a.matchScore > 70).length / assignments.length) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Team assignments */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Team Assignments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map((assignment, idx) => {
            const emp = employees.find((e) => e.id === assignment.employeeId);
            if (!emp) return null;

            const empCompleted = assignment.subtasks.filter((st) => st.status === "done").length;
            const empProgress = Math.round((empCompleted / assignment.subtasks.length) * 100);

            return (
              <motion.div
                key={assignment.employeeId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="glass-card rounded-lg p-5 hover:border-primary/20 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold text-white"
                    style={{ backgroundColor: emp.avatar }}
                  >
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-semibold text-sm">{emp.name}</h3>
                    <p className="text-muted-foreground text-xs">{assignment.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-primary mono">{Math.round(assignment.matchScore)}%</div>
                    <p className="text-muted-foreground text-xs">Match</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-xs font-semibold text-foreground mono">
                      {empCompleted}/{assignment.subtasks.length}
                    </p>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${empProgress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-electric rounded-full"
                    />
                  </div>
                </div>

                {/* Subtasks */}
                <div className="space-y-1.5">
                  {assignment.subtasks.slice(0, 2).map((st) => (
                    <div key={st.id} className="flex items-start gap-2 text-xs">
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          st.status === "done"
                            ? "bg-primary border-primary"
                            : "border-border bg-transparent"
                        }`}
                      >
                        {st.status === "done" && (
                          <span className="text-primary-foreground text-xs">✓</span>
                        )}
                      </div>
                      <span
                        className={st.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}
                      >
                        {st.title}
                      </span>
                    </div>
                  ))}
                  {assignment.subtasks.length > 2 && (
                    <p className="text-xs text-muted-foreground pl-5">
                      +{assignment.subtasks.length - 2} more
                    </p>
                  )}
                </div>

                {/* View checklist link */}
                <Link href={`/app/checklist/${assignment.employeeId}`}>
                  <button className="mt-4 w-full py-1.5 px-2 rounded text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
                    View Checklist →
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
