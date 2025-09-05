import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi'

const toastTypes = {
    success: {
        icon: FiCheck,
        className: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
        iconClassName: 'text-green-600 dark:text-green-400'
    },
    error: {
        icon: FiX,
        className: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
        iconClassName: 'text-red-600 dark:text-red-400'
    },
    warning: {
        icon: FiAlertCircle,
        className: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
        iconClassName: 'text-yellow-600 dark:text-yellow-400'
    },
    info: {
        icon: FiInfo,
        className: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
        iconClassName: 'text-blue-600 dark:text-blue-400'
    }
}

export default function Toast({ message, type = 'info', isVisible, onClose, duration = 5000 }) {
    const config = toastTypes[type]
    const Icon = config.icon

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`fixed top-4 right-4 z-50 max-w-sm w-full border rounded-xl shadow-lg backdrop-blur-sm ${config.className}`}
                >
                    <div className="p-4 flex items-center gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-secondary-800 flex items-center justify-center ${config.iconClassName}`}>
                            <Icon size={18} />
                        </div>
                        <p className="flex-1 font-medium">{message}</p>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-1 rounded-full hover:bg-white/50 dark:hover:bg-secondary-800/50 transition-colors"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: duration / 1000, ease: "linear" }}
                        className="h-1 bg-current opacity-30 rounded-b-xl"
                        onAnimationComplete={onClose}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}