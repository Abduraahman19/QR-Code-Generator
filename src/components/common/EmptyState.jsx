import { motion } from 'framer-motion'
import { FiPlus, FiSearch, FiGrid, FiImage, FiFileText, FiInbox } from 'react-icons/fi'

const EmptyState = ({ 
    icon: CustomIcon,
    title,
    description,
    actionLabel,
    onAction,
    variant = 'default',
    size = 'md',
    className = ''
}) => {
    const variants = {
        default: {
            icon: FiInbox,
            iconColor: 'text-secondary-400 dark:text-secondary-500',
            bgColor: 'bg-secondary-100 dark:bg-secondary-800'
        },
        search: {
            icon: FiSearch,
            iconColor: 'text-blue-400 dark:text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30'
        },
        create: {
            icon: FiPlus,
            iconColor: 'text-green-400 dark:text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/30'
        },
        grid: {
            icon: FiGrid,
            iconColor: 'text-purple-400 dark:text-purple-500',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30'
        },
        image: {
            icon: FiImage,
            iconColor: 'text-orange-400 dark:text-orange-500',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30'
        },
        file: {
            icon: FiFileText,
            iconColor: 'text-indigo-400 dark:text-indigo-500',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
        }
    }

    const sizes = {
        sm: {
            container: 'py-8 px-4',
            iconContainer: 'w-12 h-12 mb-4',
            iconSize: 24,
            title: 'text-lg',
            description: 'text-sm',
            button: 'px-4 py-2 text-sm'
        },
        md: {
            container: 'py-12 px-6',
            iconContainer: 'w-16 h-16 mb-6',
            iconSize: 32,
            title: 'text-xl',
            description: 'text-base',
            button: 'px-6 py-3 text-base'
        },
        lg: {
            container: 'py-16 px-8',
            iconContainer: 'w-20 h-20 mb-8',
            iconSize: 40,
            title: 'text-2xl',
            description: 'text-lg',
            button: 'px-8 py-4 text-lg'
        }
    }

    const config = variants[variant]
    const sizeConfig = sizes[size]
    const Icon = CustomIcon || config.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-center ${sizeConfig.container} ${className}`}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`inline-flex items-center justify-center ${sizeConfig.iconContainer} ${config.bgColor} rounded-2xl mx-auto`}
            >
                <Icon 
                    size={sizeConfig.iconSize} 
                    className={config.iconColor}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h3 className={`font-bold text-secondary-800 dark:text-white mb-3 ${sizeConfig.title}`}>
                    {title}
                </h3>
                
                {description && (
                    <p className={`text-secondary-600 dark:text-secondary-400 mb-6 max-w-md mx-auto leading-relaxed ${sizeConfig.description}`}>
                        {description}
                    </p>
                )}

                {actionLabel && onAction && (
                    <motion.button
                        onClick={onAction}
                        className={`btn-primary ${sizeConfig.button}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {actionLabel}
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    )
}

// Predefined empty states for common scenarios
export const NoQRCodes = ({ onCreateNew }) => (
    <EmptyState
        variant="create"
        title="No QR Codes Yet"
        description="Start creating your first QR code to see it here. It's quick and easy!"
        actionLabel="Create Your First QR Code"
        onAction={onCreateNew}
        size="lg"
    />
)

export const NoSearchResults = ({ searchTerm, onClearSearch }) => (
    <EmptyState
        variant="search"
        title="No Results Found"
        description={`We couldn't find any QR codes matching "${searchTerm}". Try adjusting your search terms.`}
        actionLabel="Clear Search"
        onAction={onClearSearch}
    />
)

export const NoAnalyticsData = ({ onCreateQR }) => (
    <EmptyState
        variant="grid"
        title="No Analytics Data"
        description="Create and share QR codes to start seeing analytics data here."
        actionLabel="Create QR Code"
        onAction={onCreateQR}
    />
)

export const NoTemplates = ({ onCreateTemplate }) => (
    <EmptyState
        variant="image"
        title="No Templates Available"
        description="Templates help you create consistent QR codes quickly. Create your first template!"
        actionLabel="Create Template"
        onAction={onCreateTemplate}
    />
)

export const UploadPlaceholder = ({ onUpload, acceptedFormats = "PNG, JPG, SVG" }) => (
    <EmptyState
        variant="image"
        title="Upload Your Logo"
        description={`Drag and drop your logo here or click to browse. Supported formats: ${acceptedFormats}`}
        actionLabel="Choose File"
        onAction={onUpload}
        size="sm"
    />
)

export const LoadingState = ({ message = "Loading..." }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 px-6"
    >
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-12 h-12 mb-4 border-4 border-primary-200 border-t-primary-600 rounded-full"
        />
        <p className="text-secondary-600 dark:text-secondary-400">{message}</p>
    </motion.div>
)

export const ErrorState = ({ title = "Something went wrong", description, onRetry }) => (
    <EmptyState
        variant="default"
        title={title}
        description={description || "An unexpected error occurred. Please try again."}
        actionLabel={onRetry ? "Try Again" : undefined}
        onAction={onRetry}
        className="text-red-600 dark:text-red-400"
    />
)

export default EmptyState