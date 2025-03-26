import DashboardPage from "../pages/DashboardPage";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />
    }
])

export default routes;
