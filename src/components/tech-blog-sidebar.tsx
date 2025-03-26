"use client"

import * as React from "react"
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  FileText,
  LayoutDashboard,
  MessageSquare,
  PenTool,
  Settings,
  Tag,
  TrendingUpIcon as Trending,
  Users,
} from "lucide-react"
import { useLocation } from "react-router-dom"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Articles",
    icon: FileText,
    href: "/dashboard/articles",
    submenu: [
      { title: "Tous les articles", href: "/dashboard/articles" },
      { title: "Brouillons", href: "/dashboard/articles/drafts" },
      { title: "Publiés", href: "/dashboard/articles/published" },
      { title: "Programmés", href: "/dashboard/articles/scheduled" },
    ],
  },
  {
    title: "Catégories",
    icon: Tag,
    href: "/dashboard/categories",
  },
  {
    title: "Commentaires",
    icon: MessageSquare,
    href: "/dashboard/comments",
  },
  {
    title: "Utilisateurs",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Statistiques",
    icon: BarChart3,
    href: "/dashboard/statistics",
    submenu: [
      { title: "Vue d'ensemble", href: "/dashboard/statistics" },
      { title: "Trafic", href: "/dashboard/statistics/traffic" },
      { title: "Engagement", href: "/dashboard/statistics/engagement" },
    ],
  },
  {
    title: "Tendances",
    icon: Trending,
    href: "/dashboard/trends",
  },
]

export function TechBlogSidebar() {
    const pathname = useLocation()

  // État pour suivre quels menus sont ouverts
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>(() => {
    // Par défaut, ouvrir le menu qui contient le chemin actuel
    const initialState: Record<string, boolean> = {}
    menuItems.forEach((item) => {
      if (item.submenu && (pathname.pathname === item.href || item.submenu.some((sub) => pathname.pathname === sub.href))) {
        initialState[item.title] = true
      }
    })
    return initialState
  })

  // Fonction pour basculer l'état d'un menu
  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="bg-gradient-to-b from-sidebar to-sidebar-accent border-r border-border/10"
    >
      <SidebarHeader className="border-b border-border/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                  <PenTool className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">TechBlog</span>
                  <span className="text-xs text-muted-foreground">Administration</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible
                      open={openMenus[item.title]}
                      onOpenChange={() => toggleMenu(item.title)}
                      className="w-full"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full justify-between group"
                          isActive={pathname.pathname === item.href || item.submenu.some((sub) => pathname.pathname === sub.href)}
                        >
                          <div className="flex items-center">
                            <item.icon className="size-4 mr-2" />
                            <span>{item.title}</span>
                          </div>
                          {openMenus[item.title] ? (
                            <ChevronDown className="size-4 transition-transform" />
                          ) : (
                            <ChevronRight className="size-4 transition-transform" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={pathname.pathname === subItem.href}>
                                <a href={subItem.href}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname.pathname === item.href} tooltip={item.title}>
                      <a href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/10 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start px-2 hover:bg-sidebar-accent">
              <Avatar className="h-8 w-8 mr-2 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">Admin</span>
                <span className="text-xs text-muted-foreground">admin@techblog.com</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <a href="/dashboard/profile">
                <Users className="mr-2 h-4 w-4" />
                <span>Mon profil</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

