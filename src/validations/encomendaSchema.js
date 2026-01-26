import * as yup from "yup";

export const encomendaSchema = yup.object().shape({
  nome_cliente: yup.string().required("O nome do cliente é obrigatório"),
  telefone: yup.string().required("O telefone de contacto é obrigatório"),
  email: yup.string().email("Introduza um e-mail válido").required("O e-mail é obrigatório"),
  endereco: yup.string().required("O endereço de entrega é obrigatório"),
  cidade: yup.string().required("A cidade/município é obrigatória"),
  provincia: yup.string().required("Selecione uma das províncias"),
  status: yup.string().nullable(),
  
  // Novos campos validados para garantir a integridade do item
  produto_id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Selecione um produto da lista"),
  
  quantidade: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, "A quantidade mínima é 1")
    .required("Informe a quantidade"),
});