# News Classification System 

## Project Description
This project implements an end-to-end web application for automatic news classification, designed to assist news portal editors in quickly categorizing incoming articles.

The system consists of:
1.  **Machine Learning Model:** A text classification pipeline trained on the AG News dataset.
2.  **Backend API:** A high-performance REST API built with FastAPI to serve predictions. (to do)
3.  **Frontend:** A modern React interface for single-text and batch classification. (to do)

## Machine Learning Approach
**Model:** TF-IDF Vectorizer + Multinomial Naive Bayes.

**Justification:**
This classical approach was chosen to prioritize inference speed, low resource consumption, and ease of deployment, while still achieving high accuracy (~90%) for the specific task of topic classification.

### Performance Metrics (Test Set)
The model was evaluated on a held-out test set of 7,600 samples.

| Metric | Score |
| :--- | :--- |
| **Overall Accuracy** | **89.67%** |
| **Macro F1-Score** | **0.90** |

Class-wise Performance:

| Category | Precision | Recall | F1-Score |
| :--- | :--- | :--- | :--- |
| World | 0.91 | 0.89 | 0.90 |
| Sports | 0.95 | 0.98 | 0.96 |
| Business | 0.87 | 0.85 | 0.86 |
| Sci/Tech | 0.87 | 0.87 | 0.87 |

## Tech Stack
- **Language:** Python 3.13
- **ML Libraries:** Scikit-learn, Pandas, Joblib
- **API Framework:** FastAPI, Uvicorn, Pydantic
- **Frontend:** React (Vite)

## How to Run

### 1. Backend Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev

```