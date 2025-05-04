import { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost/todo-api/api/todos/get.php")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
          Görev Listesi
        </h1>

        <AddTodoForm onTodoAdded={fetchTodos} />

        {todos.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">Henüz görev yok</p>
        ) : (
          <ul className="space-y-4 mt-4">
            {todos.map((todo) => (
              <li key={todo.id} className="border p-4 rounded shadow-sm">
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                <p className="text-gray-700">{todo.description}</p>
                <p className="text-sm text-gray-500">Bitiş: {todo.due_date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
