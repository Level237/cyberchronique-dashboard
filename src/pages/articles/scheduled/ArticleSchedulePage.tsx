import { Calendar, PlusCircle, Search, SlidersHorizontal } from 'lucide-react'
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScheduledArticlesList } from "@/components/scheduled-articles-list"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarDateRangePicker } from "@/components/date-range-picker"

export default function ArticleScheduledPage() {
  return (
    <SidebarInset className="bg-slate-50">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Articles Programmés</h2>
            <p className="text-muted-foreground">
              Gérez vos articles planifiés pour publication future
            </p>
          </div>
          <Button className="w-full md:w-auto" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvel Article
          </Button>
        </div>

        <Card className="card-shadow">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Calendrier de publication</CardTitle>
                <CardDescription>Visualisez et gérez vos publications programmées</CardDescription>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <CalendarDateRangePicker />
                <Button variant="outline" size="icon" className="ml-2">
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Calendrier</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 p-4 md:p-6 pt-0">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm">Prêt à publier</span>
                  <div className="ml-4 flex h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-sm">En attente de révision</span>
                  <div className="ml-4 flex h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-sm">Contenu incomplet</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                    />
                  </div>
                  <Select defaultValue="date">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date de publication</SelectItem>
                      <SelectItem value="title">Titre</SelectItem>
                      <SelectItem value="author">Auteur</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Filtres avancés</span>
                  </Button>
                </div>
              </div>
            </div>
            <ScheduledArticlesList />
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
