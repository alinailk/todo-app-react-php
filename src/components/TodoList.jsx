import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost/todo-api/api/todos/get.php")
            .then((res) => res.json())
            .then((data) => setTodos(data));
    }, []);

    if (todos.length === 0) {
        // Todo yoksa listeleme işlemi yapılmaz.
        return <p className="text-center text-gray-500">Henüz görev yok!</p>;
    }
    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;
