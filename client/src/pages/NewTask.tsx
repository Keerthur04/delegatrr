/* =============================================================
   NewTask — Step 1: Define the task with details
   Signal Design: Dark form with teal accents
   ============================================================= */

import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { CalendarDays, Tag, AlertCircle, FileText, ArrowRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDelegatr } from "@/contexts/DelegatrContext";
import StepHeader from "@/components/StepHeader";

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "oklch(0.72 0.14 145)" },
  { value: "medium", label: "Medium", color: "oklch(0.75 0.16 60)" },
  { value: "high", label: "High", color: "oklch(0.65 0.22 25)" },
] as const;

export default function NewTask() {
  const [, navigate] = useLocation();
  const { setTask, setCurrentStep } = useDelegatr();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Task description is required");
      return;
    }
    if (!deadline) {
      toast.error("Please set a deadline");
      return;
    }

    setTask({
      id: nanoid(),
      title: title.trim(),
      description: description.trim(),
      deadline,
      priority,
      tags,
      createdAt: new Date().toISOString(),
    });
    setCurrentStep(2);
    toast.success("Task saved — now add your team");
    navigate("/app/team-setup");
  };

  return (
    <div className="min-h-screen p-8">
      <StepHeader
        step={1}
        totalSteps={4}
        title="Define the Task"
        subtitle="Describe what needs to be done in detail. The more context you provide, the better the AI can assign roles."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mt-8 space-y-6"
      >
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Task Title
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build the authentication system for our web app"
            className="bg-card border-border text-foreground placeholder:text-muted-foreground h-11"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Task Description
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the full scope of the task. Include technical requirements, expected deliverables, dependencies, and any constraints. The AI will use this to understand what skills are needed."
            className="bg-card border-border text-foreground placeholder:text-muted-foreground min-h-36 resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Be specific — mention technologies, frameworks, or domain knowledge required.
          </p>
        </div>

        {/* Deadline & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-foreground font-medium flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              Deadline
            </Label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="bg-card border-border text-foreground h-11"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Priority
            </Label>
            <div className="flex gap-2 h-11">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPriority(opt.value)}
                  className="flex-1 rounded-md border text-sm font-medium transition-all"
                  style={{
                    borderColor: priority === opt.value ? opt.color : "oklch(1 0 0 / 8%)",
                    backgroundColor: priority === opt.value ? `${opt.color}20` : "transparent",
                    color: priority === opt.value ? opt.color : "oklch(0.55 0.010 220)",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            Tags <span className="text-muted-foreground text-xs font-normal">(optional)</span>
          </Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="e.g. frontend, api, security"
              className="bg-card border-border text-foreground placeholder:text-muted-foreground h-10 flex-1"
            />
            <Button onClick={addTag} variant="outline" size="sm" className="h-10 border-border">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="skill-tag flex items-center gap-1.5 cursor-pointer hover:bg-destructive/20 hover:border-destructive/40 hover:text-destructive transition-colors"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3" />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Preview card */}
        {title && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-card rounded-xl p-4 border border-primary/20"
          >
            <p className="text-xs text-primary mono mb-2">TASK PREVIEW</p>
            <h3 className="text-foreground font-semibold">{title}</h3>
            {description && (
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
            )}
            <div className="flex items-center gap-3 mt-3">
              {deadline && (
                <span className="text-xs text-muted-foreground mono">
                  Due {new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              )}
              <span
                className="text-xs px-2 py-0.5 rounded mono font-medium"
                style={{
                  color: PRIORITY_OPTIONS.find(p => p.value === priority)?.color,
                  backgroundColor: `${PRIORITY_OPTIONS.find(p => p.value === priority)?.color}20`,
                }}
              >
                {priority.toUpperCase()}
              </span>
              {tags.map((t) => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 h-11"
          >
            Continue to Team Setup <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
