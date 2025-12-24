# BudgetTrac 💰

**BudgetTrac** is a modern, full-stack personal finance management application designed to help you take control of your finances. Track expenses, set budgets, analyze spending patterns, and make informed financial decisions with an intuitive and beautiful user interface.

## 📋 About

BudgetTrac is a comprehensive budget tracking solution that combines the power of a React-based frontend with a robust Python FastAPI backend. Built with modern web technologies, it offers a seamless experience for managing personal finances, from daily transactions to long-term budget planning.

### Key Features

- **💳 Transaction Management**: Record and categorize income and expenses with custom categories and emojis
- **📊 Budget Planning**: Set spending limits by category with weekly, monthly, or yearly periods
- **📈 Analytics Dashboard**: Visualize spending patterns with interactive charts and insights
- **🔐 Secure Authentication**: Firebase-powered user authentication with secure session management
- **🎨 Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **🌓 Dark Mode Support**: Comfortable viewing in any lighting condition
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💡 Financial Insights**: AI-powered financial advisor provides personalized recommendations
- **⚡ Real-time Updates**: Instant synchronization of data across all features
- **🎯 Category Management**: Organize transactions with customizable categories and color coding

## 🏗️ Technology Stack

### Frontend
- **React 19**: Latest React for building the user interface
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router**: Client-side routing for seamless navigation
- **Recharts**: Beautiful and composable charts for data visualization
- **Framer Motion**: Smooth animations and transitions
- **Firebase SDK**: Authentication and user management
- **Lucide React**: Modern icon library
- **date-fns**: Modern date utility library

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM for database operations
- **SQLite**: Lightweight, file-based database
- **Firebase Admin SDK**: Server-side Firebase authentication verification
- **Python 3**: Core backend programming language

## 📁 Project Structure

The project is organized into two main directories:

- **`frontend/`**: Contains the React application (Vite, Tailwind CSS, React components)
- **`backend/`**: Contains the Python FastAPI backend, database models, and API endpoints

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) and npm
- **Python** (v3.8 or higher)
- **Git** for version control

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
    The application will be available at `http://localhost:5173`

### Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  (Recommended) Create and activate a virtual environment:
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
    The API will be available at `http://localhost:8000`

### Firebase Setup (Optional for Authentication)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Add your Firebase configuration to `frontend/src/firebase.js`
4. Download service account key and configure Firebase Admin in the backend

## 📖 Usage

Once both frontend and backend servers are running:

1. **Register**: Create a new account or use the demo mode
2. **Add Transactions**: Record your income and expenses with categories
3. **Set Budgets**: Define spending limits for different categories
4. **View Dashboard**: See your financial overview and recent activity
5. **Analyze**: Explore spending patterns in the Analytics section
6. **Customize**: Manage categories and preferences in Settings

## 🚀 Deployment

### Frontend (GitHub Pages)
The frontend is automatically deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch in the `frontend/` directory. The application is accessible at the configured GitHub Pages URL.

**Deployment Steps:**
1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys the frontend
3. Access the application via GitHub Pages URL

### Backend
The backend includes a CI workflow that runs linting checks on every push to `backend/`. For production deployment:

**Recommended Platforms:**
- **Render**: Deploy directly from GitHub with automatic HTTPS
- **Railway**: Simple deployment with database support
- **Heroku**: Classic PaaS with add-ons ecosystem
- **DigitalOcean App Platform**: Managed deployment with scalability
- **AWS/GCP/Azure**: Full control with cloud provider services

**Deployment Considerations:**
- Configure environment variables for Firebase credentials
- Set up production database (PostgreSQL recommended)
- Configure CORS origins for your production frontend URL
- Use production-grade WSGI server (Gunicorn, Uvicorn with workers)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📝 License

This project is open source and available for educational and personal use.

## 👤 Author

**uktentu**
- GitHub: [@uktentu](https://github.com/uktentu)

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the need for simple, effective personal finance management
- Thanks to all contributors and open-source projects that made this possible

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Refer to the documentation in the code

---

**Made with ❤️ for better financial management**
