import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 p-4">
      <div className="bg-stone-900/60 backdrop-blur-md border border-stone-800 rounded-xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wide text-amber-400 mb-2">
            <i className="fas fa-cut mr-2"></i> Mira<span className="text-white">shell</span>
          </h1>
          <h2 className="text-xl font-light text-white/80">Acesso ao Painel de Administração</h2>
        </div>

        {/* FORMULÁRIO DE LOGIN */}
        <form className="space-y-6">
          
          {/* CAMPO E-MAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">E-mail</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                placeholder="seu.email@empresa.com"
                className="w-full py-3 pl-10 pr-4 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white placeholder-stone-500 transition-colors"
              />
              <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500"></i>
            </div>
          </div>

          {/* CAMPO SENHA */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-white/90 mb-2">Senha</label>
            <div className="relative">
              <input
                id="senha"
                type="password"
                required
                placeholder="Insira sua senha"
                className="w-full py-3 pl-10 pr-4 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white placeholder-stone-500 transition-colors"
              />
              <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500"></i>
            </div>
          </div>
          
          {/* BOTÃO SUBMIT */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/50 text-lg"
          >
            <i className="fas fa-sign-in-alt"></i>
            Entrar
          </button>
        </form>

        {/* LINKS DE RODAPÉ */}
        <div className="mt-6 text-center text-sm">
          <Link to="/auth/esqueci-senha" className="text-amber-400 hover:text-amber-300 transition-colors block mb-2">
            Esqueceu a senha?
          </Link>
          <p className="text-white/70">
            Ainda não tem acesso? 
            <Link to="/auth/cadastrar-se" className="text-amber-400 hover:text-amber-300 transition-colors ml-1 font-semibold">
              Cadastre-se
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}