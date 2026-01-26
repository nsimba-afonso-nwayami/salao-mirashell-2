import * as yup from "yup";

export const categoriaSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome da categoria é obrigatório")
    .min(3, "Mínimo de 3 caracteres"),
});