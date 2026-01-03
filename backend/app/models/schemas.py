from pydantic import BaseModel, Field
from typing import List, Optional

class NewsInput(BaseModel):
    """Schema for single news text input."""
    text: str = Field(..., description="The news article text to classify", min_length=10)

    class Config:
        json_schema_extra = {
            "example": {
                "text": "The stock market hit a new record high today driven by tech sector gains."
            }
        }

class NewsBatchInput(BaseModel):
    """Schema for batch news text input."""
    texts: List[str] = Field(..., description="List of news articles to classify")

class PredictionOutput(BaseModel):
    """Schema for prediction response."""
    category: str
    confidence: Optional[float] = None
    input_text: Optional[str] = None