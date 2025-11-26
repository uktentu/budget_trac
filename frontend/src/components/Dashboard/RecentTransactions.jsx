import React from 'react';
import { format } from 'date-fns';
import Card from '../ui/Card';
import { formatCurrency, cn } from '../../utils/formatters';

const RecentTransactions = ({ transactions }) => {
    return (
        <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {transactions.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">No transactions yet</p>
                ) : (
                    transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center text-lg',
                                    transaction.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'
                                )}>
                                    {transaction.emoji || (transaction.type === 'income' ? '💰' : '💸')}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {format(new Date(transaction.date), 'MMM d, yyyy')}
                                    </p>
                                </div>
                            </div>
                            <span className={cn(
                                'font-bold',
                                transaction.type === 'income' ? 'text-green-600 dark:text-green-500' : 'text-slate-900 dark:text-white'
                            )}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default RecentTransactions;
