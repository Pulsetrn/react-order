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
