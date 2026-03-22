"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { DISTRICT_RISK_DATA, type District, type RiskLevel } from "@/lib/data"
import { BOTSWANA_GEOJSON, DISTRICT_CENTERS, BOTSWANA_CENTER, BOTSWANA_BOUNDS } from "@/lib/botswana-geojson"

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "#ef4444",
  warning: "#f59e0b", 
  good: "#22c55e",
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
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    const initMap = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      const map = L.map(mapRef.current!, {
        center: BOTSWANA_CENTER,
        zoom: compact ? 5 : 6,
        zoomControl: !compact,
        scrollWheelZoom: !compact,
        dragging: !compact,
        doubleClickZoom: !compact,
        attributionControl: false,
        maxBounds: BOTSWANA_BOUNDS,
        maxBoundsViscosity: 1.0
      })

      mapInstanceRef.current = map

      // Add a subtle base layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 10,
        minZoom: 5,
      }).addTo(map)

      // Style function for districts
      const getStyle = (feature: GeoJSON.Feature): L.PathOptions => {
        const district = feature.properties?.name as District
        const riskData = DISTRICT_RISK_DATA[district]
        const isSelected = selectedDistrict === district
        
        return {
          fillColor: RISK_COLORS[riskData?.riskLevel || "good"],
          fillOpacity: isSelected ? 0.9 : 0.7,
          color: isSelected ? "#1e293b" : "#475569",
          weight: isSelected ? 3 : 1.5,
          opacity: 1
        }
      }

      // Add GeoJSON layer
      const geoJsonLayer = L.geoJSON(BOTSWANA_GEOJSON as GeoJSON.FeatureCollection, {
        style: getStyle,
        onEachFeature: (feature, layer) => {
          const district = feature.properties?.name as District
          const riskData = DISTRICT_RISK_DATA[district]
          
          // Tooltip
          layer.bindTooltip(`
            <div class="p-2 min-w-[160px]">
              <p class="font-semibold text-sm mb-1">${district} District</p>
              <div class="text-xs space-y-1">
                <div class="flex justify-between">
                  <span class="text-gray-500">Stock Days:</span>
                  <span class="font-medium">${riskData?.stockDays || 0} days</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Facilities:</span>
                  <span class="font-medium">${riskData?.facilitiesReporting || 0}/${riskData?.totalFacilities || 0}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Status:</span>
                  <span class="font-semibold" style="color: ${RISK_COLORS[riskData?.riskLevel || 'good']}">${riskData?.riskLevel?.toUpperCase() || 'N/A'}</span>
                </div>
              </div>
            </div>
          `, {
            sticky: true,
            className: "leaflet-tooltip-custom"
          })

          // Hover effects
          layer.on({
            mouseover: (e) => {
              const l = e.target
              l.setStyle({
                fillOpacity: 0.9,
                weight: 2.5
              })
              setHoveredDistrict(district)
            },
            mouseout: (e) => {
              geoJsonLayer.resetStyle(e.target)
              setHoveredDistrict(null)
            },
            click: () => {
              onDistrictClick?.(district)
            }
          })
        }
      }).addTo(map)

      // Add district labels
      if (showLabels) {
        Object.entries(DISTRICT_CENTERS).forEach(([district, coords]) => {
          const label = compact 
            ? district.substring(0, 3).toUpperCase()
            : district === "South-East" ? "S-East" 
            : district === "North-East" ? "N-East"
            : district === "North-West" ? "N-West"
            : district

          L.marker(coords as [number, number], {
            icon: L.divIcon({
              className: "district-label",
              html: `<div class="text-[10px] md:text-xs font-semibold text-slate-800 whitespace-nowrap drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">${label}</div>`,
              iconSize: [80, 20],
              iconAnchor: [40, 10]
            })
          }).addTo(map)
        })
      }

      // Fit bounds to show full Botswana
      map.fitBounds(BOTSWANA_BOUNDS, { padding: [20, 20] })
      
      setIsLoaded(true)
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [compact, selectedDistrict, onDistrictClick, showLabels])

  return (
    <div className={cn("relative w-full", className)}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className={cn(
          "w-full rounded-lg overflow-hidden bg-slate-100",
          compact ? "h-[280px]" : "h-[400px] md:h-[500px]"
        )}
        style={{ zIndex: 1 }}
      />
      
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      )}
      
      {/* Legend */}
      <div className={cn(
        "absolute bg-white/95 backdrop-blur-sm rounded-lg shadow-md border z-[1000]",
        compact ? "bottom-2 left-2 p-2" : "bottom-4 left-4 p-3"
      )}>
        <p className={cn(
          "font-medium text-slate-500 mb-2",
          compact ? "text-[10px]" : "text-xs"
        )}>Stock Risk Level</p>
        <div className={cn("space-y-1.5", compact && "space-y-1")}>
          <div className="flex items-center gap-2">
            <div className={cn("rounded-sm", compact ? "w-2.5 h-2.5" : "w-3 h-3")} style={{ backgroundColor: RISK_COLORS.good }} />
            <span className={cn("text-slate-700", compact ? "text-[10px]" : "text-xs")}>Good (30+ days)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("rounded-sm", compact ? "w-2.5 h-2.5" : "w-3 h-3")} style={{ backgroundColor: RISK_COLORS.warning }} />
            <span className={cn("text-slate-700", compact ? "text-[10px]" : "text-xs")}>Warning (15-30 days)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("rounded-sm", compact ? "w-2.5 h-2.5" : "w-3 h-3")} style={{ backgroundColor: RISK_COLORS.critical }} />
            <span className={cn("text-slate-700", compact ? "text-[10px]" : "text-xs")}>Critical (&lt;15 days)</span>
          </div>
        </div>
      </div>

      {/* Hovered District Info (optional) */}
      {hoveredDistrict && !compact && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border p-3 z-[1000]">
          <p className="font-semibold text-sm">{hoveredDistrict} District</p>
        </div>
      )}

      {/* Custom styles for Leaflet */}
      <style jsx global>{`
        .leaflet-tooltip-custom {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          padding: 0;
        }
        .leaflet-tooltip-custom::before {
          display: none;
        }
        .district-label {
          background: transparent;
          border: none;
          text-align: center;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  )
}
