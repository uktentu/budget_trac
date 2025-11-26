# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
{{ ... }}
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## BudgetTrac

A comprehensive budget tracking application with a React frontend and Python (FastAPI) backend.

## Project Structure

The project is organized into two main directories:

- **`frontend/`**: Contains the React application (Vite, Tailwind CSS).
- **`backend/`**: Contains the Python FastAPI backend and database.

## Getting Started

### Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

### Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  (Optional) Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```

## Deployment

### Frontend (GitHub Pages)
The frontend is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch in the `frontend/` directory.

### Backend
The backend includes a CI workflow that runs linting checks on every push to `backend/`. For production deployment, you can deploy the `backend/` directory to a service like Render, Railway, or Heroku.
recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
