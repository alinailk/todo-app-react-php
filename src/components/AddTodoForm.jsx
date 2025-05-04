import { useState } from "react";

function AddTodoForm({ onTodoAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost/todo-api/api/todos/create.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                description,
                due_date: dueDate,
                status: "pending",
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    onTodoAdded(); // Listeyi yeniler.
                    setTitle("");
                    setDescription("");
                    setDueDate("");
                } else {
                    alert("Görev eklenemedi!");
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <input
                type="text"
                placeholder="Görev Başlığı"
                className="w-full p-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Açıklama"
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <input
                type="date"
                className="w-full p-2 border rounded"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Görev Ekle
            </button>
        </form>
    );
}

export default AddTodoForm;
