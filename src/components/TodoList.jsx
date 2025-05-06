import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState.jsx";
import FilterBar from "./FilterBar";

const TodoList = ({ todos, currentTodos, onDelete, onEdit, onComplete, isDarkMode, filterType, onFilterChange }) => {

    // Görev listesinin boş olup olmadığının kontrolü.
    if (todos.length === 0) {
        return <EmptyState isDarkMode={isDarkMode} />;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className={`text-2xl font-bold text-center md:text-left ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    Kayıtlı Görev Listesi
                </h2>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} flex items-center`}>Görev Durumu:</span>
                    <div className="w-48">
                        <FilterBar
                            filterType={filterType}
                            onFilterChange={onFilterChange}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                </div>
            </div>
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
