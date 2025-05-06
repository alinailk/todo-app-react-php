import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityIndicator from './PriorityIndicator';

const TodoItem = ({ todo, onDelete, onEdit, onComplete, isDarkMode }) => {
    return (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-lg p-6 border hover:shadow-xl transition-all`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className={`text-xl font-semibold ${todo.status === "completed" ? "line-through text-[#10b981]" : isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}>
                            {todo.title}
                        </h2>
                        <PriorityIndicator priority={todo.priority} />
                        <StatusBadge status={todo.status} />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(todo)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#f8f9fa]'} transition-colors`}
                        title="Görevi Düzenle"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(todo.id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#f8f9fa]'} transition-colors`}
                        title="Görevi Sil"
                    >
                        ❌
                    </button>
                </div>
            </div>

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-[#666]'} mb-4`}>{todo.description}</p>

            <div className="flex items-center justify-between">
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-[#666]'}`}>
                    <span className="font-medium">Bitiş Tarih/Saat: </span>
                    {new Date(todo.due_date).toLocaleString('tr-TR')}
                </p>
                <button
                    onClick={() => onComplete(todo.id)}
                    disabled={todo.status === "completed"}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${todo.status === "completed"
                        ? isDarkMode
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-[#f8f9fa] text-[#666] cursor-not-allowed"
                        : "bg-[#10b981] hover:bg-[#059669] text-white"
                        }`}
                >
                    {todo.status === "completed" ? "Tamamlandı" : "Tamamla"}
                </button>
            </div>
        </div>
    );
};

export default TodoItem; 