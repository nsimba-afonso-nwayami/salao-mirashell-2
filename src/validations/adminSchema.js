import * as yup from "yup";

export const adminSchema = yup.object().shape({
  username: yup
    .string()
    .required("O nome de usuário é obrigatório")
    .min(3, "Mínimo de 3 caracteres")
    .matches(
      /^[a-zA-Z0-9@./+/-/_]+$/,
      "O username não pode ter espaços, acentos ou símbolos especiais"
    ),
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});