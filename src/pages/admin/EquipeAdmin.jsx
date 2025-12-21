import { useState } from "react";
import { Link } from "react-router-dom"; 
// Importação do logo circular Mirashell
import logoImg from "../../assets/img/LOGO.png";

export default function EquipeAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome_asc");

  // DADOS FICTÍCIOS DE MEMBROS DA EQUIPE
  const todosMembros = [
    { id: 501, nome: "Sofia Almeida", especialidade: "Cabeleireira Master", telefone: "921 111 222", email: "sofia.a@salao.com", tipo: "Admin" },
    { id: 502, nome: "Carlos Viana", especialidade: "Manicure & Pedicure", telefone: "912 333 444", email: "carlos.v@salao.com", tipo: "Funcionário" },
    { id: 503, nome: "Helena Santos", especialidade: "Esteticista Facial", telefone: "934 555 666", email: "helena.s@salao.com", tipo: "Gerente" },
    { id: 504, nome: "Ricardo Jorge", especialidade: "Cabeleireiro Júnior", telefone: "900 777 888", email: "ricardo.j@salao.com", tipo: "Funcionário" },
    { id: 505, nome: "Lúcia Pereira", especialidade: "Massagista", telefone: "956 999 000", email: "lucia.p@salao.com", tipo: "Funcionário" },
  ];
  
  const especialidades = ["Cabeleireira Master", "Cabeleireiro Júnior", "Manicure & Pedicure", "Esteticista Facial", "Massagista"];

  // LÓGICA DE FILTRAGEM E ORDENAÇÃO
  let membrosProcessados = todosMembros.filter(membro => {
    const termo = termoPesquisa.toLowerCase();
    const buscaMatch = termo === '' || 
                       membro.nome.toLowerCase().includes(termo) || 
                       membro.telefone.includes(termo);
    const especialidadeMatch = filtroEspecialidade === '' || membro.especialidade === filtroEspecialidade;
    return buscaMatch && especialidadeMatch;
  });

  membrosProcessados.sort((a, b) => {
    switch (ordenacao) {
      case 'nome_asc': return a.nome.localeCompare(b.nome);
      case 'especialidade_asc': return a.especialidade.localeCompare(b.especialidade) || a.nome.localeCompare(b.nome);
      default: return 0;
    }
  });

  const handleEdit = (id) => alert(`Ação: Editar Perfil do Membro ${id}`);
  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja ELIMINAR o membro "${nome}" do sistema? Esta ação é IRREVERSÍVEL.`)) {
      alert(`Ação: Membro ${nome} ELIMINADO.`);
    }
  };
  const handleAdd = () => alert("Ação: Abrir formulário para Novo Membro");
  const handleLogout = () => alert("Ação: Logout Realizado!");
  
  // Mantendo suas cores originais da tabela droga (literalmente)
  const getTipoClasses = (tipo) => {
    switch (tipo) {
      case 'Admin': return 'bg-red-700/30 text-red-600';
      case 'Gerente': return 'bg-blue-700/30 text-blue-600';
      case 'Funcionário': return 'bg-green-700/30 text-green-600';
      default: return 'bg-stone-700/30 text-stone-600';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex">

      {/* SIDEBAR MIRASHELL */}
      <aside className={`bg-white border-r border-stone-200 w-64 fixed top-0 left-0 h-screen p-6 shadow-lg transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 z-50 flex flex-col justify-between overflow-y-auto`}>
        <div>
          <button className="md:hidden absolute top-4 right-4 text-2xl text-stone-600" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>

          <div className="flex flex-col items-center mb-10 mt-2">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md overflow-hidden bg-white">
               <img src={logoImg} alt="MiraShell Logo" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" />
            </div>
            <span className="mt-3 font-bold text-[#A2672D] tracking-widest text-sm uppercase">Mirashell</span>
          </div>

          <nav className="space-y-4 text-lg text-stone-600">
            <Link to="/dashboard/admin" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-chart-line mr-3 w-5 text-[#A2672D]"></i> Dashboard</Link>
            <Link to="/dashboard/admin/agendamentos" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-calendar-check mr-3 w-5 text-[#A2672D]"></i> Agendamentos</Link>
            <Link to="/dashboard/admin/servicos" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-paint-brush mr-3 w-5 text-[#A2672D]"></i> Serviços</Link>
            <Link to="/dashboard/admin/categorias" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-tags mr-3 w-5 text-[#A2672D]"></i> Categorias</Link>
            <Link to="/dashboard/admin/produtos" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-box-open mr-3 w-5 text-[#A2672D]"></i> Produtos</Link>
            <Link to="/dashboard/admin/encomendas" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-shipping-fast mr-3 w-5 text-[#A2672D]"></i> Encomendas</Link>
            <Link to="/dashboard/admin/equipe" className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"><i className="fas fa-users-cog mr-3 w-5"></i> Equipe</Link>
          </nav>
        </div>
        <button onClick={handleLogout} className="w-full mt-8 flex items-center p-3 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 transition font-semibold text-[#A2672D]"><i className="fas fa-sign-out-alt mr-3 w-5"></i> Sair</button>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        <header className="bg-white border-b border-stone-200 fixed top-0 right-0 left-0 md:left-64 h-16 flex items-center justify-between px-6 shadow-sm z-30">
          <button className="md:hidden text-xl text-stone-600" onClick={() => setSidebarOpen(!sidebarOpen)}><i className="fas fa-bars"></i></button>
          <h2 className="text-lg font-light text-stone-800 tracking-wide">Gestão de Equipe</h2>
          <div className="w-10 h-10 bg-[#A2672D] rounded-full flex items-center justify-center text-white font-bold">A</div>
        </header>

        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 text-stone-900">
                <h3 className="text-2xl font-bold text-[#A2672D]">Membros da Equipe ({todosMembros.length})</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg"><i className="fas fa-user-plus"></i> Novo Membro</button>
            </div>

            {/* FILTROS E PESQUISA */}
            <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
              <div className="relative w-full sm:w-auto flex-1 min-w-50">
                <input
                  type="text"
                  placeholder="Pesquisar nome ou telefone..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D] text-stone-800 placeholder-stone-400"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
              </div>

              <select value={filtroEspecialidade} onChange={(e) => setFiltroEspecialidade(e.target.value)} className="w-full sm:w-56 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 cursor-pointer">
                <option value="">Especialidade (Todas)</option>
                {especialidades.map(esp => <option key={esp} value={esp}>{esp}</option>)}
              </select>

              <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)} className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 cursor-pointer">
                <option value="nome_asc">Nome A-Z</option>
                <option value="especialidade_asc">Especialidade</option>
              </select>
              
              {(filtroEspecialidade || termoPesquisa) && (
                  <button onClick={() => {setFiltroEspecialidade(''); setTermoPesquisa(''); setOrdenacao('nome_asc');}} className="px-3 py-2 bg-stone-200 rounded-lg text-stone-600 hover:bg-stone-300 transition-colors"><i className="fas fa-sync-alt mr-1"></i> Limpar</button>
              )}
            </div>

            {/* TABELA - ESTRUTURA ORIGINAL PRESERVADA */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-[#A2672D] border-b border-stone-200">
                    <th className="p-3 whitespace-nowrap">ID</th>
                    <th className="p-3 whitespace-nowrap">Nome</th>
                    <th className="p-3 whitespace-nowrap">Especialidade</th>
                    <th className="p-3 whitespace-nowrap">Telefone</th>
                    <th className="p-3 whitespace-nowrap hidden sm:table-cell">E-mail</th>
                    <th className="p-3 text-center whitespace-nowrap">Tipo de Usuário</th>
                    <th className="p-3 text-center whitespace-nowrap">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {membrosProcessados.length > 0 ? (
                    membrosProcessados.map((membro) => (
                      <tr key={membro.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors text-stone-700">
                        <td className="p-3 opacity-70 whitespace-nowrap">{membro.id}</td>
                        <td className="p-3 font-medium whitespace-nowrap text-stone-900">{membro.nome}</td>
                        <td className="p-3 whitespace-nowrap opacity-90">{membro.especialidade}</td>
                        <td className="p-3 whitespace-nowrap opacity-80">{membro.telefone}</td>
                        <td className="p-3 whitespace-nowrap opacity-70 text-xs hidden sm:table-cell">{membro.email}</td>
                        <td className="p-3 text-center whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getTipoClasses(membro.tipo)}`}>
                                {membro.tipo}
                            </span>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <div className="flex justify-center space-x-3 text-base">
                            <button className="text-[#A2672D] hover:text-stone-900 transition-colors" onClick={() => handleEdit(membro.id)} title="Editar Perfil"><i className="fas fa-edit"></i></button>
                            <button className="text-red-500 hover:text-red-700 transition-colors" onClick={() => handleDelete(membro.id, membro.nome)} title="Eliminar Membro"><i className="fas fa-trash-alt"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" className="p-6 text-center text-stone-400">Nenhum membro da equipe encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-stone-400 text-sm">Total de {todosMembros.length} Membros registrados</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}