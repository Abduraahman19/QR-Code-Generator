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
        <nav className="glass-effect shadow-lg border-b border-white/10 dark:border-secondary-700/50 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link 
                        to="/" 
                        className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">QR</span>
                        </div>
                        QRCraft
                    </Link>
                </motion.div>
                
                <div className="flex items-center gap-6">
                    <div className="flex space-x-6">
                        {navItems.map((item) => (
                            <Link 
                                key={item.path} 
                                to={item.path}
                                className="relative text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                            >
                                {item.name}
                                {location.pathname === item.path && (
                                    <motion.div 
                                        layoutId="navUnderline"
                                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-500 bottom-[-6px] rounded-full"
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