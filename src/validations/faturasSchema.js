import * as yup from "yup";

export const faturasSchema = yup.object().shape({
  metodo_pagamento: yup.string().required("Selecione um método de pagamento"),
  pago: yup.boolean(),
});