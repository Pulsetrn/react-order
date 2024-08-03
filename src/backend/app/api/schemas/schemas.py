from pydantic import BaseModel


class Ingredient(BaseModel):
    name: str


class Product(BaseModel):
    name: str
    price: float
    ingredients: str | None = None
    image: str | None = None
    rating: float | None = None


class ProductOut(BaseModel):
    id: int
    name: str
    price: float
    ingredients: list[str] | None = None
    image: str | None = None
    rating: float | None = None


class UserDB(BaseModel):
    username: str
    email: str
    password: str


class User(BaseModel):
    id: int
    username: str
    email: str
