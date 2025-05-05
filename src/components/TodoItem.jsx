import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <li className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{todo.title}</h2>
            <p className="text-gray-700">{todo.description}</p>
            <p className="text-sm text-gray-500">Bitiş: {todo.due_date}</p>
        </li>
    );
};

export default TodoItem; 