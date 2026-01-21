

"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
  icon: React.ReactNode;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function CheckoutStepper({ steps, currentStep }: CheckoutStepperProps) {
  return (
    <div className="relative">
      <div className="flex justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : isCurrent
                    ? "border-green-600 bg-white text-green-600"
                    : "border-gray-300 bg-white text-gray-400"
                )}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <div className="flex flex-col items-center">
                    {step.icon}
                    <span className="text-xs mt-1">{step.number}</span>
                  </div>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <p className={cn(
                  "text-sm font-medium",
                  isCompleted || isCurrent ? "text-green-700" : "text-gray-500"
                )}>
                  {step.label}
                </p>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute top-6 left-1/2 w-full h-0.5 -z-10 transition-colors duration-300",
                    isCompleted ? "bg-green-600" : "bg-gray-300"
                  )}
                  style={{ width: "calc(100% + 2rem)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}