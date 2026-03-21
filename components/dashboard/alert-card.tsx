"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ContinuityAlert, RiskLevel } from "@/lib/data"
import { 
  AlertCircle, 
  AlertTriangle, 
  UserX, 
  Package, 
  Clock,
  ChevronRight,
  Bell
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface AlertCardProps {
  alert: ContinuityAlert
  onAction?: (alert: ContinuityAlert) => void
  compact?: boolean
  className?: string
}

export function AlertCard({ alert, onAction, compact = false, className }: AlertCardProps) {
  const severityStyles: Record<RiskLevel, string> = {
    critical: "border-l-destructive bg-destructive/5",
    warning: "border-l-accent bg-accent/5",
    good: "border-l-success bg-success/5",
  }

  const typeIcons: Record<ContinuityAlert["type"], React.ReactNode> = {
    "missed-pickup": <UserX className="h-4 w-4" />,
    "low-adherence": <Clock className="h-4 w-4" />,
    "stock-risk": <Package className="h-4 w-4" />,
    "treatment-gap": <AlertCircle className="h-4 w-4" />,
  }

  const typeLabels: Record<ContinuityAlert["type"], string> = {
    "missed-pickup": "Missed Pickup",
    "low-adherence": "Low Adherence",
    "stock-risk": "Stock Risk",
    "treatment-gap": "Treatment Gap",
  }

  const iconColors: Record<RiskLevel, string> = {
    critical: "text-destructive",
    warning: "text-accent-foreground",
    good: "text-success",
  }

  if (compact) {
    return (
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-lg border-l-4",
        severityStyles[alert.severity],
        className
      )}>
        <div className={cn("shrink-0", iconColors[alert.severity])}>
          {typeIcons[alert.type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{alert.message}</p>
          <p className="text-xs text-muted-foreground">{alert.district}</p>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">
          {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
        </span>
      </div>
    )
  }

  return (
    <Card className={cn("border-l-4", severityStyles[alert.severity], className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            alert.severity === "critical" && "bg-destructive/10",
            alert.severity === "warning" && "bg-accent/10",
            alert.severity === "good" && "bg-success/10"
          )}>
            <span className={iconColors[alert.severity]}>
              {typeIcons[alert.type]}
            </span>
          </div>
          
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                alert.severity === "critical" && "bg-destructive/10 text-destructive",
                alert.severity === "warning" && "bg-accent/10 text-accent-foreground",
                alert.severity === "good" && "bg-success/10 text-success"
              )}>
                {typeLabels[alert.type]}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
              </span>
            </div>
            
            <p className="text-sm font-medium">{alert.message}</p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {alert.facility && <span>{alert.facility}</span>}
              <span>{alert.district} District</span>
            </div>
          </div>

          {onAction && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="shrink-0"
              onClick={() => onAction(alert)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface AlertListProps {
  alerts: ContinuityAlert[]
  title?: string
  maxItems?: number
  compact?: boolean
  onAlertAction?: (alert: ContinuityAlert) => void
  className?: string
}

export function AlertList({ 
  alerts, 
  title = "Continuity Alerts", 
  maxItems = 5,
  compact = false,
  onAlertAction,
  className 
}: AlertListProps) {
  const displayAlerts = alerts.slice(0, maxItems)
  const criticalCount = alerts.filter(a => a.severity === "critical").length

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">{title}</h3>
          {criticalCount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
              {criticalCount} critical
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {displayAlerts.map((alert) => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            compact={compact}
            onAction={onAlertAction}
          />
        ))}
      </div>

      {alerts.length > maxItems && (
        <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
          View all {alerts.length} alerts
        </Button>
      )}
    </div>
  )
}
