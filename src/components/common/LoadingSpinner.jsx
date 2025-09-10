import { motion } from 'framer-motion'

const LoadingSpinner = ({ 
    size = 'md', 
    variant = 'primary', 
    text = '', 
    fullScreen = false,
    className = '' 
}) => {
    const sizeClasses = {
        xs: 'w-4 h-4',
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    }

    const variantClasses = {
        primary: 'border-primary-200 border-t-primary-600',
        secondary: 'border-secondary-200 border-t-secondary-600',
        white: 'border-white/20 border-t-white',
        accent: 'border-accent-200 border-t-accent-600'
    }

    const textSizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    }

    const spinnerContent = (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            <motion.div
                className={`${sizeClasses[size]} border-4 rounded-full ${variantClasses[variant]}`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`${textSizes[size]} font-medium text-secondary-600 dark:text-secondary-400`}
                >
                    {text}
                </motion.p>
            )}
        </div>
    )

    if (fullScreen) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm"
            >
                {spinnerContent}
            </motion.div>
        )
    }

    return spinnerContent
}

// Skeleton loader component
export const SkeletonLoader = ({ 
    width = 'w-full', 
    height = 'h-4', 
    className = '',
    count = 1,
    rounded = 'rounded'
}) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    className={`${width} ${height} ${rounded} loading-skeleton`}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.1
                    }}
                />
            ))}
        </div>
    )
}

// Pulse loader for buttons
export const PulseLoader = ({ size = 'sm', color = 'white' }) => {
    const dotSizes = {
        xs: 'w-1 h-1',
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-2.5 h-2.5'
    }

    const colorClasses = {
        white: 'bg-white',
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500'
    }

    return (
        <div className="flex items-center gap-1">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className={`${dotSizes[size]} ${colorClasses[color]} rounded-full`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: index * 0.1
                    }}
                />
            ))}
        </div>
    )
}

// Progress bar loader
export const ProgressLoader = ({ 
    progress = 0, 
    showPercentage = true, 
    className = '',
    variant = 'primary'
}) => {
    const variantClasses = {
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
        accent: 'bg-accent-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
    }

    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Loading...
                </span>
                {showPercentage && (
                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                        {Math.round(progress)}%
                    </span>
                )}
            </div>
            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                <motion.div
                    className={`h-2 rounded-full ${variantClasses[variant]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            </div>
        </div>
    )
}

export default LoadingSpinner