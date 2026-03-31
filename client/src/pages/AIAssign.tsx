/* =============================================================
   AIAssign — Step 3: AI parses profiles and assigns roles
   Signal Design: Dark cards with teal progress indicators
   ============================================================= */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Sparkles, ArrowRight, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDelegatr, Assignment, SubTask } from "@/contexts/DelegatrContext";
import StepHeader from "@/components/StepHeader";

// Mock AI parsing and assignment logic
function mockAIAssign(employees: any[], task: any): Assignment[] {
  if (!task) return [];

  const skillKeywords: Record<string, string[]> = {
    frontend: ["react", "vue", "angular", "typescript", "css", "html", "ui", "ux", "design"],
    backend: ["node", "python", "java", "database", "api", "sql", "rest", "graphql"],
    devops: ["docker", "kubernetes", "aws", "ci/cd", "deployment", "infrastructure"],
    qa: ["testing", "test", "qa", "automation", "selenium", "cypress"],
    design: ["design", "figma", "ui", "ux", "visual", "branding"],
  };

  return employees.map((emp) => {
    const resumeLower = (emp.resumeText + emp.githubUsername).toLowerCase();
    const taskLower = (task.description + task.tags.join(" ")).toLowerCase();

    // Score based on keyword matches
    const roleScores: Record<string, number> = {};
    for (const [role, keywords] of Object.entries(skillKeywords)) {
      roleScores[role] = keywords.filter((kw) => resumeLower.includes(kw)).length;
    }

    const bestRole = Object.entries(roleScores).sort(([, a], [, b]) => b - a)[0];
    const assignedRole = bestRole ? bestRole[0] : "General";
    const matchScore = Math.min(100, (bestRole ? bestRole[1] * 15 : 30) + Math.random() * 20);

    // Extract skills
    const skills = Object.entries(skillKeywords)
      .filter(([_, kws]) => kws.some((kw) => resumeLower.includes(kw)))
      .map(([role]) => role.charAt(0).toUpperCase() + role.slice(1));

    // Create subtasks
    const subtasks: SubTask[] = [
      {
        id: nanoid(),
        title: `Setup ${assignedRole} environment`,
        description: `Prepare and configure the ${assignedRole} development environment`,
        assignedTo: emp.id,
        status: "todo",
        priority: "high",
      },
      {
        id: nanoid(),
        title: `Implement core ${assignedRole} features`,
        description: `Build the main functionality for this task`,
        assignedTo: emp.id,
        status: "todo",
        priority: "high",
      },
      {
        id: nanoid(),
        title: `Testing and validation`,
        description: `Test and validate the implementation`,
        assignedTo: emp.id,
        status: "todo",
        priority: "medium",
      },
    ];

    return {
      employeeId: emp.id,
      role: assignedRole,
      rationale: `Strong match for ${assignedRole} role based on experience with ${skills.slice(0, 2).join(", ")}`,
      matchScore,
      keySkills: skills,
      subtasks,
    };
  });
}

export default function AIAssign() {
  const [, navigate] = useLocation();
  const { task, employees, setAssignments, setCurrentStep } = useDelegatr();
  const [isProcessing, setIsProcessing] = useState(false);
  const [assignments, setLocalAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (!task || employees.length === 0) {
      navigate("/app/new-task");
      return;
    }

    // Auto-trigger AI parsing
    const timer = setTimeout(() => {
      setIsProcessing(true);
      setTimeout(() => {
        const result = mockAIAssign(employees, task);
        setLocalAssignments(result);
        setIsProcessing(false);
        toast.success("AI assignment complete!");
      }, 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, [task, employees, navigate]);

  const handleConfirm = () => {
    setAssignments(assignments);
    setCurrentStep(4);
    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen p-8">
      <StepHeader
        step={3}
        totalSteps={4}
        title="AI Role Assignment"
        subtitle="Our AI is analyzing profiles and assigning optimal roles. Review and confirm the assignments."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 max-w-4xl"
      >
        {isProcessing && (
          <div className="glass-card rounded-xl p-12 text-center border border-primary/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h3 className="text-foreground font-semibold mb-2">Analyzing Profiles...</h3>
            <p className="text-muted-foreground text-sm">
              AI is parsing resumes and GitHub profiles to find the best role matches.
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                  className="w-1 h-6 bg-primary rounded-full"
                />
              ))}
            </div>
          </div>
        )}

        {!isProcessing && assignments.length > 0 && (
          <div className="space-y-4">
            {assignments.map((assignment, idx) => {
              const emp = employees.find((e) => e.id === assignment.employeeId);
              if (!emp) return null;

              return (
                <motion.div
                  key={assignment.employeeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold text-white"
                        style={{ backgroundColor: emp.avatar }}
                      >
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold">{emp.name}</h3>
                        <p className="text-muted-foreground text-xs">{emp.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-foreground font-bold mono">
                          {Math.round(assignment.matchScore)}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                  </div>

                  {/* Match bar */}
                  <div className="mb-4">
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${assignment.matchScore}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-electric rounded-full"
                      />
                    </div>
                  </div>

                  {/* Role and rationale */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-foreground">Assigned Role:</span>
                      <span className="skill-tag">{assignment.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{assignment.rationale}</p>
                  </div>

                  {/* Skills */}
                  {assignment.keySkills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {assignment.keySkills.map((skill) => (
                          <span key={skill} className="skill-tag text-xs">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subtasks preview */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Assigned Subtasks ({assignment.subtasks.length})
                    </p>
                    <div className="space-y-1.5">
                      {assignment.subtasks.map((st) => (
                        <div key={st.id} className="flex items-start gap-2 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{st.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Confirm button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleConfirm}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 h-11"
              >
                Confirm Assignments <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
