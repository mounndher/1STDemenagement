import React from 'react';
import { Check } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  maxReachedStep: number;
}

const STEPS = [
  { id: 1, title: 'Adresses & Accès', shortTitle: 'Adresses' },
  { id: 2, title: 'Volume en m³', shortTitle: 'Volume' },
  { id: 3, title: 'Formule & Options', shortTitle: 'Formule' },
  { id: 4, title: 'Date & Coordonnées', shortTitle: 'Contact' },
  { id: 5, title: 'Devis & Synthèse', shortTitle: 'Devis' },
];

export const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  onStepClick,
  maxReachedStep
}) => {
  return (
    <div className="w-full bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Background connector line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
          <div
            className="absolute top-4 left-6 h-0.5 bg-blue-600 transition-all duration-300 -z-0"
            style={{ width: `${((Math.min(currentStep, 5) - 1) / 4) * 100}%` }}
          />

          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isClickable = step.id <= maxReachedStep;

            return (
              <button
                key={step.id}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                className={`flex flex-col items-center relative z-10 group cursor-pointer disabled:cursor-not-allowed ${
                  !isClickable ? 'opacity-50' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-50'
                      : isCurrent
                      ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100 scale-110'
                      : 'bg-white text-slate-500 border-2 border-slate-300 group-hover:border-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium hidden sm:block whitespace-nowrap ${
                    isCurrent ? 'text-blue-600 font-bold' : isCompleted ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
                <span
                  className={`text-[10px] mt-1 font-medium sm:hidden ${
                    isCurrent ? 'text-blue-600 font-bold' : 'text-slate-500'
                  }`}
                >
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
