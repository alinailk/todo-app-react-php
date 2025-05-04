import { useEffect, useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost/todo-api/api/todos/get.php")
            .then((res) => res.json())
            .then((data) => setTodos(data));
    }, []);

    if (todos.length === 0) {
        return <p className="text-center text-gray-500">Henüz görev yok!</p>;
    }

    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <li key={todo.id} className="border p-4 rounded shadow-sm">
                    <h2 className="text-xl font-semibold">{todo.title}</h2>
                    <p className="text-gray-700">{todo.description}</p>
                    <p className="text-sm text-gray-500">Bitiş: {todo.due_date}</p>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
