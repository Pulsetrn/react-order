from src.backend.app.db.database import Base
from sqlalchemy.orm import Mapped, mapped_column


class Product(Base):
    __tablename__ = 'products'

    id: Mapped[int] = mapped_column(primary_key=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(index=True, nullable=False)
    price: Mapped[float] = mapped_column(nullable=False)
    ingredients: Mapped[str] = mapped_column()
    image: Mapped[str | None] = mapped_column(nullable=True)
    rating: Mapped[float | None] = mapped_column(nullable=True)


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, index=True, nullable=False)
    username: Mapped[str] = mapped_column(index=True, nullable=False)
    email: Mapped[str] = mapped_column(index=True, nullable=False)
    password: Mapped[str] = mapped_column(index=True, nullable=False)


