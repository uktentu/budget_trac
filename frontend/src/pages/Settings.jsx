import React, { useRef } from 'react';
import { Download, Upload, Trash2, Moon, Sun, Monitor, User, CreditCard, Bell, Shield, ChevronRight } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings = () => {
    const { transactions, budgets, categories, currency, setCurrency } = useBudget();
    const { theme, setTheme } = useTheme();
    const { currentUser } = useAuth();
    const fileInputRef = useRef(null);

    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    ];

    const handleExport = () => {
        const data = {
            transactions,
            budgets,
            categories,
            exportDate: new Date().toISOString(),
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `budget_trac_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.transactions && data.budgets && data.categories) {
                    if (window.confirm('This will overwrite your current data. Are you sure?')) {
                        // We need to expose setters in context to do this properly, 
                        // but for now we can't easily replace all state without reloading or exposing setters.
                        // Let's assume we reload the page or use local storage directly.
                        localStorage.setItem('transactions', JSON.stringify(data.transactions));
                        localStorage.setItem('budgets', JSON.stringify(data.budgets));
                        localStorage.setItem('categories', JSON.stringify(data.categories));
                        window.location.reload();
                    }
                } else {
                    alert('Invalid backup file format.');
                }
            } catch (error) {
                alert('Error reading file.');
            }
        };
        reader.readAsText(file);
    };

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to delete ALL data? This cannot be undone.')) {
            localStorage.removeItem('transactions');
            localStorage.removeItem('budgets');
            // We might want to keep categories or reset to default
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your profile and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Section */}
                <Card className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                            <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                {currentUser?.email?.split('@')[0] || 'User'}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">{currentUser?.email || 'user@example.com'}</p>
                        </div>
                        <Button variant="outline" className="ml-auto">Edit Profile</Button>
                    </div>
                </Card>

                {/* Preferences */}
                <Card>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary-500" />
                        Preferences
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            >
                                {currencies.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.symbol} - {c.name} ({c.code})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Notifications</p>
                                <p className="text-sm text-slate-500">Receive alerts for budget limits</p>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-slate-200 dark:bg-slate-700">
                                <input type="checkbox" className="absolute w-6 h-6 opacity-0 cursor-pointer" />
                                <span className="absolute left-0 inline-block w-6 h-6 bg-white border border-slate-200 rounded-full shadow transform transition-transform duration-200 ease-in-out translate-x-0"></span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Appearance */}
                <Card>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-secondary-500" />
                        Appearance
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setTheme('light')}
                            className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light'
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <Sun className="w-8 h-8" />
                            <span className="font-medium">Light</span>
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark'
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <Moon className="w-8 h-8" />
                            <span className="font-medium">Dark</span>
                        </button>
                    </div>
                </Card>

                {/* Data Management */}
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-slate-500" />
                        Data Management
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={handleExport}
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Download className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-slate-900 dark:text-white">Export Data</p>
                                    <p className="text-xs text-slate-500">Download JSON backup</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        </button>

                        <div className="relative">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImport}
                                accept=".json"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <Upload className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-slate-900 dark:text-white">Import Data</p>
                                        <p className="text-xs text-slate-500">Restore from backup</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <button
                            onClick={handleClearData}
                            className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-red-600 dark:text-red-400">Clear All Data</p>
                                    <p className="text-xs text-red-500/80">Permanently delete</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-red-400" />
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
