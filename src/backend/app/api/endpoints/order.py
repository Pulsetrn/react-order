from fastapi import APIRouter

order_router = APIRouter(
    prefix="/react-order",
    tags=["order"],
)

@order_router.get("/products")
async def get_products():
    
@order_router.get("/products/{id}")
async def get_product(id: int):
    
