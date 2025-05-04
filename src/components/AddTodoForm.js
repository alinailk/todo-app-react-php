import { useState } from "react";

function AddTodoForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const todoData = {
            title,
            description,
            due_date: dueDate,
            priority
        };

        try {
            const response = await fetch("http://localhost/todo-api/api/todos/create.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todoData),
            });

            const data = await response.json();

            if (data.success) {
                setTitle("");
                setDescription("");
                setDueDate("");
                setPriority("medium");
                onAdd();
            } else {
                alert(data.message || "Bir hata oluştu.");
            }
        } catch (error) {
            console.error("Görev ekleme hatası:", error);
            alert("Bir hata oluştu.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-[#666] mb-1">Görev Başlığı</label>
                <input
                    type="text"
                    className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-[#666] mb-1">Görev Açıklaması</label>
                <textarea
                    className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-[#666] mb-1">Bitiş Tarihi ve Saati</label>
                <input
                    type="datetime-local"
                    className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-[#666] mb-1">Öncelik</label>
                <select
                    className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Düşük</option>
                    <option value="medium">Orta</option>
                    <option value="high">Yüksek</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-[#4f46e5] text-white rounded-xl hover:bg-[#4338ca] font-medium transition-colors"
            >
                Görev Ekle
            </button>
        </form>
    );
}

export default AddTodoForm; 