import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import { formatCurrency, cn } from '../../utils/formatters';

const SummaryCard = ({ title, amount, type = 'neutral', trend }) => {
    const icons = {
        income: ArrowUpRight,
        expense: ArrowDownRight,
        neutral: DollarSign,
    };

    const colors = {
        income: 'text-green-500 bg-green-50 dark:bg-green-900/20',
        expense: 'text-red-500 bg-red-50 dark:bg-red-900/20',
        neutral: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    };

    const Icon = icons[type];

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <div className={cn('p-3 rounded-xl', colors[type])}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <span className={cn('text-sm font-medium', trend > 0 ? 'text-green-500' : 'text-red-500')}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {formatCurrency(amount)}
                </h3>
            </div>
        </Card>
    );
};

export default SummaryCard;
