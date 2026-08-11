import pandas as pd
from fastapi import HTTPException
import logging
from app.models.strength import StrengthAnalysisRequest

logger = logging.getLogger(__name__)

def calcular_epley(peso: float, reps: int) -> float:
    """Calcula o 1RM usando a fórmula de Epley."""
    if reps <= 1:
        return peso
    return round(peso * (1 + 0.0333 * reps), 2)

def analyze_strength_logic(request_data: StrengthAnalysisRequest, model_pipeline) -> dict:
    if model_pipeline is None:
        logger.error("Modelo KNN não está carregado no servidor.")
        raise HTTPException(status_code=503, detail="Modelo KNN não está carregado no servidor.")
    
    # 1. Calcular o 1RM
    rm1 = calcular_epley(request_data.peso_exercicio, request_data.repeticoes)
    
    # 2. Preparar os dados
    input_data = pd.DataFrame([{
        'levantamento': request_data.exercicio.lower(),
        'genero': request_data.genero.lower(),
        'idade': request_data.idade,
        'peso': request_data.peso_corporal,
        'carga': rm1
    }])
    
    # 3. Predição
    try:
        predicao = model_pipeline.predict(input_data)
        classe = predicao[0]
    except Exception as e:
        logger.error(f"Erro durante a predição: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno ao classificar a força do atleta.")
        
    return {
        "rm1": rm1,
        "classe": str(classe).capitalize()
    }
