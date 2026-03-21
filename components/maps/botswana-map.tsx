"use client"

import { cn } from "@/lib/utils"
import { DISTRICT_RISK_DATA, type District, type RiskLevel } from "@/lib/data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Simplified SVG paths for Botswana districts (approximate shapes)
const DISTRICT_PATHS: Record<District, { d: string; cx: number; cy: number }> = {
  "Central": { 
    d: "M180 60 L280 50 L320 100 L340 180 L300 250 L220 260 L160 200 L150 120 Z",
    cx: 240, cy: 155
  },
  "North-West": { 
    d: "M50 80 L150 60 L180 60 L150 120 L160 200 L100 220 L40 180 L30 120 Z",
    cx: 95, cy: 140
  },
  "North-East": { 
    d: "M280 50 L340 40 L370 80 L360 120 L320 100 Z",
    cx: 325, cy: 80
  },
  "Ghanzi": { 
    d: "M40 180 L100 220 L120 300 L80 340 L30 320 L20 240 Z",
    cx: 70, cy: 270
  },
  "Kgalagadi": { 
    d: "M30 320 L80 340 L120 400 L100 450 L40 440 L20 380 Z",
    cx: 65, cy: 390
  },
  "Kweneng": { 
    d: "M160 200 L220 260 L240 320 L200 360 L140 340 L120 300 L100 220 Z",
    cx: 170, cy: 290
  },
  "Southern": { 
    d: "M120 300 L140 340 L200 360 L220 420 L160 450 L100 450 L120 400 Z",
    cx: 160, cy: 390
  },
  "Kgatleng": { 
    d: "M220 260 L300 250 L320 290 L280 320 L240 320 Z",
    cx: 270, cy: 285
  },
  "South-East": { 
    d: "M280 320 L320 290 L350 320 L340 370 L300 380 L260 360 L240 320 Z",
    cx: 295, cy: 340
  },
}

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "fill-destructive/80 hover:fill-destructive",
  warning: "fill-accent/80 hover:fill-accent",
  good: "fill-success/80 hover:fill-success",
}

const RISK_STROKE: Record<RiskLevel, string> = {
  critical: "stroke-destructive",
  warning: "stroke-accent",
  good: "stroke-success",
}

interface BotswanaMapProps {
  onDistrictClick?: (district: District) => void
  selectedDistrict?: District | null
  className?: string
  showLabels?: boolean
}

export function BotswanaMap({ 
  onDistrictClick, 
  selectedDistrict = null,
  className,
  showLabels = true 
}: BotswanaMapProps) {
  return (
    <TooltipProvider>
      <div className={cn("relative w-full", className)}>
        <svg 
          viewBox="0 0 400 500" 
          className="w-full h-auto"
          aria-label="Map of Botswana districts showing stock risk levels"
        >
          {/* Background */}
          <rect x="0" y="0" width="400" height="500" className="fill-muted/30" rx="8" />
          
          {/* District paths */}
          {(Object.entries(DISTRICT_PATHS) as [District, { d: string; cx: number; cy: number }][]).map(([district, { d, cx, cy }]) => {
            const riskData = DISTRICT_RISK_DATA[district]
            const isSelected = selectedDistrict === district
            
            return (
              <Tooltip key={district}>
                <TooltipTrigger asChild>
                  <g 
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => onDistrictClick?.(district)}
                  >
                    <path
                      d={d}
                      className={cn(
                        RISK_COLORS[riskData.riskLevel],
                        RISK_STROKE[riskData.riskLevel],
                        "stroke-2 transition-all duration-200",
                        isSelected && "stroke-foreground stroke-[3px]"
                      )}
                    />
                    {showLabels && (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        className="fill-foreground text-[10px] font-medium pointer-events-none"
                      >
                        {district.length > 10 ? district.substring(0, 8) + "..." : district}
                      </text>
                    )}
                  </g>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[200px]">
                  <div className="space-y-1">
                    <p className="font-semibold">{district} District</p>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <p>Stock Days: <span className="font-medium text-foreground">{riskData.stockDays}</span></p>
                      <p>Facilities: <span className="font-medium text-foreground">{riskData.facilitiesReporting}/{riskData.totalFacilities}</span></p>
                      <p>Status: <RiskBadgeInline level={riskData.riskLevel} /></p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur rounded-lg p-3 shadow-sm border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Risk Level</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-success" />
              <span className="text-xs">Good (30+ days)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-accent" />
              <span className="text-xs">Warning (15-30 days)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-destructive" />
              <span className="text-xs">Critical (&lt;15 days)</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function RiskBadgeInline({ level }: { level: RiskLevel }) {
  const styles: Record<RiskLevel, string> = {
    critical: "text-destructive",
    warning: "text-accent-foreground",
    good: "text-success",
  }
  
  const labels: Record<RiskLevel, string> = {
    critical: "Critical",
    warning: "Warning", 
    good: "Good",
  }
  
  return (
    <span className={cn("font-medium capitalize", styles[level])}>
      {labels[level]}
    </span>
  )
}
