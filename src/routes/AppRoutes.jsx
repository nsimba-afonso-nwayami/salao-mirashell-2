import { Routes, Route } from "react-router-dom";
//Site
import Home from "../pages/site/Home";
import Agendar from "../pages/site/Agendar";
import Loja from "../pages/site/Loja";
import Encomendar from "../pages/site/Encomendar";
import NotFound from "../pages/site/NotFound";

//Autenticação
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

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
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/loja/encomendar" element={<Encomendar />} />
            <Route path="*" element={<NotFound />} />

            {/*Rotas de autenticação */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/cadastrar-se" element={<Register />} />
            <Route path="/auth/esqueci-senha" element={<ForgotPassword />} />

            {/*Rotas do admin */}
            <Route path="/dashboard/admin">
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