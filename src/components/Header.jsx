import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ totalTodos, currentPage, totalPages }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className="flex items-center justify-between mb-8">
            <div className="w-full flex flex-col items-center">
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'} ml-16`}>
                    Todo Uygulaması
                </h1>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-[#666]'} mt-2 ml-16`}>
                    Toplam {totalTodos} görev, Sayfa {currentPage}/{totalPages || 1}
                </p>
            </div>
            <div className={`w-16 h-16 ${isDarkMode ? 'bg-blue-700' : 'bg-[#4f46e5]'} rounded-2xl flex items-center justify-center text-white text-2xl font-bold`}>
                {totalTodos}
            </div>
        </div>
    );
};

export default Header; 