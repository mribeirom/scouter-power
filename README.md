# Scouter Power

Uma aplicação web fullstack para análise e classificação de força de atletas utilizando Machine Learning, com uma interface temática moderna de Dragon Ball.

**[Acesse a aplicação online aqui](https://scouter-power.vercel.app/)**

### Prévia 
<p align="center">
  <img src="https://github.com/user-attachments/assets/e74ca1b0-eaa0-4924-a537-4f964a1c962b" width="800px" />
</p>

## Tecnologias

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Zod & React Hook Form**
- **TanStack React Query**
- **Lucide React**
- **Sonner**

### Backend
- **Python**
- **FastAPI**
- **Uvicorn**
- **Scikit-learn / Pandas / Numpy / Joblib**
- **Pydantic**
- **Pytest**

## Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- Node.js versão 18 ou superior 
- Python versão 3.8 ou superior 
- Gerenciador de pacotes npm, yarn, pnpm ou bun

### Configurando a API Backend

Navegue até a pasta do backend:

```bash
cd backend
```

Crie e ative um ambiente virtual:

```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Copie o arquivo de variáveis de ambiente e configure conforme necessário:

```bash
cp .env.example .env
```

Inicie o servidor da API FastAPI:

```bash
uvicorn app.main:app --reload
```

A API estará rodando por padrão:

```bash
http://localhost:8000
```

### Configurando o Frontend

Abra um novo terminal na raiz do repositório e navegue até a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação web em modo de desenvolvimento:

```bash
npm run dev
```

O frontend estará acessível em:

```bash
http://localhost:5173
```

## Funcionalidades

- Interface imersiva com overlay e efeitos temáticos.
- Formulário de análise de força e estatísticas dos atletas.
- Validação robusta de formulários tanto no frontend quanto no backend.
- Backend estruturado com arquitetura MVC.
- Classificação de nível de força utilizando um modelo de Machine Learning treinado previamente.
