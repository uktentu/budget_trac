import React, { useMemo } from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatters';

const FinancialAdvisor = ({ transactions, budgets }) => {
    const insights = useMemo(() => {
        const tips = [];
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // 1. Analyze Spending vs Income
        const income = transactions
            .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth)
            .reduce((acc, curr) => acc + Number(curr.amount), 0);

        const expense = transactions
            .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth)
            .reduce((acc, curr) => acc + Number(curr.amount), 0);

        if (income > 0 && expense > income * 0.9) {
            tips.push({
                type: 'warning',
                icon: AlertTriangle,
                title: 'High Spending Alert',
                message: `You've spent ${Math.round((expense / income) * 100)}% of your income this month. Try to cut back on non-essential expenses.`
            });
        } else if (income > 0 && expense < income * 0.5) {
            tips.push({
                type: 'success',
                icon: TrendingUp,
                title: 'Great Savings Rate!',
                message: `You're saving more than 50% of your income. Consider investing the surplus.`
            });
        }

        // 2. Analyze Budget Adherence
        budgets.forEach(budget => {
            const spent = transactions
                .filter(t => t.type === 'expense' && t.category === budget.category)
                .reduce((acc, curr) => acc + Number(curr.amount), 0);

            if (spent > budget.limit) {
                tips.push({
                    type: 'danger',
                    icon: AlertTriangle,
                    title: 'Budget Exceeded',
                    message: `You've exceeded your ${budget.category} budget by ${formatCurrency(spent - budget.limit)}.`
                });
            } else if (spent > budget.limit * 0.8) {
                tips.push({
                    type: 'warning',
                    icon: Lightbulb,
                    title: 'Approaching Limit',
                    message: `You're at ${Math.round((spent / budget.limit) * 100)}% of your ${budget.category} budget.`
                });
            }
        });

        // 3. Generic Tip if no specific insights
        if (tips.length === 0) {
            tips.push({
                type: 'info',
                icon: Lightbulb,
                title: 'Financial Tip',
                message: "Track every expense to get better insights. Try setting up budgets for your top spending categories."
            });
        }

        return tips.slice(0, 3); // Show top 3 insights
    }, [transactions, budgets]);

    return (
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/50 border-indigo-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Smart Insights</h3>
            </div>

            <div className="space-y-3">
                {insights.map((insight, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-white/60 dark:bg-slate-900/40 rounded-xl border border-indigo-50 dark:border-slate-700/50">
                        <insight.icon className={`w-5 h-5 flex-shrink-0 ${insight.type === 'warning' ? 'text-yellow-500' :
                                insight.type === 'danger' ? 'text-red-500' :
                                    insight.type === 'success' ? 'text-green-500' : 'text-blue-500'
                            }`} />
                        <div>
                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{insight.title}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{insight.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default FinancialAdvisor;
