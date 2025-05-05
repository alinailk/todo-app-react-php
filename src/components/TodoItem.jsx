import React from 'react';
import StatusBadge from './StatusBadge';
import PriorityIndicator from './PriorityIndicator';

const TodoItem = ({ todo }) => {
    return (
        <li className="border p-4 rounded shadow-sm">
            <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                <StatusBadge status={todo.status} />
                <PriorityIndicator priority={todo.priority} />
            </div>
            <p className="text-gray-700">{todo.description}</p>
            <p className="text-sm text-gray-500">Bitiş: {todo.due_date}</p>
        </li>
    );
};

export default TodoItem; 