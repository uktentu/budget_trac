import React, { useMemo } from 'react';
import { useBudget } from '../context/BudgetContext';
import SummaryCard from '../components/Dashboard/SummaryCard';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import SpendingChart from '../components/Dashboard/SpendingChart';
import FinancialAdvisor from '../components/Dashboard/FinancialAdvisor';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { transactions, budgets } = useBudget();

    const financials = useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);

        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + Number(curr.amount), 0);

        return {
            income,
            expense,
            balance: income - expense
        };
    }, [transactions]);

    const chartData = useMemo(() => {
        // Generate last 7 days data
        const end = new Date();
        const start = subDays(end, 6);
        const days = eachDayOfInterval({ start, end });

        return days.map(day => {
            const dayTransactions = transactions.filter(t =>
                t.type === 'expense' && isSameDay(new Date(t.date), day)
            );

            const amount = dayTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0);

            return {
                date: format(day, 'MMM dd'),
                amount
            };
        });
    }, [transactions]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400">Welcome back, here's your financial overview.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30">
                    + Add Transaction
                </button>
            </div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={item}>
                <SummaryCard
                    title="Total Balance"
                    amount={financials.balance}
                    type="neutral"
                    trend={2.5}
                />
                <SummaryCard
                    title="Total Income"
                    amount={financials.income}
                    type="income"
                    trend={5.2}
                />
                <SummaryCard
                    title="Total Expenses"
                    amount={financials.expense}
                    type="expense"
                    trend={-1.8}
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div className="lg:col-span-2 space-y-6" variants={item}>
                    <SpendingChart data={chartData} />
                    <FinancialAdvisor transactions={transactions} budgets={budgets} />
                </motion.div>
                <motion.div variants={item}>
                    <RecentTransactions transactions={transactions} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
