"use client"

import { cn } from "@/lib/utils"
import { DISTRICT_RISK_DATA, type District, type RiskLevel } from "@/lib/data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Accurate SVG paths for Botswana districts based on actual geographic boundaries
// Viewbox calibrated to Botswana's approximate coordinates (19-29°E, 18-27°S)
const DISTRICT_PATHS: Record<District, { d: string; labelX: number; labelY: number }> = {
  "Central": { 
    // Largest district in the center-east
    d: "M245 95 L285 85 L320 75 L345 90 L365 110 L375 145 L380 185 L375 225 L365 260 L350 290 L330 310 L305 325 L275 335 L245 340 L220 335 L200 320 L185 295 L175 265 L170 230 L172 195 L180 160 L195 130 L215 105 Z",
    labelX: 270, labelY: 210
  },
  "North-West": { 
    // Okavango Delta region - northwestern panhandle and delta area
    d: "M55 45 L85 35 L115 30 L145 28 L175 30 L195 40 L210 55 L220 75 L225 95 L215 105 L195 130 L180 160 L172 195 L165 210 L150 215 L130 210 L110 200 L90 185 L75 165 L60 140 L50 115 L45 90 L48 65 Z",
    labelX: 125, labelY: 120
  },
  "North-East": { 
    // Chobe district - northeastern corner
    d: "M285 85 L320 75 L355 65 L390 60 L415 70 L425 90 L420 115 L405 135 L385 150 L365 155 L375 145 L365 110 L345 90 L320 75 Z",
    labelX: 375, labelY: 100
  },
  "Ghanzi": { 
    // Western district - Kalahari region
    d: "M45 210 L75 200 L110 200 L130 210 L150 215 L165 235 L170 260 L168 295 L160 335 L145 375 L125 405 L100 415 L75 410 L55 395 L40 370 L30 340 L25 305 L28 265 L35 235 Z",
    labelX: 95, labelY: 310
  },
  "Kgalagadi": { 
    // Southwestern Kalahari
    d: "M30 395 L55 395 L75 410 L100 415 L125 405 L145 420 L155 450 L160 485 L155 520 L140 550 L115 565 L85 565 L55 555 L35 535 L22 505 L18 470 L20 435 Z",
    labelX: 90, labelY: 485
  },
  "Kweneng": { 
    // Central-western district
    d: "M165 235 L170 260 L175 295 L185 295 L200 320 L220 335 L240 345 L255 365 L250 395 L235 420 L210 435 L180 440 L155 430 L140 410 L145 375 L160 335 L168 295 L170 260 Z",
    labelX: 195, labelY: 365
  },
  "Southern": { 
    // South-central district
    d: "M155 430 L180 440 L210 435 L235 420 L255 430 L270 455 L275 490 L265 525 L245 555 L215 575 L180 580 L150 570 L125 550 L140 550 L155 520 L160 485 L155 450 L145 420 L140 410 Z",
    labelX: 205, labelY: 510
  },
  "Kgatleng": { 
    // Small eastern district
    d: "M275 335 L305 325 L330 310 L345 325 L355 350 L350 375 L335 395 L310 405 L285 400 L270 385 L265 360 L270 345 Z",
    labelX: 310, labelY: 360
  },
  "South-East": { 
    // Smallest district - contains Gaborone
    d: "M285 400 L310 405 L335 395 L355 410 L365 440 L360 475 L345 505 L320 525 L290 535 L260 530 L245 510 L245 555 L265 525 L275 490 L270 455 L255 430 L265 415 L270 400 Z",
    labelX: 310, labelY: 470
  },
}

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "fill-destructive/70 hover:fill-destructive/90",
  warning: "fill-amber-500/70 hover:fill-amber-500/90",
  good: "fill-emerald-500/70 hover:fill-emerald-500/90",
}

const RISK_STROKE: Record<RiskLevel, string> = {
  critical: "stroke-destructive/80",
  warning: "stroke-amber-600/80",
  good: "stroke-emerald-600/80",
}

interface BotswanaMapProps {
  onDistrictClick?: (district: District) => void
  selectedDistrict?: District | null
  className?: string
  showLabels?: boolean
  compact?: boolean
}

export function BotswanaMap({ 
  onDistrictClick, 
  selectedDistrict = null,
  className,
  showLabels = true,
  compact = false
}: BotswanaMapProps) {
  return (
    <TooltipProvider>
      <div className={cn("relative w-full flex items-center justify-center", className)}>
        <svg 
          viewBox="0 0 450 620" 
          className="w-full h-full max-h-[500px]"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Map of Botswana districts showing stock risk levels"
        >
          {/* Background */}
          <rect x="0" y="0" width="450" height="620" className="fill-muted/20" rx="8" />
          
          {/* Country outline for context */}
          <path
            d="M55 45 L85 35 L115 30 L145 28 L175 30 L195 40 L210 55 L220 75 L225 95 L245 95 L285 85 L320 75 L355 65 L390 60 L415 70 L425 90 L420 115 L405 135 L385 150 L380 185 L375 225 L365 260 L350 290 L345 325 L355 350 L365 440 L360 475 L345 505 L320 525 L290 535 L245 555 L215 575 L180 580 L150 570 L115 565 L85 565 L55 555 L35 535 L22 505 L18 470 L20 435 L30 395 L25 305 L28 265 L35 235 L45 210 L48 65 L55 45 Z"
            className="fill-none stroke-border stroke-[0.5]"
          />
          
          {/* District paths */}
          {(Object.entries(DISTRICT_PATHS) as [District, { d: string; labelX: number; labelY: number }][]).map(([district, { d, labelX, labelY }]) => {
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
                        "stroke-[1.5] transition-all duration-200",
                        isSelected && "stroke-foreground stroke-[3px] brightness-110"
                      )}
                    />
                    {showLabels && !compact && (
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-[11px] font-semibold pointer-events-none drop-shadow-sm"
                        style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
                      >
                        {district === "South-East" ? "S-East" : 
                         district === "North-East" ? "N-East" :
                         district === "North-West" ? "N-West" :
                         district}
                      </text>
                    )}
                    {showLabels && compact && (
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-[9px] font-medium pointer-events-none"
                      >
                        {district.substring(0, 3).toUpperCase()}
                      </text>
                    )}
                  </g>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[220px] z-50">
                  <div className="space-y-1.5">
                    <p className="font-semibold text-sm">{district} District</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Stock Days:</span>
                        <span className="font-medium text-foreground">{riskData.stockDays} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Facilities:</span>
                        <span className="font-medium text-foreground">{riskData.facilitiesReporting}/{riskData.totalFacilities}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <RiskBadgeInline level={riskData.riskLevel} />
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
          
          {/* Compass indicator */}
          <g transform="translate(400, 560)">
            <circle r="18" className="fill-card/90 stroke-border" />
            <path d="M0 -12 L4 8 L0 4 L-4 8 Z" className="fill-foreground" />
            <text y="-4" textAnchor="middle" className="fill-foreground text-[8px] font-bold">N</text>
          </g>
        </svg>
        
        {/* Legend */}
        <div className={cn(
          "absolute bg-card/95 backdrop-blur-sm rounded-lg shadow-sm border",
          compact ? "bottom-2 left-2 p-2" : "bottom-4 left-4 p-3"
        )}>
          <p className={cn(
            "font-medium text-muted-foreground mb-2",
            compact ? "text-[10px]" : "text-xs"
          )}>Stock Risk Level</p>
          <div className={cn("space-y-1.5", compact && "space-y-1")}>
            <div className="flex items-center gap-2">
              <div className={cn("rounded-sm bg-emerald-500", compact ? "w-2.5 h-2.5" : "w-3 h-3")} />
              <span className={compact ? "text-[10px]" : "text-xs"}>Good (30+ days)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("rounded-sm bg-amber-500", compact ? "w-2.5 h-2.5" : "w-3 h-3")} />
              <span className={compact ? "text-[10px]" : "text-xs"}>Warning (15-30 days)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("rounded-sm bg-destructive", compact ? "w-2.5 h-2.5" : "w-3 h-3")} />
              <span className={compact ? "text-[10px]" : "text-xs"}>Critical (&lt;15 days)</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function RiskBadgeInline({ level }: { level: RiskLevel }) {
  const styles: Record<RiskLevel, string> = {
    critical: "text-destructive font-semibold",
    warning: "text-amber-600 font-semibold",
    good: "text-emerald-600 font-semibold",
  }
  
  const labels: Record<RiskLevel, string> = {
    critical: "Critical",
    warning: "Warning", 
    good: "Good",
  }
  
  return (
    <span className={cn("capitalize", styles[level])}>
      {labels[level]}
    </span>
  )
}
