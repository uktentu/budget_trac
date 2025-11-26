import React from 'react';
import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Header = ({ onMenuClick }) => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 lg:hidden">
                    BudgetTrac
                </h2>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 ml-2" />
            </div>
        </header>
    );
};

export default Header;
