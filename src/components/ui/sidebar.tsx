"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpen,
  GraduationCap,
  FileText,
  Settings
} from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Classes",
    icon: GraduationCap,
    href: "/classes",
    color: "text-violet-500",
  },
  {
    label: "Notes",
    icon: FileText,
    href: "/notes",
    color: "text-pink-500",
  },
  {
    label: "Assessment",
    icon: BookOpen,
    href: "/assessment",
    color: "text-orange-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-green-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-[#111827] to-[#1f2937] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14 transition-transform transform hover:scale-110">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Adishrar
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/20 rounded-lg transition-all duration-300 ease-in-out transform hover:translate-x-4 hover:shadow-lg hover:scale-105
                ${pathname === route.href ? "bg-white/20 text-white shadow-lg scale-105" : "text-zinc-400"}`}
            >
              <div className="flex items-center flex-1">
                <route.icon className={`h-5 w-5 mr-3 transition-transform transform group-hover:rotate-[360deg] ${route.color}`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
