import * as yup from "yup";

export const agendamentosSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome do cliente é obrigatório")
    .min(3, "Mínimo de 3 caracteres"),

  telefone: yup
    .string()
    .required("O telefone é obrigatório")
    .min(9, "O telefone deve ter pelo menos 9 dígitos"),

  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),

  servico: yup
    .number()
    .typeError("Selecione um serviço")
    .required("O serviço é obrigatório"),

  profissional: yup
    .string()
    .nullable(),

  data: yup
    .string()
    .required("A data é obrigatória")
    .test("data-valida", "A data não pode ser no passado", (value) => {
      if (!value) return false;
      const hoje = new Date().toISOString().split("T")[0];
      return value >= hoje;
    }),

  hora: yup
    .string()
    .required("O horário é obrigatório"),

  status: yup
    .string()
    .oneOf(["pendente", "confirmado", "cancelado"])
    .required("O status é obrigatório"),

  observacoes: yup
    .string()
    .nullable(),
});