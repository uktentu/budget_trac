import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import BudgetForm from '../components/Budgets/BudgetForm';
import BudgetCard from '../components/Budgets/BudgetCard';

const Budgets = () => {
    const { budgets, transactions } = useBudget();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate spent amount for each budget category
    // NOTE: This is a simplified calculation. Ideally we should filter by period (month/week)
    const getSpentAmount = (category) => {
        return transactions
            .filter(t => t.type === 'expense' && t.category === category)
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Budgets</h1>
                    <p className="text-slate-500 dark:text-slate-400">Track your spending limits.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Set New Budget
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgets.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed">
                        <p className="text-slate-500 dark:text-slate-400 mb-4">You haven't set any budgets yet.</p>
                        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                            Create your first budget
                        </Button>
                    </div>
                ) : (
                    budgets.map((budget) => (
                        <BudgetCard
                            key={budget.id}
                            budget={budget}
                            spent={getSpentAmount(budget.category)}
                        />
                    ))
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Set New Budget"
            >
                <BudgetForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Budgets;
