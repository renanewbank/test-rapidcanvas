from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import api

# Initialize the application
app = FastAPI(
    title="RapidCanvas Text Classification API",
    description="Backend API for the Junior Data Scientist Technical Assessment.",
    version="1.0.0"
)

# CORS Configuration (Required for React Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes from the router module
app.include_router(api.router)