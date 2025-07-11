import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from '../common/ThemeToggle'

export default function Navbar() {
    const location = useLocation()
    
    const navItems = [
        { path: '/create', name: 'Create' },
        { path: '/my-qr-codes', name: 'My QR Codes' }
    ]

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link 
                        to="/" 
                        className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                        My QR Generator
                    </Link>
                </motion.div>
                
                <div className="flex items-center gap-6">
                    <div className="flex space-x-6">
                        {navItems.map((item) => (
                            <Link 
                                key={item.path} 
                                to={item.path}
                                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {item.name}
                                {location.pathname === item.path && (
                                    <motion.div 
                                        layoutId="navUnderline"
                                        className="absolute left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 bottom-[-6px]"
                                        transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                    
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}