import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiHome, FiPlus, FiLayers, FiCamera, FiGrid, FiBarChart } from 'react-icons/fi'
import ThemeToggle from '../common/ThemeToggle'

export default function Navbar() {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    
    const navItems = [
        { path: '/', name: 'Home', icon: FiHome, shortName: 'Home' },
        { path: '/create', name: 'Create QR', icon: FiPlus, shortName: 'Create' },
        { path: '/bulk', name: 'Bulk Generate', icon: FiLayers, shortName: 'Bulk' },
        { path: '/scanner', name: 'QR Scanner', icon: FiCamera, shortName: 'Scanner' },
        { path: '/my-qr-codes', name: 'My QR Codes', icon: FiGrid, shortName: 'My QRs' },
        { path: '/analytics', name: 'Analytics', icon: FiBarChart, shortName: 'Analytics' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Close mobile menu when route changes
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        // Prevent body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    const logoVariants = {
        hover: {
            scale: 1.05,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
        }
    }

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            x: '100%',
            transition: {
                type: 'tween',
                duration: 0.3
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'tween',
                duration: 0.3
            }
        }
    }

    const menuItemVariants = {
        closed: { x: 50, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 24
            }
        })
    }

    return (
        <>
            <motion.nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-xl shadow-soft border-b border-secondary-200/50 dark:border-secondary-700/50' 
                        : 'bg-white/80 dark:bg-secondary-900/80 backdrop-blur-lg border-b border-white/10 dark:border-secondary-700/30'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="container-responsive">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <motion.div 
                            variants={logoVariants}
                            whileHover="hover"
                            className="flex-shrink-0"
                        >
                            <Link 
                                to="/" 
                                className="flex items-center gap-2 text-xl font-bold transition-opacity rounded-lg xs:gap-3 xs:text-2xl lg:text-3xl gradient-text hover:opacity-80 focus-ring"
                                aria-label="QRCraft - Home"
                            >
                                <div className="flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-soft">
                                    <span className="text-xs font-bold text-white xs:text-sm lg:text-base">QR</span>
                                </div>
                                <span className="hidden xs:block">QRCraft</span>
                            </Link>
                        </motion.div>
                        
                        {/* Desktop Navigation */}
                        <div className="items-center hidden gap-8 lg:flex">
                            <div className="flex items-center gap-1">
                                {navItems.slice(1).map((item, index) => {
                                    const Icon = item.icon
                                    const isActive = location.pathname === item.path
                                    
                                    return (
                                        <Link 
                                            key={item.path} 
                                            to={item.path}
                                            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 focus-ring ${
                                                isActive 
                                                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50' 
                                                    : 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800/50'
                                            }`}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            <Icon size={18} />
                                            <span>{item.shortName}</span>
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="desktopNavIndicator"
                                                    className="absolute inset-0 border bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl border-primary-200 dark:border-primary-800"
                                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                            </div>
                        </div>
                        
                        {/* Mobile Menu Button & Theme Toggle */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <ThemeToggle />
                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 transition-colors rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 focus-ring"
                                whileTap={{ scale: 0.95 }}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiX size={20} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiMenu size={20} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        
                        {/* Mobile Menu */}
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 right-0 z-50 w-80 max-w-[85vw] h-full bg-white dark:bg-secondary-900 shadow-hard lg:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Menu Header */}
                                <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                                            <span className="text-sm font-bold text-white">QR</span>
                                        </div>
                                        <span className="text-xl font-bold gradient-text">QRCraft</span>
                                    </div>
                                </div>
                                
                                {/* Mobile Menu Items */}
                                <div className="flex-1 px-6 py-8 overflow-y-auto">
                                    <div className="space-y-2">
                                        {navItems.map((item, index) => {
                                            const Icon = item.icon
                                            const isActive = location.pathname === item.path
                                            
                                            return (
                                                <motion.div
                                                    key={item.path}
                                                    custom={index}
                                                    variants={menuItemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                >
                                                    <Link
                                                        to={item.path}
                                                        className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-medium transition-all duration-200 focus-ring ${
                                                            isActive
                                                                ? 'text-primary-600 dark:text-primary-400 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 border border-primary-200 dark:border-primary-800'
                                                                : 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800'
                                                        }`}
                                                        aria-current={isActive ? 'page' : undefined}
                                                    >
                                                        <Icon size={22} />
                                                        <span className="text-lg">{item.name}</span>
                                                        {isActive && (
                                                            <motion.div
                                                                layoutId="mobileNavIndicator"
                                                                className="w-2 h-2 ml-auto rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                                                                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                                                            />
                                                        )}
                                                    </Link>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                                
                                {/* Mobile Menu Footer */}
                                <div className="p-6 border-t border-secondary-200 dark:border-secondary-700">
                                    <p className="text-sm text-center text-secondary-500 dark:text-secondary-400">
                                        QRCraft v1.0.0
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}