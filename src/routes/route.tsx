import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import DashboardLayout from "../pages/layouts/DashboardLayout";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout>
            <DashboardPage />
        </DashboardLayout>
    }
])

export default routes;
