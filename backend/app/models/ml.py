import joblib
import logging
import os

logger = logging.getLogger(__name__)

class MLModel:
    def __init__(self):
        self.model = None

    def load_model(self):
        # Acessar a pasta raiz do projeto, depois a pasta data
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # app/ dir
        root_dir = os.path.dirname(base_dir) # backend/ dir
        model_full_path = os.path.join(root_dir, "data", "knn_model.joblib")
        
        try:
            self.model = joblib.load(model_full_path)
            logger.info(f"Modelo carregado com sucesso de: {model_full_path}")
        except FileNotFoundError:
            logger.warning("AVISO: Modelo não encontrado. Rode o script train_model.py primeiro.")
            self.model = None
        except Exception as e:
            logger.error(f"Erro ao carregar o modelo: {e}")
            self.model = None
            
    def get_model(self):
        return self.model

# Instância Singleton
ml_model_instance = MLModel()

# Dependency Provider para o FastAPI
def get_ml_model():
    return ml_model_instance.get_model()
