/* =============================================================
   StepHeader — Shared step progress indicator
   ============================================================= */

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepHeaderProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

const STEP_LABELS = ["Define Task", "Add Team", "AI Assign", "Track Progress"];

export default function StepHeader({ step, totalSteps, title, subtitle }: StepHeaderProps) {
  return (
    <div className="border-b border-border pb-6">
      {/* Step indicators */}
      <div className="flex items-center gap-0 mb-6">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < step;
          const isActive = stepNum === step;
          return (
            <div key={stepNum} className="flex items-center">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mono transition-all",
                  isActive && "step-active",
                  isComplete && "step-complete",
                  !isActive && !isComplete && "step-pending"
                )}
              >
                {isComplete ? <Check className="w-3.5 h-3.5" /> : stepNum}
              </div>
              {stepNum < totalSteps && (
                <div
                  className={cn(
                    "h-px w-16 transition-colors",
                    isComplete ? "bg-primary/50" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
        <div className="ml-4 flex items-center gap-2">
          {STEP_LABELS.slice(0, totalSteps).map((label, i) => {
            if (i + 1 !== step) return null;
            return (
              <span key={label} className="text-xs text-muted-foreground mono">
                Step {step} of {totalSteps} — {label}
              </span>
            );
          })}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2 max-w-xl leading-relaxed">{subtitle}</p>
    </div>
  );
}
