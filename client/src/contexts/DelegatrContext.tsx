/* =============================================================
   DelegatrContext — Global state for task, team, assignments
   ============================================================= */

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  resumeText: string;
  githubUsername: string;
  skills: string[];
  experience: string;
  avatar: string; // initials-based color
}

export interface SubTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // employee id
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

export interface Assignment {
  employeeId: string;
  role: string;
  rationale: string;
  matchScore: number;
  keySkills: string[];
  subtasks: SubTask[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  createdAt: string;
}

interface DelegatrState {
  task: Task | null;
  employees: Employee[];
  assignments: Assignment[];
  currentStep: number;
  setTask: (task: Task) => void;
  setEmployees: (employees: Employee[]) => void;
  setAssignments: (assignments: Assignment[]) => void;
  setCurrentStep: (step: number) => void;
  updateSubtaskStatus: (subtaskId: string, status: SubTask["status"]) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  getAssignmentByEmployee: (employeeId: string) => Assignment | undefined;
}

const DelegatrContext = createContext<DelegatrState | null>(null);

const AVATAR_COLORS = [
  "oklch(0.72 0.14 185)",
  "oklch(0.65 0.18 255)",
  "oklch(0.80 0.12 145)",
  "oklch(0.75 0.16 60)",
  "oklch(0.68 0.18 310)",
  "oklch(0.70 0.15 30)",
];

export function DelegatrProvider({ children }: { children: ReactNode }) {
  const [task, setTask] = useState<Task | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const updateSubtaskStatus = (subtaskId: string, status: SubTask["status"]) => {
    setAssignments((prev) =>
      prev.map((assignment) => ({
        ...assignment,
        subtasks: assignment.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, status } : st
        ),
      }))
    );
  };

  const getEmployeeById = (id: string) => employees.find((e) => e.id === id);
  const getAssignmentByEmployee = (employeeId: string) =>
    assignments.find((a) => a.employeeId === employeeId);

  const handleSetEmployees = (emps: Employee[]) => {
    const withColors = emps.map((e, i) => ({
      ...e,
      avatar: AVATAR_COLORS[i % AVATAR_COLORS.length],
    }));
    setEmployees(withColors);
  };

  return (
    <DelegatrContext.Provider
      value={{
        task,
        employees,
        assignments,
        currentStep,
        setTask,
        setEmployees: handleSetEmployees,
        setAssignments,
        setCurrentStep,
        updateSubtaskStatus,
        getEmployeeById,
        getAssignmentByEmployee,
      }}
    >
      {children}
    </DelegatrContext.Provider>
  );
}

export function useDelegatr() {
  const ctx = useContext(DelegatrContext);
  if (!ctx) throw new Error("useDelegatr must be used within DelegatrProvider");
  return ctx;
}
