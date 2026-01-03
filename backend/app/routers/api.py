from fastapi import APIRouter, HTTPException
from app.models.schemas import NewsInput, NewsBatchInput, PredictionOutput
from app.services.ml_service import ml_service

# Create a router instance to group all endpoints
router = APIRouter()

@router.get("/health")
async def health_check():
    """Health check endpoint to verify service status."""
    return {
        "status": "online",
        "model_loaded": ml_service.model is not None
    }

@router.get("/model/info")
async def get_model_info():
    """Returns metadata about the deployed model."""
    return {
        "name": "TF-IDF + Naive Bayes Classifier",
        "dataset": "AG News",
        "classes": ["World", "Sports", "Business", "Sci/Tech"],
        "version": "1.0.0"
    }

@router.get("/categories")
async def get_categories():
    """Lists available classification categories."""
    return {
        "categories": ["World", "Sports", "Business", "Sci/Tech"]
    }

@router.post("/predict", response_model=PredictionOutput)
async def predict_news(input_data: NewsInput):
    """
    Classifies a single news article.
    """
    if not ml_service.model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    result = ml_service.predict(input_data.text)
    
    return {
        "category": result["category"],
        "input_text": input_data.text
    }

@router.post("/predict/batch")
async def predict_batch(input_data: NewsBatchInput):
    """
    Classifies a batch of news articles.
    """
    if not ml_service.model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    results = []
    for text in input_data.texts:
        if text.strip():
            pred = ml_service.predict(text)
            results.append({
                "text": text,
                "category": pred["category"]
            })
            
    return {"predictions": results}