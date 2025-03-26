import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TechBlogSidebar } from "@/components/tech-blog-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <SidebarProvider>
        <div className="flex min-h-screen gap-0">
          <TechBlogSidebar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </SidebarProvider>

  )
}

