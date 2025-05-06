import { useState } from 'react';

function EditTodoModal({ todo, onClose, onSubmit }) {
    const [editedTodo, setEditedTodo] = useState(todo);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedTodo);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-[#1a1a1a]">Görevi Düzenle</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-[#666] mb-1">Görev Başlığı</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                            value={editedTodo.title}
                            onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-[#666] mb-1">Görev Açıklaması</label>
                        <textarea
                            className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                            value={editedTodo.description}
                            onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                            rows="4"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-[#666] mb-1">Bitiş Tarihi</label>
                        <input
                            type="date"
                            className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                            value={editedTodo.due_date}
                            onChange={(e) => setEditedTodo({ ...editedTodo, due_date: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-[#666] mb-1">Öncelik</label>
                        <select
                            className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                            value={editedTodo.priority}
                            onChange={(e) => setEditedTodo({ ...editedTodo, priority: e.target.value })}
                        >
                            <option value="low">Düşük</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksek</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#4f46e5] text-white rounded-xl hover:bg-[#4338ca]"
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