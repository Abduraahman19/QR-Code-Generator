import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);
    
    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
    );
};

export default ThemeToggle;