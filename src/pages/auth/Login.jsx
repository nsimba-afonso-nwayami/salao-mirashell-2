import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginSchema";
import toast from "react-hot-toast";
import logoImg from "../../assets/img/LOGO.png";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Se já estiver logado, redireciona
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard/admin", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  // Envio do formulário
  const onSubmit = async (data) => {
    const toastId = toast.loading("Processando login...");

    try {
      await login(data);
      toast.success("Login realizado com sucesso!", { id: toastId });
      navigate("/dashboard/admin", { replace: true });
    } catch (error) {
      toast.error(error.message || "Erro ao fazer login", { id: toastId });
    }
  };

  // Evita render enquanto verifica auth
  if (loading) return null;

  return (
    <>
      <title>Entrar | Salão Mirashell</title>
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md">
          {/* CABEÇALHO */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <Link
                to="/"
                className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md bg-white"
              >
                <img
                  src={logoImg}
                  alt="MiraShell Logo"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </Link>
            </div>
            <h1 className="text-2xl font-bold tracking-widest text-[#A2672D] uppercase mb-1">
              Mirashell
            </h1>
            <h2 className="text-stone-500 font-light italic">
              Painel Administrativo
            </h2>
          </div>

          {/* FORMULÁRIO */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* USERNAME */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2 pl-1">
                Nome
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Digite seu nome"
                  className="w-full py-3 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] outline-none"
                />
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-[#A2672D]"></i>
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* SENHA */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2 pl-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("senha")}
                  placeholder="••••••••"
                  className="w-full py-3 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A2672D] outline-none"
                />
                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[#A2672D]"></i>
              </div>
              {errors.senha && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  {errors.senha.message}
                </p>
              )}
            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer px-4 py-3 bg-[#A2672D] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-60"
            >
              {isSubmitting ? "A validar..." : "Aceder ao Painel"}
            </button>
          </form>

          {/* LINKS */}
          <div className="mt-8 text-center text-sm border-t border-stone-100 pt-6">
            <Link to="#" className="text-[#A2672D] hover:underline block mb-3">
              Recuperar acesso à conta
            </Link>
            <p className="text-stone-400">
              Dificuldades no login?
              <Link
                to="/#"
                className="text-stone-600 ml-1 font-semibold hover:text-[#A2672D]"
              >
                Contactar TI
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
