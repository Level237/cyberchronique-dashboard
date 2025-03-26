import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import DashboardLayout from "../pages/layouts/DashboardLayout";
import ArticlesPage from "@/pages/articles/ListArticlePage";
import ArticleDraftPage from "@/pages/articles/drafts/ArticleDraftPage";
import ArticlePublishedPage from "@/pages/articles/published/ArticlePublished";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout>
            <DashboardPage />
        </DashboardLayout>
    },
    {
        path: "/dashboard/articles",
        element: <DashboardLayout>
            <ArticlesPage />
        </DashboardLayout>
    },
    {
        path: "/dashboard/articles/drafts",
        element: <DashboardLayout>
            <ArticleDraftPage />
        </DashboardLayout>
    },
    {
        path: "/dashboard/articles/published",
        element: <DashboardLayout>
            <ArticlePublishedPage />
        </DashboardLayout>
    },
    {
        path: "/dashboard/articles/scheduled",
        element: <DashboardLayout>
            <ArticleScheduledPage />
        </DashboardLayout>
    }   
])

export default routes;
