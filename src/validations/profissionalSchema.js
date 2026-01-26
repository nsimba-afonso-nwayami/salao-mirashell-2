import * as yup from "yup";

export const profissionalSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório").min(3, "Mínimo 3 caracteres"),
  telefone: yup.string().required("O telefone é obrigatório").min(9, "Telefone inválido"),
});