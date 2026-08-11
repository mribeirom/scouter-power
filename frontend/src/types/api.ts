export interface StrengthAnalysisRequest {
  exercicio: string;
  genero: string;
  idade: number;
  peso_corporal: number;
  peso_exercicio: number;
  repeticoes: number;
}

export interface StrengthAnalysisResponse {
  rm1_estimado_kg: number;
  classificacao: string;
  formula_utilizada: string;
}
