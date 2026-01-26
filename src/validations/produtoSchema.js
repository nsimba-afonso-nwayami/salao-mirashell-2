import * as yup from "yup";

export const produtoSchema = yup.object().shape({
  nome: yup.string().required("O nome do produto é obrigatório"),
  categoria: yup.string().required("Selecione uma categoria"),
  preco: yup.number().typeError("Insira um número válido").positive("Preço inválido").required(),
  estoque: yup.number().typeError("Insira um número").min(0, "Mínimo 0").required(),
  descricao: yup.string().nullable(),
  // Validação para o ficheiro de imagem
  imagem: yup
    .mixed()
    .test("required", "A imagem é obrigatória", (value) => {
      // Se for edição e já existir imagem, pode ser opcional. Se for novo, é obrigatório.
      return value && value.length > 0;
    })
    .test("fileSize", "O ficheiro é muito grande (máx 2MB)", (value) => {
      return value && value[0]?.size <= 2000000;
    })
    .test("fileType", "Formato não suportado (apenas JPG, PNG)", (value) => {
      return value && ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
    }),
});