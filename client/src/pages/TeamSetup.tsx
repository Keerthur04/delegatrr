/* =============================================================
   TeamSetup — Step 2: Add team members with resumes and GitHub
   ============================================================= */

import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Plus, Trash2, Github, FileText, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDelegatr, Employee } from "@/contexts/DelegatrContext";
import StepHeader from "@/components/StepHeader";

export default function TeamSetup() {
  const [, navigate] = useLocation();
  const { employees, setEmployees, setCurrentStep } = useDelegatr();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    githubUsername: "",
    resumeText: "",
  });

  const addEmployee = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.resumeText.trim() && !formData.githubUsername.trim()) {
      toast.error("Add either a resume or GitHub username");
      return;
    }

    const newEmployee: Employee = {
      id: nanoid(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim() || "Team Member",
      githubUsername: formData.githubUsername.trim(),
      resumeText: formData.resumeText.trim(),
      skills: [],
      experience: "",
      avatar: "",
    };

    setEmployees([...employees, newEmployee]);
    setFormData({ name: "", email: "", role: "", githubUsername: "", resumeText: "" });
    toast.success(`${newEmployee.name} added to team`);
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
    toast.success("Employee removed");
  };

  const handleContinue = () => {
    if (employees.length === 0) {
      toast.error("Add at least one team member");
      return;
    }
    setCurrentStep(3);
    navigate("/app/ai-assign");
  };

  return (
    <div className="min-h-screen p-8">
      <StepHeader
        step={2}
        totalSteps={4}
        title="Add Your Team"
        subtitle="Upload resumes and GitHub profiles. The AI will parse them to understand each person's skills and experience."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="glass-card rounded-xl p-5 space-y-4">
            <h3 className="text-foreground font-semibold text-sm mono">ADD TEAM MEMBER</h3>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sarah Chen"
                className="bg-background border-border h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@company.com"
                className="bg-background border-border h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Current Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Senior Engineer"
                className="bg-background border-border h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                GitHub Username
              </Label>
              <Input
                value={formData.githubUsername}
                onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                placeholder="e.g. sarahchen"
                className="bg-background border-border h-9 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Resume / Experience
              </Label>
              <Textarea
                value={formData.resumeText}
                onChange={(e) => setFormData({ ...formData, resumeText: e.target.value })}
                placeholder="Paste resume text or experience summary here..."
                className="bg-background border-border text-sm min-h-24 resize-none"
              />
            </div>

            <Button
              onClick={addEmployee}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </div>
        </motion.div>

        {/* Team list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-foreground font-semibold">Team Members</h3>
              <p className="text-muted-foreground text-sm">
                {employees.length} {employees.length === 1 ? "person" : "people"} added
              </p>
            </div>
          </div>

          {employees.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center border border-dashed border-border">
              <p className="text-muted-foreground text-sm">No team members yet. Add someone to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {employees.map((emp, idx) => (
                <motion.div
                  key={emp.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-card rounded-lg p-4 flex items-start justify-between group hover:border-primary/20 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                        style={{ backgroundColor: emp.avatar }}
                      >
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-foreground font-semibold text-sm">{emp.name}</h4>
                        <p className="text-muted-foreground text-xs">{emp.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {emp.email && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {emp.email}
                        </span>
                      )}
                      {emp.githubUsername && (
                        <span className="text-xs text-primary flex items-center gap-1">
                          <Github className="w-3 h-3" />
                          {emp.githubUsername}
                        </span>
                      )}
                    </div>
                    {emp.resumeText && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        {emp.resumeText.substring(0, 80)}...
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeEmployee(emp.id)}
                    className="ml-2 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Continue button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleContinue}
              disabled={employees.length === 0}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 h-11"
            >
              Continue to AI Assignment <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
