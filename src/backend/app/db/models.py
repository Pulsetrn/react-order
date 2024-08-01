from app.db.database import Base
from sqlalchemy.orm import Mapped, mapped_column


class Products(Base):
    __tablename__ = "Products"
