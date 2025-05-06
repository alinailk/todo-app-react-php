import React from "react";

export default function Dashboard({ todos }) {

    // todos düzgün bir dizi değilse, sayfada Veri yükleniyor... yazısı gösterilir.
    if (!Array.isArray(todos)) return <div>Veri yükleniyor...</div>;

    // Tamamlanan görev sayısı.
    const completedCount = todos.filter((todo) => todo.status === "completed").length;

    // Bekleyen görev sayısı.
    const pendingCount = todos.filter((todo) => todo.status === "pending").length;

    // Yüksek öncelikli görev sayısı.
    const highPriorityCount = todos.filter((todo) => todo.priority === "high").length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 text-green-800 p-4 rounded-2xl shadow">
                <h3 className="font-semibold">Tamamlanan Görevler</h3>
                <p className="text-2xl">{completedCount}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-2xl shadow">
                <h3 className="font-semibold">Bekleyen Görevler</h3>
                <p className="text-2xl">{pendingCount}</p>
            </div>
            <div className="bg-red-100 text-red-800 p-4 rounded-2xl shadow">
                <h3 className="font-semibold">Öncelikli Görevler</h3>
                <p className="text-2xl">{highPriorityCount}</p>
            </div>
        </div>
    );
}
