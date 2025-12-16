import { Link } from "react-router-dom";
// Importação do logo circular Mirashell
import logoImg from "../../assets/img/LOGO.png";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md">
        
        {/* CABEÇALHO COM LOGO CIRCULAR */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md bg-white">
              <img 
                src={logoImg} 
                alt="MiraShell Logo" 
                className="w-20 h-20 object-cover rounded-full" 
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-[#A2672D] uppercase mb-1">
            Mirashell
          </h1>
          <h2 className="text-stone-500 font-light">Criar Conta Administrativa</h2>
        </div>

        {/* FORMULÁRIO DE REGISTRO */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* CAMPO NOME */}
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-stone-700 mb-1 pl-1">Nome Completo</label>
            <div className="relative">
              <input
                id="nome"
                type="text"
                required
                placeholder="Introduza o seu nome"
                className="w-full py-2.5 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] focus:border-transparent outline-none text-stone-800 placeholder-stone-400 transition-all"
              />
              <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A2672D]"></i>
            </div>
          </div>

          {/* CAMPO E-MAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-1 pl-1">E-mail</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                placeholder="seu.email@mirashell.com"
                className="w-full py-2.5 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] focus:border-transparent outline-none text-stone-800 placeholder-stone-400 transition-all"
              />
              <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A2672D]"></i>
            </div>
          </div>

          {/* CAMPO SENHA */}
          <div>
            <label htmlFor="senha" className="block text-sm font-semibold text-stone-700 mb-1 pl-1">Senha</label>
            <div className="relative">
              <input
                id="senha"
                type="password"
                required
                placeholder="Crie uma senha forte"
                className="w-full py-2.5 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] focus:border-transparent outline-none text-stone-800 placeholder-stone-400 transition-all"
              />
              <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A2672D]"></i>
            </div>
          </div>

          {/* CAMPO CONFIRMAR SENHA */}
          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-semibold text-stone-700 mb-1 pl-1">Confirmar Senha</label>
            <div className="relative">
              <input
                id="confirmarSenha"
                type="password"
                required
                placeholder="Repita a sua senha"
                className="w-full py-2.5 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] focus:border-transparent outline-none text-stone-800 placeholder-stone-400 transition-all"
              />
              <i className="fas fa-check-double absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A2672D]"></i>
            </div>
          </div>
          
          {/* BOTÃO SUBMIT */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#A2672D] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-stone-200 text-lg mt-6"
          >
            <i className="fas fa-user-plus"></i>
            Criar Conta
          </button>
        </form>

        {/* LINK DE RODAPÉ */}
        <div className="mt-8 text-center text-sm border-t border-stone-100 pt-6">
          <p className="text-stone-400">
            Já possui acesso ao sistema? 
            <Link to="/login" className="text-[#A2672D] hover:underline ml-1 font-bold">
              Fazer Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}