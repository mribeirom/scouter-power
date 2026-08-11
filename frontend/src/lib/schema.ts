import { z } from "zod";

export const EXERCISES = ["supino", "agachamento", "levantamento terra"] as const;
export const GENDERS = ["masculino", "feminino"] as const;

export const strengthAnalysisSchema = z.object({
  levantamento: z.enum(EXERCISES, {
    message: "Por favor, selecione um exercício válido.",
  }),
  genero: z.enum(GENDERS, {
    message: "Por favor, selecione um gênero válido.",
  }),
  carga: z.number({
    message: "A carga deve ser um número.",
  }).min(0, "A carga deve ser maior ou igual a 0.").max(500, "Carga excessiva informada."),
  idade: z.number({
    message: "A idade deve ser um número.",
  }).min(10, "A idade deve ser maior que 10 anos.").max(120, "Idade inválida."),
  repeticao: z.number({
    message: "O número de repetições deve ser um número.",
  }).int("O número de repetições deve ser inteiro.").min(1, "Deve ser no mínimo 1 repetição.").max(100, "Número de repetições irreal."),
  peso: z.number({
    message: "O peso corporal deve ser um número.",
  }).min(20, "O peso corporal deve ser maior que 20kg.").max(300, "Peso corporal irreal."),
});

export type StrengthAnalysisFormData = z.infer<typeof strengthAnalysisSchema>;
