import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../../assets/img/LOGO.png";
import { useAuth } from "../../../contexts/AuthContext";

export default function SidebarAdmin({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <aside
        className={`
          bg-white border-r border-stone-200 
          w-64 fixed top-0 left-0 h-screen p-6 shadow-lg
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          z-50 flex flex-col justify-between
          overflow-y-auto
        `}
      >
        <div>
          <button
            className="md:hidden absolute top-4 right-4 text-2xl text-stone-600"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="flex flex-col items-center mb-10 mt-2">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md overflow-hidden bg-white">
              <img
                src={logoImg}
                alt="MiraShell Logo"
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full"
              />
            </div>
            <span className="mt-3 font-bold text-[#A2672D] tracking-widest text-sm uppercase">
              Mirashell
            </span>
          </div>

          <nav className="space-y-4 text-lg">
            <Link
              to="/dashboard/admin"
              className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"
            >
              <i className="fas fa-chart-line mr-3 w-5"></i> Dashboard
            </Link>
            <Link
              to="/dashboard/admin/agendamentos"
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-calendar-check mr-3 w-5 text-[#A2672D]"></i>{" "}
              Agendamentos
            </Link>
            <Link
              to="/dashboard/admin/servicos"
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-paint-brush mr-3 w-5 text-[#A2672D]"></i>{" "}
              Serviços
            </Link>
            <Link
              to="/dashboard/admin/categorias"
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-tags mr-3 w-5 text-[#A2672D]"></i> Categorias
            </Link>
            <Link
              to="/dashboard/admin/produtos"
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-box-open mr-3 w-5 text-[#A2672D]"></i>{" "}
              Produtos
            </Link>
            <Link
              to="/dashboard/admin/encomendas"
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-shipping-fast mr-3 w-5 text-[#A2672D]"></i>{" "}
              Encomendas
            </Link>
            <Link
              to="/dashboard/admin/equipe"
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-users-cog mr-3 w-5 text-[#A2672D]"></i>{" "}
              Equipe
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full cursor-pointer mt-8 flex items-center p-3 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 transition duration-200 font-semibold text-[#A2672D] text-lg shadow-sm"
        >
          <i className="fas fa-sign-out-alt mr-3 w-5"></i> Sair
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
