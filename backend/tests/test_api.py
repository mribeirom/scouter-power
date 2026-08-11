from fastapi.testclient import TestClient
from app.main import app

# Instancia o cliente de teste com a aplicação
# Nota: Durante os testes, o `lifespan` será executado, carregando o modelo real
client = TestClient(app)

def test_analyze_strength_success():
    payload = {
        "exercicio": "supino",
        "genero": "m",
        "idade": 30,
        "peso_corporal": 80.0,
        "peso_exercicio": 100.0,
        "repeticoes": 5
    }
    
    with TestClient(app) as client:
        response = client.post("/api/v1/strength/analyze", json=payload)
        
    assert response.status_code == 200
    data = response.json()
    assert "classificacao" in data
    assert data["rm1_estimado_kg"] == 116.65
    assert data["formula_utilizada"] == "epley"

def test_analyze_strength_validation_error():
    payload = {
        "exercicio": "supino",
        "genero": "m",
        "idade": -5, # Erro: idade deve ser > 0
        "peso_corporal": 80.0,
        "peso_exercicio": 100.0,
        "repeticoes": 5
    }
    
    with TestClient(app) as client:
        response = client.post("/api/v1/strength/analyze", json=payload)
        
    assert response.status_code == 422 # Unprocessable Entity (Pydantic ValidationError)
