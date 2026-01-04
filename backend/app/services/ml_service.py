import joblib
import os
import logging
from typing import Dict, Any, List
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# AG News Class Mapping (0-3)
CLASS_NAMES = {
    0: "World",
    1: "Sports",
    2: "Business",
    3: "Sci/Tech"
}

class MLService:
    def __init__(self):
        self.model = None
        self.load_model()

    def load_model(self):
        """Loads the trained model pipeline from the disk."""
        try:
            # Resolving absolute path for safe loading
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(base_dir, "../../model/trained_model.pkl")
            
            if not os.path.exists(model_path):
                logger.error(f"Model file not found at: {model_path}")
                return

            self.model = joblib.load(model_path)
            
            # Convert to relative path for cleaner logging
            clean_path = os.path.relpath(model_path)
            logger.info(f"Model loaded successfully from {clean_path}")
            
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}")
            self.model = None
        
    def predict(self, text: str) -> Dict[str, Any]:
        """Runs inference on a single text input."""
        if not self.model:
            logger.warning("Attempted prediction with unloaded model.")
            return {"category": "Error: Model not loaded"}
        
        try:
            # Get probabilities for all classes (returns array like [[0.1, 0.8, 0.05, 0.05]])
            probabilities = self.model.predict_proba([text])[0]
            
            # Get the index of the highest probability
            prediction_idx = np.argmax(probabilities)
            
            # Get the confidence score (the highest probability)
            confidence_score = float(np.max(probabilities))
            
            category = CLASS_NAMES.get(prediction_idx, "Unknown")
            
            return {
                "category": category,
                "confidence": confidence_score
            }
        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            return {"category": "Error during prediction"}

# Global singleton instance
ml_service = MLService()