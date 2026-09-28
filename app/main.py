from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Blog Platform API",
    description="RESTful Blog Platform API built with FastAPI and SQLAlchemy",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "Blog API is healthy and running"}

# Once you build your routers in app/api/v1/api.py, include them like this:
# from app.api.v1.api import api_router
# app.include_router(api_router, prefix="/api/v1")
