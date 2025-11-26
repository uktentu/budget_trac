import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useBudget } from '../context/BudgetContext';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/formatters';

const Analytics = () => {
    const { transactions, categories } = useBudget();

    const categoryData = useMemo(() => {
        const expenseTransactions = transactions.filter(t => t.type === 'expense');
        const data = {};

        expenseTransactions.forEach(t => {
            if (data[t.category]) {
                data[t.category] += Number(t.amount);
            } else {
                data[t.category] = Number(t.amount);
            }
        });

        return Object.keys(data).map(category => ({
            name: category,
            value: data[category],
            color: categories.find(c => c.name === category)?.color || '#cbd5e1'
        }));
    }, [transactions, categories]);

    const monthlyData = useMemo(() => {
        // Group by month (simplified for last 6 months)
        const data = {};
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        transactions.forEach(t => {
            const date = new Date(t.date);
            const month = months[date.getMonth()];
            if (!data[month]) {
                data[month] = { name: month, income: 0, expense: 0 };
            }
            if (t.type === 'income') {
                data[month].income += Number(t.amount);
            } else {
                data[month].expense += Number(t.amount);
            }
        });

        return Object.values(data);
    }, [transactions]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400">Deep dive into your financial data.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Expenses by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="h-[400px]">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Income vs Expenses</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
