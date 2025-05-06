import TodoItem from "./TodoItem";
//import { useTheme } from "../context/ThemeContext";

const TodoList = ({ todos, currentTodos, onDelete, onEdit, onComplete, isDarkMode }) => {
    if (todos.length === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
                <div className="w-20 h-20 bg-[#f8f9fa] rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">📝</span>
                </div>
                <p className="text-[#1a1a1a] text-lg font-medium">Henüz görev yok</p>
                <p className="text-[#666] mt-2">Yeni bir görev ekleyerek başlayın</p>
            </div>
        );
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
