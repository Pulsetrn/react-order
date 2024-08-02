from src.backend.app.db.models import Product as ProductModel
from src.backend.app.api.schemas.schemas import Product as ProductSchema
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


async def get_products(db: AsyncSession):
    query = select(ProductModel)
    result = await db.execute(query)
    products = result.scalars().all()

    if not products:
        return False

    products_list = []
    for product in products:
        product_dict = product.__dict__.copy()  # Создаем копию словаря продукта
        if 'ingredients' in product_dict:
            product_dict['ingredients'] = product_dict['ingredients'].split(',')
        products_list.append(product_dict)

    return products_list


async def create_product(product: ProductSchema, db: AsyncSession) -> ProductModel:
    db_product = ProductModel(**product.dict())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product


async def read_product_by_id(product_id: int, db: AsyncSession) -> ProductModel:
    query = select(ProductModel).where(ProductModel.id == product_id)
    result = await db.execute(query)
    db_product = result.scalar_one_or_none()
    if not db_product:
        return False
    else:
        product_dict = db_product.__dict__.copy()
        if 'ingredients' in product_dict:
            product_dict['ingredients'] = product_dict['ingredients'].split(',')
    return product_dict
