import type { ReactNode } from "react"

interface SecurityBadgeProps {
  icon: ReactNode
  text: string
}

export default function SecurityBadge({ icon, text }: SecurityBadgeProps) {
  return (
    <div className="bg-white/20 px-3 py-1 rounded-full flex items-center text-xs font-medium text-white">
      <span className="mr-1">{icon}</span>
      {text}
    </div>
  )
}

