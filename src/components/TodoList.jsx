import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState.jsx";

const TodoList = ({ todos, currentTodos, onDelete, onEdit, onComplete, isDarkMode }) => {

    // Görev listesinin boş olup olmadığının kontrolü.
    if (todos.length === 0) {
        return <EmptyState isDarkMode={isDarkMode} />;
    }

    return (
        <>
            <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>Kayıtlı Görev Listesi</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {currentTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onComplete={onComplete}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>
        </>
    );
};

export default TodoList;
