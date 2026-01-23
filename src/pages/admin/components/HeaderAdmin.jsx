export default function HeaderAdmin({ sidebarOpen, setSidebarOpen, title }) {
  return (
    <header className="bg-white border-b border-stone-200 fixed top-0 right-0 left-0 md:left-64 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm z-30">
      <button
        className="md:hidden text-xl sm:text-2xl text-stone-600"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      <h2 className="text-lg sm:text-xl font-medium tracking-wide text-stone-700">
        {title || "Painel de Gestão Mirashell"}
      </h2>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="relative text-xl sm:text-2xl text-[#A2672D] hover:opacity-80 transition-all">
          <i className="fas fa-bell"></i>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-stone-500 hidden sm:block">
            Admin
          </span>
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#A2672D] rounded-full flex items-center justify-center">
            <i className="fas fa-user text-white text-base"></i>
          </div>
        </div>
      </div>
    </header>
  );
}
