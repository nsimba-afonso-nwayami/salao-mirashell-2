
import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .required("O nome é obrigatório"),

  senha: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("A senha é obrigatória"),
});


