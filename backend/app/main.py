from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import settings
from app.models.ml import ml_model_instance
from app.views.strength_view import router as strength_router

# Configuração global de logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Iniciando API de Análise de Força...")
    ml_model_instance.load_model()
    yield
    logger.info("Encerrando API...")

app = FastAPI(
    title="Strength Analysis API (MVC)",
    description="API refatorada usando arquitetura MVC para classificar a força de um atleta.",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrando as rotas da camada View
app.include_router(strength_router)
