import React from 'react';
import { cn } from '../../utils/formatters';

const Input = React.forwardRef(({ className, type = 'text', label, error, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    'w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all',
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
