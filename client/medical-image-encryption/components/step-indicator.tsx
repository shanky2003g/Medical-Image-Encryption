import { Lock, Unlock, Scan, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { id: 1, name: "Upload", icon: Scan, color: "cyan" },
    { id: 2, name: "Encrypt", icon: Lock, color: "blue" },
    { id: 3, name: "Decrypt", icon: Unlock, color: "cyan" },
    { id: 4, name: "Reconstruct", icon: Scan, color: "teal" },
    { id: 5, name: "Complete", icon: ShieldCheck, color: "green" },
  ]

  // Color mapping for each step
  const getStepColors = (stepId: number, isActive: boolean) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string; iconText: string }> = {
      cyan: {
        bg: isActive ? "bg-cyan-100" : "bg-gray-100",
        border: isActive ? "border-cyan-400" : "border-gray-200",
        text: isActive ? "text-cyan-700" : "text-gray-500",
        iconBg: isActive ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gray-200",
        iconText: "text-white",
      },
      blue: {
        bg: isActive ? "bg-blue-100" : "bg-gray-100",
        border: isActive ? "border-blue-400" : "border-gray-200",
        text: isActive ? "text-blue-700" : "text-gray-500",
        iconBg: isActive ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gray-200",
        iconText: "text-white",
      },
      teal: {
        bg: isActive ? "bg-teal-100" : "bg-gray-100",
        border: isActive ? "border-teal-400" : "border-gray-200",
        text: isActive ? "text-teal-700" : "text-gray-500",
        iconBg: isActive ? "bg-gradient-to-r from-teal-500 to-green-500" : "bg-gray-200",
        iconText: "text-white",
      },
      green: {
        bg: isActive ? "bg-green-100" : "bg-gray-100",
        border: isActive ? "border-green-400" : "border-gray-200",
        text: isActive ? "text-green-700" : "text-gray-500",
        iconBg: isActive ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-200",
        iconText: "text-white",
      },
    }

    const step = steps.find((s) => s.id === stepId)
    return step ? colorMap[step.color as keyof typeof colorMap] : colorMap.gray
  }

  return (
    <div className="hidden sm:block">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-full -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStep - 1) * 25}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const StepIcon = step.icon
            const isActive = currentStep >= step.id
            const isComplete = currentStep > step.id
            const colors = getStepColors(step.id, isActive)

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 shadow-md transition-all duration-300",
                    colors.iconBg,
                    colors.border,
                  )}
                >
                  <StepIcon className={cn("h-6 w-6", colors.iconText)} />
                </div>
                <span className={cn("mt-2 text-sm font-medium transition-colors duration-300", colors.text)}>
                  {step.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

