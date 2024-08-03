from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.backend.app.api.endpoints.order import product_router
from src.backend.app.api.endpoints.auth import auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(product_router)
app.include_router(auth_router)