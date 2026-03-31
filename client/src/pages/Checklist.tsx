/* =============================================================
   Checklist — Employee view for tracking assigned subtasks
   Signal Design: Checklist with status indicators
   ============================================================= */

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, Clock, Zap } from "lucide-react";
import { useDelegatr, SubTask } from "@/contexts/DelegatrContext";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChecklistProps {
  employeeId?: string;
}

export default function Checklist({ employeeId }: ChecklistProps) {
  const { employees, assignments, getEmployeeById, getAssignmentByEmployee, updateSubtaskStatus } = useDelegatr();
  const [selectedStatus, setSelectedStatus] = useState<"all" | "todo" | "in_progress" | "done">("all");

  // Get employee from URL or first assignment
  const emp = employeeId ? getEmployeeById(employeeId) : employees[0];
  const assignment = emp ? getAssignmentByEmployee(emp.id) : null;

  if (!emp || !assignment) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">No Assignment Found</h2>
          <p className="text-muted-foreground mb-6">
            This employee doesn't have any assigned tasks yet.
          </p>
          <Link href="/app/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredTasks = assignment.subtasks.filter((st) => {
    if (selectedStatus === "all") return true;
    return st.status === selectedStatus;
  });

  const stats = {
    total: assignment.subtasks.length,
    done: assignment.subtasks.filter((st) => st.status === "done").length,
    inProgress: assignment.subtasks.filter((st) => st.status === "in_progress").length,
    todo: assignment.subtasks.filter((st) => st.status === "todo").length,
  };

  const handleStatusChange = (subtaskId: string, newStatus: SubTask["status"]) => {
    updateSubtaskStatus(subtaskId, newStatus);
    const statusLabel = newStatus === "done" ? "completed" : newStatus === "in_progress" ? "started" : "reset";
    toast.success(`Task ${statusLabel}`);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-semibold text-white"
              style={{ backgroundColor: emp.avatar }}
            >
              {emp.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">{emp.name}</h1>
              <p className="text-muted-foreground">
                Role: <span className="skill-tag">{assignment.role}</span>
              </p>
            </div>
          </div>
          <Link href="/app/dashboard">
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total", value: stats.total, icon: Zap, color: "text-foreground" },
            { label: "To Do", value: stats.todo, icon: Circle, color: "text-muted-foreground" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-primary" },
            { label: "Done", value: stats.done, icon: CheckCircle2, color: "text-primary" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card rounded-lg p-3 text-center">
                <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        {(["all", "todo", "in_progress", "done"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedStatus === status
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {status === "all" ? "All" : status === "todo" ? "To Do" : status === "in_progress" ? "In Progress" : "Done"}
          </button>
        ))}
      </motion.div>

      {/* Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {filteredTasks.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center border border-dashed border-border">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              {selectedStatus === "done"
                ? "No completed tasks yet. Keep working!"
                : "All tasks completed! Great work."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="glass-card rounded-lg p-5 hover:border-primary/20 transition-colors group"
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="flex-shrink-0 pt-1">
                  <button
                    onClick={() => {
                      if (task.status === "done") {
                        handleStatusChange(task.id, "todo");
                      } else if (task.status === "todo") {
                        handleStatusChange(task.id, "in_progress");
                      } else {
                        handleStatusChange(task.id, "done");
                      }
                    }}
                    className="relative w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      borderColor:
                        task.status === "done"
                          ? "oklch(0.72 0.14 185)"
                          : task.status === "in_progress"
                            ? "oklch(0.75 0.16 60)"
                            : "oklch(1 0 0 / 15%)",
                      backgroundColor:
                        task.status === "done"
                          ? "oklch(0.72 0.14 185)"
                          : task.status === "in_progress"
                            ? "oklch(0.75 0.16 60 / 20%)"
                            : "transparent",
                    }}
                  >
                    {task.status === "done" && (
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    )}
                    {task.status === "in_progress" && (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-base transition-all ${
                      task.status === "done"
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{task.description}</p>

                  {/* Priority badge */}
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      className="text-xs px-2 py-1 rounded font-medium mono"
                      style={{
                        color:
                          task.priority === "high"
                            ? "oklch(0.65 0.22 25)"
                            : task.priority === "medium"
                              ? "oklch(0.75 0.16 60)"
                              : "oklch(0.72 0.14 145)",
                        backgroundColor:
                          task.priority === "high"
                            ? "oklch(0.65 0.22 25 / 15%)"
                            : task.priority === "medium"
                              ? "oklch(0.75 0.16 60 / 15%)"
                              : "oklch(0.72 0.14 145 / 15%)",
                      }}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    {task.dueDate && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0 text-right">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium mono"
                    style={{
                      color:
                        task.status === "done"
                          ? "oklch(0.72 0.14 185)"
                          : task.status === "in_progress"
                            ? "oklch(0.75 0.16 60)"
                            : "oklch(0.55 0.010 220)",
                      backgroundColor:
                        task.status === "done"
                          ? "oklch(0.72 0.14 185 / 15%)"
                          : task.status === "in_progress"
                            ? "oklch(0.75 0.16 60 / 15%)"
                            : "oklch(1 0 0 / 5%)",
                    }}
                  >
                    {task.status === "done"
                      ? "Done"
                      : task.status === "in_progress"
                        ? "In Progress"
                        : "To Do"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Completion message */}
      {stats.done === stats.total && stats.total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass-card rounded-xl p-6 border border-primary/20 text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="text-foreground font-semibold mb-2">All Tasks Complete!</h3>
          <p className="text-muted-foreground text-sm">
            Great work, {emp.name}! All your assigned tasks are done. The dashboard has been updated.
          </p>
        </motion.div>
      )}
    </div>
  );
}
