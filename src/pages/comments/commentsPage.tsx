import { Search, SlidersHorizontal } from "lucide-react"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommentsList } from "@/components/comments-list"

export default function CommentsPage() {
  return (
    <SidebarInset className="bg-slate-50">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Commentaires</h2>
            <p className="text-muted-foreground">Gérez les commentaires de vos lecteurs et modérez les discussions</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-shadow animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des Commentaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+18.2%</span> par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          <Card className="card-shadow animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">En Attente de Modération</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-500">Action requise</span>
              </p>
            </CardContent>
          </Card>
          <Card className="card-shadow animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux d'Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.8%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+5.1%</span> par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
          <Card className="card-shadow animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Article le Plus Commenté</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">Les tendances tech 2024</div>
              <p className="text-xs text-muted-foreground">87 commentaires</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-shadow">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Tous les Commentaires</CardTitle>
                <CardDescription>Gérez et modérez les commentaires de vos lecteurs</CardDescription>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Tabs defaultValue="all" className="w-full md:w-auto">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="pending">En attente</TabsTrigger>
                    <TabsTrigger value="approved">Approuvés</TabsTrigger>
                    <TabsTrigger value="spam">Spam</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 md:p-6 pt-0">
            <div className="flex flex-col gap-4 p-4 md:p-0 pb-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher..." className="w-full pl-8 md:w-[300px]" />
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Plus récents</SelectItem>
                      <SelectItem value="oldest">Plus anciens</SelectItem>
                      <SelectItem value="likes">Plus aimés</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Filtres avancés</span>
                  </Button>
                </div>
              </div>
            </div>
            <CommentsList />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

