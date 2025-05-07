import { useState } from 'react';

function EditTodoModal({ todo, onClose, onSubmit, isDarkMode }) {
    const [editedTodo, setEditedTodo] = useState(todo);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedTodo);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50
            transition-opacity duration-300 ease-in-out
            animate-fadeIn">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} 
                rounded-3xl p-8 w-full max-w-md shadow-2xl border
                transition-all duration-300 ease-in-out
                transform scale-100
                animate-modalIn`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'} 
                    transition-colors duration-300`}>Görevi Düzenle</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col animate-fadeIn" style={{ animationDelay: '100ms' }}>
                        <label className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-[#666]'} 
                            transition-colors duration-300`}>Görev Başlığı</label>
                        <input
                            type="text"
                            className={`w-full p-3 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-[#f8f9fa] text-[#1a1a1a]'} 
                                border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]
                                transition-all duration-300 ease-in-out
                                transform hover:scale-[1.02]`}
                            value={editedTodo.title}
                            onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex flex-col animate-fadeIn" style={{ animationDelay: '200ms' }}>
                        <label className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-[#666]'} 
                            transition-colors duration-300`}>Görev Açıklaması</label>
                        <textarea
                            className={`w-full p-3 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-[#f8f9fa] text-[#1a1a1a]'} 
                                border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]
                                transition-all duration-300 ease-in-out
                                transform hover:scale-[1.02]`}
                            value={editedTodo.description}
                            onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                            rows="4"
                        />
                    </div>
                    <div className="flex flex-col animate-fadeIn" style={{ animationDelay: '300ms' }}>
                        <label className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-[#666]'} 
                            transition-colors duration-300`}>Bitiş Tarihi</label>
                        <input
                            type="date"
                            className={`w-full p-3 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-[#f8f9fa] text-[#1a1a1a]'} 
                                border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]
                                transition-all duration-300 ease-in-out
                                transform hover:scale-[1.02]`}
                            value={editedTodo.due_date}
                            onChange={(e) => setEditedTodo({ ...editedTodo, due_date: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col animate-fadeIn" style={{ animationDelay: '400ms' }}>
                        <label className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-[#666]'} 
                            transition-colors duration-300`}>Öncelik</label>
                        <select
                            className={`w-full p-3 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-[#f8f9fa] text-[#1a1a1a]'} 
                                border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]
                                transition-all duration-300 ease-in-out
                                transform hover:scale-[1.02]`}
                            value={editedTodo.priority}
                            onChange={(e) => setEditedTodo({ ...editedTodo, priority: e.target.value })}
                        >
                            <option value="low">Düşük</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksek</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6 animate-fadeIn" style={{ animationDelay: '500ms' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} 
                                transition-all duration-300 ease-in-out
                                transform hover:scale-105`}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#4f46e5] text-white rounded-xl 
                                hover:bg-[#4338ca] transition-all duration-300 ease-in-out
                                transform hover:scale-105"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTodoModal; 