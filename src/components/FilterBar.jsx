import React from 'react';

const FilterBar = ({ filterType, onFilterChange, isDarkMode }) => {
    return (
        <div className="mb-0">
            <select
                value={filterType}
                onChange={(e) => onFilterChange(e.target.value)}
                className={`w-full p-2 rounded-xl border ${isDarkMode
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-gray-800 border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
                <option value="all">Tüm Görevler</option>
                <option value="completed">Tamamlanan Görevler</option>
                <option value="pending">Bekleyen Görevler</option>
                <option value="priority">Öncelikli Görevler</option>
            </select>
        </div>
    );
};

export default FilterBar; 