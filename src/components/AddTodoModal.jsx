import AddTodoForm from "./AddTodoForm";

const AddTodoModal = ({ isOpen, onClose, onAdd, isDarkMode }) => {

    if (!isOpen) return null; // Modal açık-kapalı kontrolü.

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 w-full max-w-md shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#1a1a1a]'}`}>Yeni Görev Ekle</h2>
                    <button
                        onClick={onClose}
                        className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        ✕
                    </button>
                </div>

                <AddTodoForm onAdd={() => {
                    onAdd(); // Kullanıcı görev ekleye tıklayınca app.js görev listesini günceller.
                    onClose(); // Modal kapat.
                }} />
            </div>
        </div>
    );
};

export default AddTodoModal; 