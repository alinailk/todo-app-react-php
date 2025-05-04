import { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // Düzenleme state'i başlangıçta boş değer tutar.

  // get.php api ile todolara erişim.
  const fetchTodos = () => {
    fetch("http://localhost/todo-api/api/todos/get.php")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  // Todo silme işlemi.
  const deleteTodo = (id) => {
    if (!window.confirm("Bu görevi silmek istediğinizden emin misiniz?")) return;

    fetch(`http://localhost/todo-api/api/todos/delete.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } else {
          alert(data.message || "Silme işlemi başarısız oldu.");
        }
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
        alert("Bir hata oluştu.");
      });
  };

  // Todoları tamamlandı işaretleme işlemi için.
  const completeTodo = (id) => {
    fetch(`http://localhost/todo-api/api/todos/updateStatus.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "completed" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchTodos();
        } else {
          alert(data.message || "Tamamla işlemi başarısız oldu.");
        }
      })
      .catch((err) => {
        console.error("Tamamla hatası:", err);
        alert("Bir hata oluştu.");
      });
  };

  const editTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      id: editingTodo.id,
      title: editingTodo.title,
      description: editingTodo.description,
      due_date: editingTodo.due_date,
      status: editingTodo.status || 'pending'
    };

    // console.log("Gönderilen veri:", updateData);

    try {
      const response = await fetch("http://localhost/todo-api/api/todos/update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log("API Response:", response);
      const data = await response.json();
      console.log("API Data:", data);

      if (data.success) {
        fetchTodos();
        setEditingTodo(null);
      } else {
        alert(data.error || "Güncelleme işlemi başarısız oldu.");
      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      alert("Bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a]">
                Görev Listesi
              </h1>
              <p className="text-[#666] mt-2">
                {todos.length} adet görev listelendi
              </p>
            </div>
            <div className="w-16 h-16 bg-[#4f46e5] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {todos.length}
            </div>
          </div>

          <AddTodoForm onAdd={fetchTodos} />
        </div>

        {editingTodo && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-[#1a1a1a]">Görevi Düzenle</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#666] mb-1">Görev Başlığı</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#666] mb-1">Görev Açıklaması</label>
                  <textarea
                    className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                    value={editingTodo.description}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#666] mb-1">Bitiş Tarihi ve Saati</label>
                  <input
                    type="datetime-local"
                    className="w-full p-3 bg-[#f8f9fa] border-0 rounded-xl focus:ring-2 focus:ring-[#4f46e5]"
                    value={editingTodo.due_date}
                    onChange={(e) => setEditingTodo({ ...editingTodo, due_date: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditingTodo(null)}
                    className="px-6 py-2.5 text-[#666] hover:text-[#1a1a1a] font-medium"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#4f46e5] text-white rounded-xl hover:bg-[#4338ca] font-medium transition-colors"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {todos.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-[#f8f9fa] rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">📝</span>
            </div>
            <p className="text-[#1a1a1a] text-lg font-medium">Henüz görev yok</p>
            <p className="text-[#666] mt-2">Yeni bir görev ekleyerek başlayın</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className={`text-xl font-semibold ${todo.status === "completed" ? "line-through text-[#10b981]" : "text-[#1a1a1a]"
                    }`}>
                    {todo.title}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editTodo(todo)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f8f9fa] transition-colors"
                      title="Görevi Düzenle"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f8f9fa] transition-colors"
                      title="Görevi Sil"
                    >
                      ❌
                    </button>
                  </div>
                </div>

                <p className="text-[#666] mb-4">{todo.description}</p>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#666]">
                    {new Date(todo.due_date).toLocaleString('tr-TR')}
                  </p>
                  <button
                    onClick={() => completeTodo(todo.id)}
                    disabled={todo.status === "completed"}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${todo.status === "completed"
                      ? "bg-[#f8f9fa] text-[#666] cursor-not-allowed"
                      : "bg-[#10b981] hover:bg-[#059669] text-white"
                      }`}
                  >
                    {todo.status === "completed" ? "Tamamlandı" : "Tamamla"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
