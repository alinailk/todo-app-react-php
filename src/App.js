import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import EditTodoModal from "./components/EditTodoModal";
import TodoList from "./components/TodoList";
import Pagination from "./components/Pagination";
import AddTodoModal from "./components/AddTodoModal";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
// import FilterBar from "./components/FilterBar";


function AppContent() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const { isDarkMode } = useTheme();
  const itemsPerPage = 10; // Sayfa başı 10 adet görev listelenir.
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // get.php api dosyasına istek atar.
  const fetchTodos = () => {
    fetch("http://localhost/todo-api/api/todos/get.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else if (data && typeof data === 'object') {
          setTodos(Array.isArray(data.data) ? data.data : []);
        } else {
          setTodos([]);
        }
      })
      .catch((error) => {
        console.error("Görevler alınamadı:", error);
        setTodos([]);
      });
  };

  // To do silme onay işlemi.
  const deleteTodo = (id) => {
    setTodoToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!todoToDelete) return;

    // delete.php api dosyasına istek atar.
    fetch(`http://localhost/todo-api/api/todos/delete.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todoToDelete }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTodos((prev) => {
            const newTodos = prev.filter((todo) => todo.id !== todoToDelete);
            const remainingItemsOnCurrentPage = newTodos.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            ).length;

            if (remainingItemsOnCurrentPage === 0 && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }

            return newTodos;
          });
        } else {
          alert(data.message || "Silme işlemi başarısız oldu.");
        }
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
        alert("Bir hata oluştu.");
      })
      .finally(() => {
        setDeleteModalOpen(false);
        setTodoToDelete(null);
      });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  // .php api dosyasına istek atar.
  const completeTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost/todo-api/api/todos/updateStatus.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "completed" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("API yanıtı JSON formatında değil!");
      }

      const data = await response.json();

      if (data.success) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, status: "completed" } : todo
          )
        );
      } else {
        alert(data.message || "Tamamla işlemi başarısız oldu.");
      }
    } catch (err) {
      console.error("Tamamla hatası:", err);
      alert("Görev tamamlama işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };

  // update.php api dosyasına istek atar.
  const handleEditSubmit = async (editedTodo) => {
    try {
      const response = await fetch("http://localhost/todo-api/api/todos/update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTodo),
      });

      const data = await response.json();

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

  const handleAddTodo = () => {
    fetchTodos();
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Filtreleme işlemi
  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case 'completed':
        return todo.status === 'completed';
      case 'pending':
        return todo.status !== 'completed';
      case 'priority':
        return todo.priority === 'high';
      default:
        return true;
    }
  });

  // Sayfalama işlemi hesaplaması.
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
    setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-[#f0f2f5]'} p-6`}>
      <ThemeToggle />
      <div className="max-w-5xl mx-auto">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-lg p-8 mb-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <Header
            totalTodos={todos.length}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <Dashboard todos={todos} />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`w-full py-3 ${isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-[#4f46e5] hover:bg-[#4338ca]'} text-white rounded-xl font-medium transition-colors mb-6`}
          >
            {showAddForm ? "Görev Ekleme Formunu Kapat" : "Yeni Görev Ekle"}
          </button>

          <AddTodoModal
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onAdd={handleAddTodo}
            isDarkMode={isDarkMode}
          />

          <TodoList
            todos={filteredTodos}
            currentTodos={currentTodos}
            onDelete={deleteTodo}
            onEdit={setEditingTodo}
            onComplete={completeTodo}
            isDarkMode={isDarkMode}
            filterType={filterType}
            onFilterChange={handleFilterChange}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {editingTodo && (
          <EditTodoModal
            todo={editingTodo}
            onClose={() => setEditingTodo(null)}
            onSubmit={handleEditSubmit}
            isDarkMode={isDarkMode}
          />
        )}

        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;