import React from 'react';
import { cn } from '../../utils/formatters';

const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                'bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6',
                'backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80', // Glassmorphism effect
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
