import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {

    // Tema bilgisini ve fonksiyonları doğrudan almak için useTheme() kullandım.
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`fixed top-4 right-4 p-2 rounded-full ${isDarkMode
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
        >
            {isDarkMode ? '☀️' : '🌙'}
        </button>
    );
}

export default ThemeToggle; 