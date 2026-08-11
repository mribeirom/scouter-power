import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.neighbors import KNeighborsClassifier
import joblib
import os
import argparse
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def train_and_export_model(neighbors: int):
    logger.info("Iniciando treinamento do modelo KNN...")
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(current_dir, 'data', 'dataset.csv')
    model_output_path = os.path.join(current_dir, 'data', 'knn_model.joblib')

    try:
        df = pd.read_csv(dataset_path, sep=';')
    except Exception as e:
        logger.error(f"Erro ao ler o arquivo {dataset_path}: {e}")
        return

    df = df.dropna()

    X = df[['levantamento', 'genero', 'idade', 'peso', 'carga']]
    y = df['nivel']

    categorical_features = ['levantamento', 'genero']
    numeric_features = ['idade', 'peso', 'carga']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])

    knn_pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', KNeighborsClassifier(n_neighbors=neighbors, weights='distance'))
    ])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    logger.info(f"Ajustando o modelo com n_neighbors={neighbors}...")
    knn_pipeline.fit(X_train, y_train)
    
    accuracy = knn_pipeline.score(X_test, y_test)
    logger.info(f"Acurácia no conjunto de teste: {accuracy:.4f}")

    logger.info("Exportando modelo...")
    joblib.dump(knn_pipeline, model_output_path)
    logger.info(f"Modelo exportado com sucesso para: {model_output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Treinar modelo KNN para análise de força.")
    parser.add_argument("--neighbors", type=int, default=5, help="Número de vizinhos para o KNN (padrão: 5)")
    args = parser.parse_args()
    
    train_and_export_model(args.neighbors)
