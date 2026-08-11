import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url("VITE_API_URL deve ser uma URL válida"),
});

const _env = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

if (!_env.success) {
  console.error("❌ Erro na validação das variáveis de ambiente:", _env.error.format());
  throw new Error("Variáveis de ambiente inválidas ou ausentes. Verifique o arquivo .env");
}

export const env = _env.data;
