import React, { useState, useEffect } from 'react';
import { useBudget } from '../../context/BudgetContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const TransactionForm = ({ transactionToEdit, onClose }) => {
    const { addTransaction, updateTransaction, categories } = useBudget();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (transactionToEdit) {
            setFormData({
                ...transactionToEdit,
                date: new Date(transactionToEdit.date).toISOString().split('T')[0],
            });
        }
    }, [transactionToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            ...formData,
            amount: parseFloat(formData.amount),
        };

        if (transactionToEdit) {
            updateTransaction(transactionToEdit.id, transactionData);
        } else {
            addTransaction(transactionData);
        }

        onClose();
    };

    const filteredCategories = categories.filter(c => c.type === formData.type);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.type === 'expense'
                            ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                        }`}
                    onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                >
                    Expense
                </button>
                <button
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.type === 'income'
                            ? 'bg-white dark:bg-slate-700 text-green-600 shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                        }`}
                    onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                >
                    Income
                </button>
            </div>

            <Input
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g. Grocery Shopping"
                required
            />

            <Input
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
            />

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                </label>
                <select
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                >
                    <option value="">Select a category</option>
                    {filteredCategories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
            />

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">
                    {transactionToEdit ? 'Save Changes' : 'Add Transaction'}
                </Button>
            </div>
        </form>
    );
};

export default TransactionForm;
