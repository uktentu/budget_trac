from pydantic import BaseModel
from typing import Optional, List

# Transaction Schemas
class TransactionBase(BaseModel):
    description: str
    amount: float
    type: str
    category: str
    date: str
    emoji: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: str

    class Config:
        orm_mode = True

# Budget Schemas
class BudgetBase(BaseModel):
    category: str
    limit: float
    period: str

class BudgetCreate(BudgetBase):
    pass

class Budget(BudgetBase):
    id: str

    class Config:
        orm_mode = True

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    type: str
    color: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: str

    class Config:
        orm_mode = True
