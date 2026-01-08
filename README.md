# News Classification System 

![Python](https://img.shields.io/badge/Python-3.13-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![Docker](https://img.shields.io/badge/Deployment-Docker-2496ED)

## Project Description
This project implements an end-to-end web application for automatic news classification, designed to assist news portal editors in quickly categorizing incoming articles.

The system uses Natural Language Processing (NLP) to classify articles into four categories: **World, Sports, Business, and Sci/Tech**. It features a React frontend, a FastAPI backend, and is containerized for easy deployment.

### Key Features
- **Single Text Classification:** Real-time prediction with confidence scores.
- **Batch Processing:** Support for classifying multiple headlines at once (one per line).
- **CSV Export:** Download batch results directly to CSV.
- **Model Transparency:** Dedicated information page displaying model metrics and details.
- **Responsive Design:** Built with Material UI for usage on desktop and mobile.

---

## System Architecture
The application follows a microservices-ready architecture:

1.  **Frontend:** React (Vite) served via **Nginx**. Acts as a reverse proxy to route API requests, eliminating CORS issues.
2.  **Backend:** **FastAPI** application exposing the ML model via REST endpoints.
3.  **Machine Learning:** Scikit-learn pipeline (TF-IDF + Naive Bayes) serialized for inference.
4.  **Infrastructure:** Orchestrated via **Docker Compose**.

---

## Machine Learning Approach
**Model:** TF-IDF Vectorizer + Multinomial Naive Bayes.

**Justification:**
This classical approach was chosen to prioritize inference speed, low resource consumption, and explainability, while still achieving high accuracy (~90%) for the specific task of news topic classification.

### Performance Metrics (Test Set)
The model was evaluated on a held-out test set of 7,600 samples from the AG News dataset.

| Metric | Score |
| :--- | :--- |
| **Overall Accuracy** | **89.67%** |
| **Macro F1-Score** | **0.90** |

**Class-wise Performance:**

| Category | Precision | Recall | F1-Score |
| :--- | :--- | :--- | :--- |
| World | 0.91 | 0.89 | 0.90 |
| Sports | 0.95 | 0.98 | 0.96 |
| Business | 0.87 | 0.85 | 0.86 |
| Sci/Tech | 0.87 | 0.87 | 0.87 |

---

## How to Run

You can run the application using **Docker (Recommended)** or manually.

### Option A: Docker
This method spins up the Backend, Frontend, and Nginx proxy automatically.

1.  Ensure Docker Desktop is running.
2.  On project directory, run the command on terminal:
    ```bash
    docker compose up --build
    ```
3.  Access the application:
    * **Frontend:** [http://localhost](http://localhost)
    * **API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

### Option B: Manual Setup (Development)

**1. Backend Setup**
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Backend runs on [http://127.0.0.1:8000](http://127.0.0.1:8000)

```

**2. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173

```

---

## API Documentation

The backend provides automatic interactive documentation via Swagger UI.

* **POST** `/predict`: Classifies a single text string. Returns category and confidence score.
* **POST** `/predict/batch`: Classifies a list of texts. Returns a JSON object with results.
* **GET** `/model/info`: Returns model metadata (accuracy, version, algorithm).

---

## Tech Stack

* **Language:** Python 3.13
* **ML Libraries:** Scikit-learn, Pandas, Joblib, Numpy
* **API Framework:** FastAPI, Uvicorn, Pydantic
* **Frontend:** React, Vite, Material-UI (MUI), Axios
* **Containerization:** Docker, Docker Compose, Nginx

---

## Project Structure

```text
test-rapidcanvas/
├── backend/
│   ├── app/
│   │   ├── main.py          # App entrypoint
│   │   ├── services/        # ML inference logic
│   │   └── routers/         # API endpoints
│   │   └── models/          # Schemas
│   ├── model/               # Serialized .pkl model
│   ├── notebooks/           # Training and analysis notebooks
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # React components (Single, Batch, Info)
│   │   └── api.js           # Axios configuration
│   ├── nginx.conf           # Reverse proxy config
│   └── Dockerfile
└── docker-compose.yml       # Orchestration
└── README.md                # Documentation

```