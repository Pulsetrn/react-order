from fastapi import APIRouter

order_router = APIRouter(
    prefix="/react-order",
    tags=["order"],
)