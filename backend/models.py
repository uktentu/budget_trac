from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, index=True)
    description = Column(String, index=True)
    amount = Column(Float)
    type = Column(String) # income, expense
    category = Column(String)
    date = Column(String)
    emoji = Column(String, nullable=True)
    user_id = Column(String, index=True)

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(String, primary_key=True, index=True)
    category = Column(String)
    limit = Column(Float)
    period = Column(String) # monthly, weekly, yearly
    user_id = Column(String, index=True)

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    type = Column(String) # income, expense
    color = Column(String)
    user_id = Column(String, index=True)
