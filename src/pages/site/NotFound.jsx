import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function NotFound() {
  return (
    <>
      <title>Página não encontrada | Salão Mirashell</title>
      <Header />

      <section className="w-full min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-3xl w-full text-center bg-white shadow-lg rounded-xl p-10">
          <h1 className="text-6xl md:text-7xl font-bold text-[#A2672D] mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#5a4d3e] mb-4">
            Página não encontrada
          </h2>

          <p className="text-gray-600 text-base md:text-lg mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>

          <Link
            to="/"
            className="inline-block bg-[#A2672D] text-white font-semibold px-8 py-3 rounded-md shadow 
            hover:bg-[#5a4d3e] transition-colors duration-300"
          >
            Voltar para a Home
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
