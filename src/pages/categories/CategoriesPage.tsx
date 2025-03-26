import { PlusCircle, Search } from "lucide-react"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoriesList } from "@/components/categories-list"
import { CategoriesChart } from "@/components/categories-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CategoriesPage() {
  return (
    <SidebarInset className="bg-slate-50">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Catégories</h2>
            <p className="text-muted-foreground">Gérez les catégories de votre blog et leur organisation</p>
          </div>
          <Button className="w-full md:w-auto" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle Catégorie
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-shadow animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des Catégories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+2</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
          <Card className="card-shadow animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Catégorie la Plus Populaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Intelligence Artificielle</div>
              <p className="text-xs text-muted-foreground">68% des vues totales</p>
            </CardContent>
          </Card>
          <Card className="card-shadow animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Articles Sans Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-500">Action requise</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une catégorie..."
                className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <TabsContent value="list" className="space-y-4">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Toutes les Catégories</CardTitle>
                <CardDescription>
                  Gérez les catégories de votre blog, ajoutez-en de nouvelles ou modifiez les existantes.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <CategoriesList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Analytiques des Catégories</CardTitle>
                <CardDescription>
                  Visualisez la popularité de vos catégories et leur évolution dans le temps.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-[400px]">
                  <CategoriesChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}

