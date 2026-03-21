"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/data"
import {
  LayoutDashboard,
  Building2,
  Truck,
  Stethoscope,
  Activity,
  User,
  LogOut,
  ChevronLeft,
  Menu,
  Package,
  AlertTriangle,
  Users,
  FileBarChart,
  Settings,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SidebarProps {
  role: UserRole
  userName?: string
}

const roleNavItems: Record<UserRole, Array<{ label: string; href: string; icon: React.ReactNode }>> = {
  cms: [
    { label: "Overview", href: "/dashboard/cms", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Medicine Stock", href: "/dashboard/cms#stock", icon: <Package className="h-5 w-5" /> },
    { label: "District Risk", href: "/dashboard/cms#risk", icon: <AlertTriangle className="h-5 w-5" /> },
    { label: "Shipments", href: "/dashboard/cms#shipments", icon: <Truck className="h-5 w-5" /> },
    { label: "Reports", href: "/dashboard/cms#reports", icon: <FileBarChart className="h-5 w-5" /> },
  ],
  facility: [
    { label: "Overview", href: "/dashboard/facility", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Stock Management", href: "/dashboard/facility#stock", icon: <Package className="h-5 w-5" /> },
    { label: "Orders", href: "/dashboard/facility#orders", icon: <Truck className="h-5 w-5" /> },
    { label: "Patient Alerts", href: "/dashboard/facility#alerts", icon: <AlertTriangle className="h-5 w-5" /> },
  ],
  logistics: [
    { label: "Overview", href: "/dashboard/logistics", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Shipments", href: "/dashboard/logistics#shipments", icon: <Truck className="h-5 w-5" /> },
    { label: "Warehouses", href: "/dashboard/logistics#warehouses", icon: <Building2 className="h-5 w-5" /> },
    { label: "Routes", href: "/dashboard/logistics#routes", icon: <Activity className="h-5 w-5" /> },
  ],
  clinician: [
    { label: "Overview", href: "/dashboard/clinician", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "My Patients", href: "/dashboard/clinician#patients", icon: <Users className="h-5 w-5" /> },
    { label: "Stock Check", href: "/dashboard/clinician#stock", icon: <Package className="h-5 w-5" /> },
    { label: "Alerts", href: "/dashboard/clinician#alerts", icon: <AlertTriangle className="h-5 w-5" /> },
  ],
  surveillance: [
    { label: "Overview", href: "/dashboard/surveillance", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Disease Trends", href: "/dashboard/surveillance#trends", icon: <Activity className="h-5 w-5" /> },
    { label: "Treatment Outcomes", href: "/dashboard/surveillance#outcomes", icon: <FileBarChart className="h-5 w-5" /> },
    { label: "Early Warnings", href: "/dashboard/surveillance#warnings", icon: <AlertTriangle className="h-5 w-5" /> },
  ],
  patient: [
    { label: "My Health", href: "/patient", icon: <Heart className="h-5 w-5" /> },
  ],
}

const roleLabels: Record<UserRole, string> = {
  cms: "CMS Planner",
  facility: "Facility Manager",
  logistics: "Logistics",
  clinician: "Clinician",
  surveillance: "Surveillance",
  patient: "Patient",
}

export function DashboardSidebar({ role, userName = "User" }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const navItems = roleNavItems[role]

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">MedSight</span>
              <span className="text-xs text-sidebar-foreground/70">Botswana</span>
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg px-3 py-2">
            <p className="text-xs text-sidebar-foreground/70">Logged in as</p>
            <p className="text-sm font-medium">{roleLabels[role]}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href.split("#")[0])
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors"
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </Link>
      </div>
    </aside>
  )
}
