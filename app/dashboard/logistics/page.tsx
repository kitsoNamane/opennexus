"use client"

import { DashboardLayout, DashboardSection, DashboardGrid } from "@/components/dashboard/layout"
import { StatsCard, StatsGrid } from "@/components/dashboard/stats-card"
import { RiskBadge } from "@/components/dashboard/risk-badge"
import { BotswanaMap } from "@/components/maps/botswana-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  SHIPMENT_DATA,
  BOTSWANA_DISTRICTS,
  FACILITY_DATA,
  type Shipment,
} from "@/lib/data"
import { 
  Truck, 
  Package,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Building2,
  Route,
  Calendar,
} from "lucide-react"

// Extended shipment data for logistics view
const EXTENDED_SHIPMENTS: (Shipment & { 
  driver: string
  vehicle: string
  progress: number
  priority: "high" | "normal" | "low"
})[] = [
  { ...SHIPMENT_DATA[0], driver: "K. Modise", vehicle: "BW-CMS-001", progress: 65, priority: "high" },
  { ...SHIPMENT_DATA[1], driver: "T. Molefe", vehicle: "BW-CMS-003", progress: 45, priority: "high" },
  { ...SHIPMENT_DATA[2], driver: "M. Kgosi", vehicle: "BW-CMS-002", progress: 30, priority: "normal" },
  { ...SHIPMENT_DATA[3], driver: "P. Sekgwa", vehicle: "BW-CMS-004", progress: 0, priority: "normal" },
]

// Warehouse data
const WAREHOUSES = [
  { id: "WH-001", name: "CMS Gaborone", district: "South-East", capacity: 85, itemsStored: 45000, status: "operational" },
  { id: "WH-002", name: "CMS Francistown", district: "Central", capacity: 72, itemsStored: 28000, status: "operational" },
  { id: "WH-003", name: "Regional Store Maun", district: "North-West", capacity: 45, itemsStored: 8500, status: "low-stock" },
]

// Delivery schedule
const DELIVERY_SCHEDULE = [
  { date: "2024-01-16", district: "Kgalagadi", facilities: 3, status: "scheduled" },
  { date: "2024-01-17", district: "Southern", facilities: 5, status: "scheduled" },
  { date: "2024-01-18", district: "Ghanzi", facilities: 2, status: "scheduled" },
  { date: "2024-01-19", district: "Kweneng", facilities: 8, status: "scheduled" },
  { date: "2024-01-20", district: "North-West", facilities: 4, status: "scheduled" },
]

export default function LogisticsDashboardPage() {
  const activeShipments = EXTENDED_SHIPMENTS.filter((s) => s.status === "in-transit").length
  const delayedShipments = EXTENDED_SHIPMENTS.filter((s) => s.status === "delayed").length
  const pendingShipments = EXTENDED_SHIPMENTS.filter((s) => s.status === "pending").length

  return (
    <DashboardLayout
      role="logistics"
      title="Logistics & Distribution"
      subtitle="Supply chain management and shipment tracking"
      alertCount={delayedShipments}
    >
      <div className="space-y-6">
        {/* KPIs */}
        <StatsGrid>
          <StatsCard
            title="Active Shipments"
            value={activeShipments}
            subtitle="Currently in transit"
            icon={<Truck className="h-5 w-5" />}
            status="good"
          />
          <StatsCard
            title="Delayed"
            value={delayedShipments}
            subtitle="Require attention"
            icon={<AlertTriangle className="h-5 w-5" />}
            status={delayedShipments > 0 ? "critical" : "good"}
          />
          <StatsCard
            title="Pending Dispatch"
            value={pendingShipments}
            subtitle="Ready to ship"
            icon={<Package className="h-5 w-5" />}
            status="good"
          />
          <StatsCard
            title="Deliveries This Week"
            value="12"
            subtitle="3 completed, 9 scheduled"
            icon={<Calendar className="h-5 w-5" />}
            status="good"
          />
        </StatsGrid>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Shipment Tracker Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipment Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BotswanaMap className="h-[350px]" showLabels />
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">In Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-sm text-muted-foreground">Delayed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm text-muted-foreground">Delivered</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Shipments List */}
          <Card>
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {EXTENDED_SHIPMENTS.filter((s) => s.status !== "delivered").map((shipment) => (
                <div
                  key={shipment.id}
                  className={`p-3 rounded-lg border ${
                    shipment.status === "delayed" 
                      ? "border-destructive/50 bg-destructive/5" 
                      : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{shipment.id}</span>
                      {shipment.priority === "high" && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                    <Badge
                      variant={
                        shipment.status === "delayed" ? "destructive" :
                        shipment.status === "in-transit" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {shipment.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{shipment.origin}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>{shipment.destination}</span>
                    </div>
                    
                    {shipment.status === "in-transit" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{shipment.progress}%</span>
                        </div>
                        <Progress value={shipment.progress} className="h-1.5" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{shipment.vehicle} | {shipment.driver}</span>
                      <span>ETA: {shipment.estimatedArrival}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Warehouses and Schedule */}
        <DashboardGrid columns={2}>
          {/* Warehouse Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Warehouse Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {WAREHOUSES.map((warehouse) => (
                    <TableRow key={warehouse.id}>
                      <TableCell className="font-medium">{warehouse.name}</TableCell>
                      <TableCell className="text-muted-foreground">{warehouse.district}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={warehouse.capacity} className="h-1.5" />
                          <span className="text-xs text-muted-foreground">{warehouse.capacity}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={warehouse.status === "operational" ? "secondary" : "outline"}
                          className={warehouse.status === "low-stock" ? "border-accent text-accent-foreground" : ""}
                        >
                          {warehouse.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Delivery Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DELIVERY_SCHEDULE.map((delivery, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-center min-w-[50px]">
                        <p className="text-lg font-bold">
                          {new Date(delivery.date).getDate()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(delivery.date).toLocaleDateString("en-US", { month: "short" })}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">{delivery.district} District</p>
                        <p className="text-sm text-muted-foreground">
                          {delivery.facilities} facilities
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Route className="h-4 w-4 mr-1" />
                      Route
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </DashboardGrid>

        {/* All Shipments Table */}
        <DashboardSection
          title="All Shipments"
          description="Complete shipment history and status"
          actions={
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Shipment
            </Button>
          }
        >
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Contents</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EXTENDED_SHIPMENTS.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {shipment.id}
                          {shipment.priority === "high" && (
                            <span className="w-2 h-2 bg-destructive rounded-full" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{shipment.origin}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {shipment.medicines.join(", ")}
                      </TableCell>
                      <TableCell>{shipment.vehicle}</TableCell>
                      <TableCell>{shipment.driver}</TableCell>
                      <TableCell>{shipment.estimatedArrival}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            shipment.status === "delivered" ? "secondary" :
                            shipment.status === "delayed" ? "destructive" :
                            shipment.status === "in-transit" ? "default" : "outline"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </DashboardSection>
      </div>
    </DashboardLayout>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}
