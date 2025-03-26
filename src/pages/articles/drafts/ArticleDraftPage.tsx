import { PlusCircle, Search, SlidersHorizontal } from "lucide-react"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DraftArticlesList } from "@/components/draft-articles-list"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArticleDraftPage() {
  return (
    <SidebarInset className="bg-slate-50">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Brouillons</h2>
            <p className="text-muted-foreground">Gérez vos articles en cours de rédaction</p>
          </div>
          <Button className="w-full md:w-auto" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvel Article
          </Button>
        </div>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Articles en brouillon</CardTitle>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
                </div>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Plus récents</SelectItem>
                    <SelectItem value="oldest">Plus anciens</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filtres avancés</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DraftArticlesList />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

