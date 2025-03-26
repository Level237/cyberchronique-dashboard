import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import DashboardLayout from "../pages/layouts/DashboardLayout";
import ArticlesPage from "@/pages/articles/ListArticlePage";
import ArticleDraftPage from "@/pages/articles/drafts/ArticleDraftPage";
import ArticlePublishedPage from "@/pages/articles/published/ArticlePublished";
import ArticleScheduledPage from "@/pages/articles/scheduled/ArticleSchedulePage";
import CategoriesPage from "@/pages/categories/CategoriesPage";
import CommentsPage from "@/pages/comments/commentsPage";
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
    },
    {
        path: "/dashboard/categories",
        element: <DashboardLayout>
            <CategoriesPage />
        </DashboardLayout>
    },
    {
        path: "/dashboard/comments",
        element: <DashboardLayout>
            <CommentsPage />
        </DashboardLayout>
    }   
])

export default routes;
