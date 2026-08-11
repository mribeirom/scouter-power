import { env } from "./env";
import type { StrengthAnalysisRequest, StrengthAnalysisResponse } from "../types/api";

const API_URL = env.VITE_API_URL;

export async function analyzeStrength(data: StrengthAnalysisRequest): Promise<StrengthAnalysisResponse> {
  const response = await fetch(`${API_URL}/api/v1/strength/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Falha ao conectar com a API');
  }

  return response.json();
}
