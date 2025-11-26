import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const BudgetForm = ({ onClose }) => {
    const { addBudget, categories } = useBudget();
    const [formData, setFormData] = useState({
        category: '',
        limit: '',
        period: 'monthly',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addBudget({
            ...formData,
            limit: parseFloat(formData.limit),
        });
        onClose();
    };

    const expenseCategories = categories.filter(c => c.type === 'expense');

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                    {expenseCategories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Budget Limit"
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
            />

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Period
                </label>
                <select
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">
                    Set Budget
                </Button>
            </div>
        </form>
    );
};

export default BudgetForm;
