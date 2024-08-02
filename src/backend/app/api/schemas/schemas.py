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
    name: str
    price: float
    ingredients: list[str] | None = None
    image: str | None = None
    rating: float | None = None
