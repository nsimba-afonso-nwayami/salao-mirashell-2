import { Link } from "react-router-dom";
// Importação do logo circular Mirashell
import logoImg from "../../assets/img/LOGO.png";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md">
        
        {/* CABEÇALHO COM LOGO CIRCULAR */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md bg-white">
              <img 
                src={logoImg} 
                alt="MiraShell Logo" 
                className="w-24 h-24 object-cover rounded-full" 
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-[#A2672D] uppercase mb-1">
            Mirashell
          </h1>
          <h2 className="text-stone-500 font-light italic">Painel Administrativo</h2>
        </div>

        {/* FORMULÁRIO DE LOGIN */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* CAMPO E-MAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2 pl-1">
              E-mail Profissional
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                placeholder="exemplo@mirashell.com"
                className="w-full py-3 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] focus:border-transparent outline-none text-stone-800 placeholder-stone-400 transition-all"
              />
              <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A2672D]"></i>
            </div>
          </div>

          {/* CAMPO SENHA */}
          <div>
            <label htmlFor="senha" className="block text-sm font-semibold text-stone-700 mb-2 pl-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type="password"
                required
                placeholder="••••••••"
                className="w-full py-3 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] focus:border-transparent outline-none text-stone-800 placeholder-stone-400 transition-all"
              />
              <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A2672D]"></i>
            </div>
          </div>
          
          {/* BOTÃO ACESSAR */}
          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-[#A2672D] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-stone-200 text-lg mt-8"
          >
            <i className="fas fa-sign-in-alt"></i>
            Aceder ao Painel
          </button>
        </form>

        {/* LINKS DE APOIO */}
        <div className="mt-8 text-center text-sm border-t border-stone-100 pt-6">
          <Link to="/auth/esqueci-senha" className="text-[#A2672D] hover:underline transition-all block mb-3">
            Recuperar acesso à conta
          </Link>
          <p className="text-stone-400">
            Dificuldades no login? 
            <Link to="/contato-suporte" className="text-stone-600 ml-1 font-semibold hover:text-[#A2672D]">
              Contactar TI
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}