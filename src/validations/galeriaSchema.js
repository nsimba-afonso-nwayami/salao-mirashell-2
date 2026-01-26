import * as yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const galeriaSchema = yup.object().shape({
  title: yup.string().required("O título é obrigatório"), // Mudado de descricao para title
  image: yup // Mudado de imagem para image
    .mixed()
    .test("required", "A imagem é obrigatória", (value) => value && value.length > 0)
    .test("fileSize", "Máximo 5MB", (value) => value && value[0]?.size <= MAX_FILE_SIZE)
    .test("fileFormat", "Apenas JPG, JPEG ou PNG", (value) => value && SUPPORTED_FORMATS.includes(value[0]?.type)),
});