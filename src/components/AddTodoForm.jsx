import { useState } from "react";

function AddTodoForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTodo = { title, description, due_date: dueDate };

        try {
            const response = await fetch("http://localhost/todo-api/api/todos/create.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });

            // Gelen veriyi yakalayıp resulta atar.
            const result = await response.json();

            if (result.success) {
                onAdd(); // Yeni verileri al
                setTitle("");
                setDescription("");
                setDueDate("");
            } else {
                alert("Görev eklenemedi.");
            }
        } catch (error) {
            alert("Sunucuya ulaşılamadı.");
            console.error("Hata:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Görev Başlığı</label>
                <input
                    type="text"
                    placeholder="Başlık"
                    className="w-full p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Görev Açıklaması</label>
                <textarea
                    placeholder="Açıklama"
                    className="w-full p-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Bitiş Tarihi ve Saati</label>
                <input
                    type="datetime-local"
                    className="w-full p-2 border rounded"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Görev Ekle
            </button>
        </form>
    );
}

export default AddTodoForm;
