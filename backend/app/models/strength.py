from pydantic import BaseModel, Field

class StrengthAnalysisRequest(BaseModel):
    exercicio: str = Field(..., description="Nome do exercício (ex: supino, agachamento, deadlift)")
    genero: str = Field(..., description="Gênero do atleta (m, f)")
    idade: int = Field(..., gt=0, description="Idade do atleta")
    peso_corporal: float = Field(..., gt=0, description="Peso corporal em kg")
    peso_exercicio: float = Field(..., gt=0, description="Peso levantado no exercício em kg")
    repeticoes: int = Field(..., gt=0, description="Número de repetições realizadas")

class StrengthAnalysisResponse(BaseModel):
    rm1_estimado_kg: float
    classificacao: str
    formula_utilizada: str
