import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX, FiAlertTriangle, FiInfo, FiXCircle } from 'react-icons/fi'
import { useEffect, useState } from 'react'

const Toast = ({ 
    message, 
    type = 'info', 
    duration = 4000, 
    onClose,
    position = 'top-right',
    showProgress = true 
}) => {
    const [progress, setProgress] = useState(100)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (duration > 0) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev - (100 / (duration / 100))
                    if (newProgress <= 0) {
                        clearInterval(interval)
                        handleClose()
                        return 0
                    }
                    return newProgress
                })
            }, 100)

            return () => clearInterval(interval)
        }
    }, [duration])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300)
    }

    const toastConfig = {
        success: {
            icon: FiCheck,
            bgColor: 'bg-green-50 dark:bg-green-950/50',
            borderColor: 'border-green-200 dark:border-green-800',
            textColor: 'text-green-800 dark:text-green-200',
            iconColor: 'text-green-600 dark:text-green-400',
            progressColor: 'bg-green-500'
        },
        error: {
            icon: FiXCircle,
            bgColor: 'bg-red-50 dark:bg-red-950/50',
            borderColor: 'border-red-200 dark:border-red-800',
            textColor: 'text-red-800 dark:text-red-200',
            iconColor: 'text-red-600 dark:text-red-400',
            progressColor: 'bg-red-500'
        },
        warning: {
            icon: FiAlertTriangle,
            bgColor: 'bg-yellow-50 dark:bg-yellow-950/50',
            borderColor: 'border-yellow-200 dark:border-yellow-800',
            textColor: 'text-yellow-800 dark:text-yellow-200',
            iconColor: 'text-yellow-600 dark:text-yellow-400',
            progressColor: 'bg-yellow-500'
        },
        info: {
            icon: FiInfo,
            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
            borderColor: 'border-blue-200 dark:border-blue-800',
            textColor: 'text-blue-800 dark:text-blue-200',
            iconColor: 'text-blue-600 dark:text-blue-400',
            progressColor: 'bg-blue-500'
        }
    }

    const config = toastConfig[type]
    const Icon = config.icon

    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    }

    const slideVariants = {
        'top-right': {
            initial: { x: 400, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: 400, opacity: 0 }
        },
        'top-left': {
            initial: { x: -400, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: -400, opacity: 0 }
        },
        'top-center': {
            initial: { y: -100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -100, opacity: 0 }
        },
        'bottom-right': {
            initial: { x: 400, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: 400, opacity: 0 }
        },
        'bottom-left': {
            initial: { x: -400, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: -400, opacity: 0 }
        },
        'bottom-center': {
            initial: { y: 100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 100, opacity: 0 }
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`fixed z-50 ${positionClasses[position]} max-w-sm w-full mx-4`}
                    variants={slideVariants[position]}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className={`relative overflow-hidden rounded-2xl border ${config.bgColor} ${config.borderColor} shadow-soft backdrop-blur-sm`}>
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 ${config.iconColor}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${config.textColor} leading-relaxed`}>
                                        {message}
                                    </p>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
                                    aria-label="Close notification"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        </div>
                        
                        {showProgress && duration > 0 && (
                            <div className="h-1 bg-secondary-200 dark:bg-secondary-700">
                                <motion.div
                                    className={`h-full ${config.progressColor}`}
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Toast Container for managing multiple toasts
export const ToastContainer = ({ toasts = [], removeToast }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <AnimatePresence>
                {toasts.map((toast, index) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: index * 0.1 }
                        }}
                        exit={{ opacity: 0, y: -50 }}
                        className="pointer-events-auto"
                        style={{ 
                            position: 'absolute',
                            top: `${20 + index * 80}px`,
                            right: '20px',
                            zIndex: 1000 - index
                        }}
                    >
                        <Toast
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

// Hook for managing toasts
export const useToast = () => {
    const [toasts, setToasts] = useState([])

    const addToast = (message, type = 'info', options = {}) => {
        const id = Date.now() + Math.random()
        const toast = {
            id,
            message,
            type,
            duration: 4000,
            ...options
        }
        
        setToasts(prev => [...prev, toast])
        
        // Auto remove after duration
        if (toast.duration > 0) {
            setTimeout(() => {
                removeToast(id)
            }, toast.duration)
        }
        
        return id
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    const removeAllToasts = () => {
        setToasts([])
    }

    return {
        toasts,
        addToast,
        removeToast,
        removeAllToasts,
        success: (message, options) => addToast(message, 'success', options),
        error: (message, options) => addToast(message, 'error', options),
        warning: (message, options) => addToast(message, 'warning', options),
        info: (message, options) => addToast(message, 'info', options)
    }
}

export default Toast