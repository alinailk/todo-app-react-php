import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function AddTodoForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium");
    const { isDarkMode } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTodo = { title, description, due_date: dueDate, priority };

        try {
            const response = await fetch("http://localhost/todo-api/api/todos/create.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });

            const result = await response.json();
            // console.log("Kayıt sonucu:", result); // Debug için log

            if (result.success) {
                // Form alanlarını temizle
                setTitle("");
                setDescription("");
                setDueDate("");
                setPriority("medium"); // Görev önceliği varsayılan olarak medium olur.

                // Yeni görevi ekle ve formu kapat
                if (result.data) {
                    onAdd(result.data);
                } else {
                    onAdd();
                }
            } else {
                alert(result.message || "Görev eklenemedi.");
            }
        } catch (error) {
            console.error("Hata detayı:", error);
            alert("Sunucuya ulaşılamadı.");
            console.error("Hata:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="flex flex-col">
                <label className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Görev Başlığı</label>
                <input
                    type="text"
                    placeholder="Başlık"
                    className={`w-full p-2 border rounded ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300'
                        }`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Görev Açıklaması</label>
                <textarea
                    placeholder="Açıklama"
                    className={`w-full p-2 border rounded ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300'
                        }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bitiş Tarihi ve Saati</label>
                <input
                    type="datetime-local"
                    className={`w-full p-2 border rounded ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                        }`}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Öncelik</label>
                <select
                    className={`w-full p-2 border rounded ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                        }`}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                >
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                </select>
            </div>
            <button
                type="submit"
                className={`w-full p-2 rounded transition-colors ${isDarkMode
                    ? 'bg-blue-700 hover:bg-blue-800 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
            >
                Görev Ekle
            </button>
        </form>
    );
}

export default AddTodoForm;
