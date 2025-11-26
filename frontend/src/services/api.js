import { auth } from '../firebase';

const API_URL = 'http://localhost:8000';

const getHeaders = async () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const api = {
    // Transactions
    getTransactions: async () => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/transactions/`, { headers });
        if (!response.ok) throw new Error('Failed to fetch transactions');
        return response.json();
    },

    createTransaction: async (transaction) => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/transactions/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(transaction),
        });
        if (!response.ok) throw new Error('Failed to create transaction');
        return response.json();
    },

    deleteTransaction: async (id) => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/transactions/${id}`, {
            method: 'DELETE',
            headers,
        });
        if (!response.ok) throw new Error('Failed to delete transaction');
        return response.json();
    },

    updateTransaction: async (id, transaction) => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/transactions/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(transaction),
        });
        if (!response.ok) throw new Error('Failed to update transaction');
        return response.json();
    },

    // Budgets
    getBudgets: async () => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/budgets/`, { headers });
        if (!response.ok) throw new Error('Failed to fetch budgets');
        return response.json();
    },

    createBudget: async (budget) => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/budgets/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(budget),
        });
        if (!response.ok) throw new Error('Failed to create budget');
        return response.json();
    },

    // Categories
    getCategories: async () => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}/categories/`, { headers });
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },
};
