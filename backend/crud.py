from sqlalchemy.orm import Session
from . import models, schemas
import uuid

def generate_id():
    return str(uuid.uuid4())

# Transactions
def get_transactions(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    return db.query(models.Transaction).filter(models.Transaction.user_id == user_id).offset(skip).limit(limit).all()

def create_transaction(db: Session, transaction: schemas.TransactionCreate, user_id: str):
    db_transaction = models.Transaction(id=generate_id(), user_id=user_id, **transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def delete_transaction(db: Session, transaction_id: str, user_id: str):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id, models.Transaction.user_id == user_id).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
    return db_transaction

def update_transaction(db: Session, transaction_id: str, transaction: schemas.TransactionCreate, user_id: str):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id, models.Transaction.user_id == user_id).first()
    if db_transaction:
        for key, value in transaction.dict().items():
            setattr(db_transaction, key, value)
        db.commit()
        db.refresh(db_transaction)
    return db_transaction

# Budgets
def get_budgets(db: Session, user_id: str):
    return db.query(models.Budget).filter(models.Budget.user_id == user_id).all()

def create_budget(db: Session, budget: schemas.BudgetCreate, user_id: str):
    db_budget = models.Budget(id=generate_id(), user_id=user_id, **budget.dict())
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget

# Categories
def get_categories(db: Session, user_id: str):
    return db.query(models.Category).filter(models.Category.user_id == user_id).all()

def create_category(db: Session, category: schemas.CategoryCreate, user_id: str):
    db_category = models.Category(id=generate_id(), user_id=user_id, **category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def initialize_categories(db: Session, user_id: str):
    if db.query(models.Category).filter(models.Category.user_id == user_id).count() == 0:
        defaults = [
            {"name": "Housing", "type": "expense", "color": "#ef4444"},
            {"name": "Food", "type": "expense", "color": "#f97316"},
            {"name": "Transportation", "type": "expense", "color": "#eab308"},
            {"name": "Utilities", "type": "expense", "color": "#3b82f6"},
            {"name": "Entertainment", "type": "expense", "color": "#8b5cf6"},
            {"name": "Salary", "type": "income", "color": "#22c55e"},
            {"name": "Freelance", "type": "income", "color": "#10b981"},
        ]
        for cat in defaults:
            create_category(db, schemas.CategoryCreate(**cat), user_id)
