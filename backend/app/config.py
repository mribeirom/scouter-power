from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    cors_origins: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    model_path: str = "../data/knn_model.joblib"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
