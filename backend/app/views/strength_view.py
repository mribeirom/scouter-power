from fastapi import APIRouter, Depends
from app.models.strength import StrengthAnalysisRequest, StrengthAnalysisResponse
from app.models.ml import get_ml_model
from app.controllers.strength_controller import analyze_strength_logic

router = APIRouter(prefix="/api/v1/strength", tags=["strength"])

@router.post("/analyze", response_model=StrengthAnalysisResponse)
def analyze_strength(request: StrengthAnalysisRequest, model=Depends(get_ml_model)):
    """
    Endpoint para analisar o 1RM e classificar a força.
    """
    result = analyze_strength_logic(request, model)
    return StrengthAnalysisResponse(
        rm1_estimado_kg=result["rm1"],
        classificacao=result["classe"],
        formula_utilizada="epley"
    )
