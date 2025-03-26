import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentArticles } from "@/components/recent-articles"
import { PopularTopics } from "@/components/popular-topics"
import { VisitorsChart } from "@/components/visitors-chart"
import { EngagementChart } from "@/components/engagement-chart"

export default function DashboardPage() {
  return (
    <SidebarInset className="bg-slate-50">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="day" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="day">Jour</TabsTrigger>
                <TabsTrigger value="week">Semaine</TabsTrigger>
                <TabsTrigger value="month">Mois</TabsTrigger>
                <TabsTrigger value="year">Année</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <DashboardStats />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Visiteurs</CardTitle>
              <CardDescription>Nombre de visiteurs sur votre blog au cours de la période sélectionnée</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <VisitorsChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
              <CardDescription>Répartition de l'engagement des utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <EngagementChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentArticles className="col-span-4" />
          <PopularTopics className="col-span-3" />
        </div>
      </div>
    </SidebarInset>
  )
}

