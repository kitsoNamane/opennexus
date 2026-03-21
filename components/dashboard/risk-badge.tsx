import { cn } from "@/lib/utils"
import type { RiskLevel } from "@/lib/data"
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"

interface RiskBadgeProps {
  level: RiskLevel
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function RiskBadge({ level, showIcon = true, size = "md", className }: RiskBadgeProps) {
  const styles: Record<RiskLevel, string> = {
    critical: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-accent/10 text-accent-foreground border-accent/20",
    good: "bg-success/10 text-success border-success/20",
  }

  const icons: Record<RiskLevel, React.ReactNode> = {
    critical: <AlertCircle className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />,
    warning: <AlertTriangle className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />,
    good: <CheckCircle className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />,
  }

  const labels: Record<RiskLevel, string> = {
    critical: "Critical",
    warning: "Warning",
    good: "Good",
  }

  const sizeStyles = {
    sm: "text-xs px-1.5 py-0.5 gap-1",
    md: "text-sm px-2 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  }

  return (
    <span className={cn(
      "inline-flex items-center font-medium rounded-full border",
      styles[level],
      sizeStyles[size],
      className
    )}>
      {showIcon && icons[level]}
      {labels[level]}
    </span>
  )
}

// Stock gauge visualization
interface StockGaugeProps {
  daysOfStock: number
  maxDays?: number
  showLabel?: boolean
  className?: string
}

export function StockGauge({ 
  daysOfStock, 
  maxDays = 90, 
  showLabel = true,
  className 
}: StockGaugeProps) {
  const percentage = Math.min((daysOfStock / maxDays) * 100, 100)
  
  let level: RiskLevel = "good"
  if (daysOfStock < 15) level = "critical"
  else if (daysOfStock < 30) level = "warning"

  const barColors: Record<RiskLevel, string> = {
    critical: "bg-destructive",
    warning: "bg-accent",
    good: "bg-success",
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all", barColors[level])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground">
          {daysOfStock} days of stock
        </p>
      )}
    </div>
  )
}

// Continuity ring for treatment progress
interface ContinuityRingProps {
  percentage: number
  size?: "sm" | "md" | "lg"
  showPercentage?: boolean
  label?: string
  className?: string
}

export function ContinuityRing({
  percentage,
  size = "md",
  showPercentage = true,
  label,
  className,
}: ContinuityRingProps) {
  const sizes = {
    sm: { width: 48, stroke: 4 },
    md: { width: 80, stroke: 6 },
    lg: { width: 120, stroke: 8 },
  }

  const { width, stroke } = sizes[size]
  const radius = (width - stroke) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  let color = "stroke-success"
  if (percentage < 70) color = "stroke-destructive"
  else if (percentage < 85) color = "stroke-accent"

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative" style={{ width, height: width }}>
        <svg className="transform -rotate-90" width={width} height={width}>
          <circle
            className="stroke-muted"
            strokeWidth={stroke}
            fill="none"
            r={radius}
            cx={width / 2}
            cy={width / 2}
          />
          <circle
            className={cn(color, "transition-all duration-500")}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            r={radius}
            cx={width / 2}
            cy={width / 2}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn(
              "font-bold",
              size === "sm" && "text-xs",
              size === "md" && "text-lg",
              size === "lg" && "text-2xl"
            )}>
              {percentage}%
            </span>
          </div>
        )}
      </div>
      {label && (
        <p className="text-xs text-muted-foreground text-center">{label}</p>
      )}
    </div>
  )
}
