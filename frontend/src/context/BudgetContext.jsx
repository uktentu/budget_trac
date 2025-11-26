import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'USD');

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [transactionsData, budgetsData, categoriesData] = await Promise.all([
                api.getTransactions(),
                api.getBudgets(),
                api.getCategories(),
            ]);
            setTransactions(transactionsData);
            setBudgets(budgetsData);
            setCategories(categoriesData);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addTransaction = async (transaction) => {
        try {
            const newTransaction = await api.createTransaction(transaction);
            setTransactions((prev) => [newTransaction, ...prev]);
        } catch (err) {
            console.error("Error adding transaction:", err);
            // Optionally set error state or show notification
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await api.deleteTransaction(id);
            setTransactions((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Error deleting transaction:", err);
        }
    };

    const updateTransaction = async (id, updatedTransaction) => {
        try {
            const result = await api.updateTransaction(id, updatedTransaction);
            setTransactions((prev) => prev.map((t) => (t.id === id ? result : t)));
        } catch (err) {
            console.error("Error updating transaction:", err);
        }
    };

    const addBudget = async (budget) => {
        try {
            const newBudget = await api.createBudget(budget);
            setBudgets((prev) => [...prev, newBudget]);
        } catch (err) {
            console.error("Error adding budget:", err);
        }
    };

    return (
        <BudgetContext.Provider value={{
            transactions,
            addTransaction,
            deleteTransaction,
            updateTransaction,
            budgets,
            addBudget,
            categories,
            loading,
            error,
            currency,
            setCurrency
        }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => useContext(BudgetContext);
