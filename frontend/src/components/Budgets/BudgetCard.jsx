import React from 'react';
import Card from '../ui/Card';
import { formatCurrency, cn } from '../../utils/formatters';

const BudgetCard = ({ budget, spent }) => {
    const percentage = Math.min((spent / budget.limit) * 100, 100);
    const isOverBudget = spent > budget.limit;

    return (
        <Card>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 dark:text-white">{budget.category}</h3>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                    {budget.period}
                </span>
            </div>

            <div className="flex items-end justify-between mb-4">
                <div>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(spent)}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                        of {formatCurrency(budget.limit)}
                    </span>
                </div>
                <span className={cn(
                    "text-sm font-medium",
                    isOverBudget ? "text-red-500" : "text-slate-500 dark:text-slate-400"
                )}>
                    {Math.round(percentage)}%
                </span>
            </div>

            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isOverBudget ? "bg-red-500" : percentage > 80 ? "bg-yellow-500" : "bg-blue-500"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {isOverBudget && (
                <p className="mt-2 text-xs text-red-500 font-medium">
                    You've exceeded your budget by {formatCurrency(spent - budget.limit)}
                </p>
            )}
        </Card>
    );
};

export default BudgetCard;
