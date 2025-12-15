import { Routes, Route } from "react-router-dom";
//Site
import Home from "../pages/site/Home";
import NotFound from "../pages/site/NotFound";

//Admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import AgendamentosAdmin from "../pages/admin/AgendamentosAdmin";
import ServicosAdmin from "../pages/admin/ServicosAdmin";
import CategoriasAdmin from "../pages/admin/CategoriasAdmin";
import ProdutosAdmin from "../pages/admin/ProdutosAdmin";
import EncomendasAdmin from "../pages/admin/EncomendasAdmin";
import EquipeAdmin from "../pages/admin/EquipeAdmin";
import NotFoundAdmin from "../pages/admin/NotFoundAdmin";

export default function AppRoutes () {
    return (
        <Routes>
            {/*Rotas do site */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            {/*Rotas de autenticação */}

            {/*Rotas do admin */}
            <Route path="/dashboard/admin/">
                <Route path="" element={<DashboardAdmin />} />
                <Route path="agendamentos" element={<AgendamentosAdmin />} />
                <Route path="servicos" element={<ServicosAdmin />} />
                <Route path="categorias" element={<CategoriasAdmin />} />
                <Route path="produtos" element={<ProdutosAdmin />} />
                <Route path="encomendas" element={<EncomendasAdmin />} />
                <Route path="equipe" element={<EquipeAdmin />} />
                <Route path="*" element={<NotFoundAdmin />} />
            </Route>
        </Routes>
    )
}