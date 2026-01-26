import * as yup from "yup";

export const servicosSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome do serviço é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  preco: yup
    .number()
    .typeError("O preço deve ser um número válido")
    .required("O preço é obrigatório")
    .positive("O preço deve ser maior que zero"),
  categoria: yup
    .number()
    .typeError("Selecione uma categoria válida")
    .required("A categoria é obrigatória"),
});