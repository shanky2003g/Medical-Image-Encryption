"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Binary } from "lucide-react"
import { cn } from "@/lib/utils"

interface LatentVectorDisplayProps {
  title: string
  vector: number[]
  maxDisplay?: number
  colorScheme?: "blue" | "cyan" | "teal" | "green"
}

export default function LatentVectorDisplay({
  title,
  vector,
  maxDisplay = 10,
  colorScheme = "blue",
}: LatentVectorDisplayProps) {
  const [showAll, setShowAll] = useState(false)

  const displayVector = showAll ? vector : vector.slice(0, maxDisplay)
  const hasMore = vector.length > maxDisplay

  // Color scheme mapping
  const colorMap = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      border: "border-blue-200",
      text: "text-blue-700",
      item: {
        bg: "bg-white",
        border: "border-blue-100",
        hover: "hover:border-blue-300 hover:shadow-md",
        label: "text-blue-400",
        value: "text-blue-900",
      },
      button: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
    },
    cyan: {
      bg: "bg-gradient-to-br from-cyan-50 to-blue-50",
      border: "border-cyan-200",
      text: "text-cyan-700",
      item: {
        bg: "bg-white",
        border: "border-cyan-100",
        hover: "hover:border-cyan-300 hover:shadow-md",
        label: "text-cyan-400",
        value: "text-cyan-900",
      },
      button: "text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50",
    },
    teal: {
      bg: "bg-gradient-to-br from-teal-50 to-green-50",
      border: "border-teal-200",
      text: "text-teal-700",
      item: {
        bg: "bg-white",
        border: "border-teal-100",
        hover: "hover:border-teal-300 hover:shadow-md",
        label: "text-teal-400",
        value: "text-teal-900",
      },
      button: "text-teal-600 hover:text-teal-800 hover:bg-teal-50",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border-green-200",
      text: "text-green-700",
      item: {
        bg: "bg-white",
        border: "border-green-100",
        hover: "hover:border-green-300 hover:shadow-md",
        label: "text-green-400",
        value: "text-green-900",
      },
      button: "text-green-600 hover:text-green-800 hover:bg-green-50",
    },
  }

  const colors = colorMap[colorScheme]

  return (
    <div className="space-y-2">
      <h3 className={cn("text-sm font-medium flex items-center", colors.text)}>
        <Binary className="h-4 w-4 mr-1" />
        {title}
      </h3>
      <Card className={cn("p-5 shadow-md border relative", colors.bg, colors.border)}>
        <div className="absolute inset-0 bg-binary-pattern opacity-5 rounded-lg pointer-events-none"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {displayVector.map((value, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg p-3 text-center border transition-all duration-200",
                colors.item.bg,
                colors.item.border,
                colors.item.hover,
              )}
            >
              <span className={cn("text-xs block mb-1", colors.item.label)}>[{index}]</span>
              <span className={cn("font-mono font-medium", colors.item.value)}>{value.toFixed(4)}</span>
            </div>
          ))}
        </div>

        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            className={cn("mt-3 w-full", colors.button)}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Show All ({vector.length} values)
              </>
            )}
          </Button>
        )}
      </Card>
    </div>
  )
}

