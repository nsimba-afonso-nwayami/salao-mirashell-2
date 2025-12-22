import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function Loja() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("https://api2.nwayami.com/api/produtos/")
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) =>
        console.error("Erro ao carregar produtos:", error)
      );
  }, []);

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  return (
    <>
      <title>Loja | Salão Mirashell</title>
      <Header />

      {/* Produtos */}
      <section className="w-full pt-32 pb-20 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#A2672D] mb-12">
          Nossos Produtos
        </h2>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                {/* Imagem */}
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={
                      formatImageUrl(produto.imagem) ||
                      "/path/to/default-image.jpg"
                    }
                    alt={produto.descricao}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold text-[#5a4d3e] mb-2">
                    {produto.nome}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4">
                    {produto.descricao}
                  </p>

                  <p className="text-sm text-gray-700 mb-1">
                    Estoque:
                    <strong> {produto.estoque}</strong>
                  </p>

                  <p className="text-sm text-gray-700 mb-6">
                    Preço:
                    <strong> Kz {produto.preco}</strong>
                  </p>

                  <Link
                    to="/loja/encomendar"
                    state={{ produto }}
                    className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-5 py-3 rounded-md shadow 
                      hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    Encomendar Agora
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              Carregando produtos...
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
