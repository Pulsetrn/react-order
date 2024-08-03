from src.backend.app.db.models import Product as ProductModel, User as UserModel
from src.backend.app.api.schemas.schemas import Product as ProductSchema, User as UserSchema, UserDB as UserDBSchema, \
    UserDB
from src.backend.app.db.database import engine, get_async_session as get_db
from .methods import *
from src.backend.app.db.models import Base
from fastapi import APIRouter, Depends, HTTPException

auth_router = APIRouter(
    prefix="/auth",
    tags=["order"],
)


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@auth_router.on_event("startup")
async def on_startup():
    await create_tables()


# @auth_router.post("/login")
# async def login(email: str, password: str):

@auth_router.post("/register")
async def register_router(user: UserDBSchema, db=Depends(get_db)):
    user = await register_user(user, db)
    return user
