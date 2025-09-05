import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                className={`${sizeClasses[size]} border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    )
}

export function LoadingCard() {
    return (
        <div className="card p-6 animate-pulse">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-200 dark:bg-secondary-700 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4"></div>
                    <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2"></div>
                </div>
            </div>
            <div className="mt-4 h-32 bg-secondary-200 dark:bg-secondary-700 rounded-xl"></div>
        </div>
    )
}