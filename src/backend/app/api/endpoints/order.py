from typing import List

from fastapi import APIRouter, Depends, HTTPException

from src.backend.app.db.database import engine, get_async_session as get_db
from .methods import *
from src.backend.app.db.models import Base
from src.backend.app.api.schemas.schemas import Product as ProductSchema, ProductOut

product_router = APIRouter(
    prefix="/react-order",
)


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@product_router.on_event("startup")
async def on_startup():
    await create_tables()


@product_router.get("/products", tags=["products"], response_model=List[ProductOut])
async def get_products_router(db=Depends(get_db)):
    products = await get_products(db)
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    return products


@product_router.put("/products/create", response_model=ProductSchema, tags=["products"])
async def create_product_router(product: ProductSchema, db=Depends(get_db)):
    product_db = await create_product(product, db)
    if not product_db:
        raise HTTPException(status_code=404, detail="Product not found")
    else:
        return product_db


@product_router.get("/product/{product_id}", tags=["products"], response_model=ProductOut)
async def read_item_by_id_rout(product_id: int, db=Depends(get_db)):
    db_product = await read_product_by_id(product_id, db)
    if not db_product:
        raise HTTPException(status_code=404, detail=f"Product with id {product_id} not found")
    else:
        return db_product
