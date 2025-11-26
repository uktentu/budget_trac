from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import firebase_admin
from firebase_admin import auth, credentials
from . import crud, models, schemas
from .database import SessionLocal, engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase Admin
# NOTE: In a real production app, you would provide the path to your serviceAccountKey.json
# or use environment variables. For this hackathon demo, we'll try to initialize with default
# credentials or warn the user.
try:
    # Check if app is already initialized to avoid error on reload
    if not firebase_admin._apps:
        # REPLACE 'path/to/serviceAccountKey.json' with your actual file path
        # or use credentials.Certificate(dict(os.environ))
        # cred = credentials.Certificate("path/to/serviceAccountKey.json")
        # firebase_admin.initialize_app(cred)
        
        # For demo purposes without key, we might mock or expect Application Default Credentials
        firebase_admin.initialize_app()
except Exception as e:
    print(f"Warning: Firebase Admin initialization failed: {e}")

async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        # For development/demo without real Firebase setup, you might want to bypass this
        # raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        # MOCK USER for testing if no token provided (REMOVE FOR PRODUCTION)
        return "test_user_id" 
        
    token = authorization.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token["uid"]
    except Exception as e:
        print(f"Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid authentication token")

# Transactions
@app.get("/transactions/", response_model=List[schemas.Transaction])
def read_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    return crud.get_transactions(db, user_id=user_id, skip=skip, limit=limit)

@app.post("/transactions/", response_model=schemas.Transaction)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    return crud.create_transaction(db=db, transaction=transaction, user_id=user_id)

@app.delete("/transactions/{transaction_id}", response_model=schemas.Transaction)
def delete_transaction(transaction_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    db_transaction = crud.delete_transaction(db, transaction_id=transaction_id, user_id=user_id)
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

@app.put("/transactions/{transaction_id}", response_model=schemas.Transaction)
def update_transaction(transaction_id: str, transaction: schemas.TransactionCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    db_transaction = crud.update_transaction(db, transaction_id=transaction_id, transaction=transaction, user_id=user_id)
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

# Budgets
@app.get("/budgets/", response_model=List[schemas.Budget])
def read_budgets(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    return crud.get_budgets(db, user_id=user_id)

@app.post("/budgets/", response_model=schemas.Budget)
def create_budget(budget: schemas.BudgetCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    return crud.create_budget(db=db, budget=budget, user_id=user_id)

# Categories
@app.get("/categories/", response_model=List[schemas.Category])
def read_categories(db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    categories = crud.get_categories(db, user_id=user_id)
    if not categories:
        crud.initialize_categories(db, user_id=user_id)
        categories = crud.get_categories(db, user_id=user_id)
    return categories

@app.post("/categories/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)):
    return crud.create_category(db=db, category=category, user_id=user_id)
