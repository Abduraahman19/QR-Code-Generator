import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

const ThemeToggle = () => {
    const [theme, setTheme] = useState('system')
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system'
        setTheme(savedTheme)
        applyTheme(savedTheme)
    }, [])
    
    const applyTheme = (newTheme) => {
        const root = document.documentElement
        
        if (newTheme === 'dark') {
            root.classList.add('dark')
        } else if (newTheme === 'light') {
            root.classList.remove('dark')
        } else {
            // System theme
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (prefersDark) {
                root.classList.add('dark')
            } else {
                root.classList.remove('dark')
            }
        }
    }
    
    const changeTheme = (newTheme) => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
        setIsOpen(false)
    }
    
    const themes = [
        { key: 'light', label: 'Light', icon: FiSun },
        { key: 'dark', label: 'Dark', icon: FiMoon },
        { key: 'system', label: 'System', icon: FiMonitor }
    ]
    
    const currentTheme = themes.find(t => t.key === theme)
    const CurrentIcon = currentTheme?.icon || FiMonitor
    
    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-200 focus-ring"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
                aria-expanded={isOpen}
            >
                <motion.div
                    key={theme}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <CurrentIcon size={18} />
                </motion.div>
            </motion.button>
            
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-12 z-50 w-48 p-2 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-2xl shadow-medium backdrop-blur-sm"
                        >
                            <div className="space-y-1">
                                {themes.map((themeOption) => {
                                    const Icon = themeOption.icon
                                    const isActive = theme === themeOption.key
                                    
                                    return (
                                        <motion.button
                                            key={themeOption.key}
                                            onClick={() => changeTheme(themeOption.key)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
                                                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700/50'
                                            }`}
                                            whileHover={{ x: 2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Icon size={16} />
                                            <span className="font-medium">{themeOption.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTheme"
                                                    className="ml-auto w-2 h-2 bg-primary-500 rounded-full"
                                                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                                                />
                                            )}
                                        </motion.button>
                                    )
                                })}
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-700">
                                <p className="text-xs text-secondary-500 dark:text-secondary-400 px-3">
                                    System follows your OS preference
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ThemeToggle