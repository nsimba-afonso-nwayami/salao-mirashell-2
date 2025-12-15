import { Routes, Route } from "react-router-dom";
//Site
import Home from "../pages/site/Home";
import NotFound from "../pages/site/NotFound";


//Admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";


export default function AppRoutes () {
    return (
        <Routes>
            {/*Rotas do site */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            {/*Rotas do super admin */}
            <Route path="/dashboard/admin/">
                <Route path="" element={<DashboardAdmin />} />
            </Route>
        </Routes>
    )
}