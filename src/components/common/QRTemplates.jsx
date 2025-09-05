import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'

const templates = [
    {
        id: 'business',
        name: 'Business Card',
        description: 'Professional black & white',
        options: {
            fgColor: '#000000',
            bgColor: '#ffffff',
            dotStyle: 'square',
            cornerStyle: 'square',
            eyeColor: '#000000',
            eyeBallColor: '#000000'
        }
    },
    {
        id: 'modern',
        name: 'Modern Blue',
        description: 'Sleek blue gradient',
        options: {
            fgColor: '#2563eb',
            bgColor: '#f0f9ff',
            dotStyle: 'rounded',
            cornerStyle: 'rounded',
            eyeColor: '#1d4ed8',
            eyeBallColor: '#3b82f6'
        }
    },
    {
        id: 'vibrant',
        name: 'Vibrant Purple',
        description: 'Eye-catching purple',
        options: {
            fgColor: '#7c3aed',
            bgColor: '#faf5ff',
            dotStyle: 'dots',
            cornerStyle: 'rounded',
            eyeColor: '#6d28d9',
            eyeBallColor: '#8b5cf6'
        }
    },
    {
        id: 'elegant',
        name: 'Elegant Gold',
        description: 'Luxury gold theme',
        options: {
            fgColor: '#d97706',
            bgColor: '#fffbeb',
            dotStyle: 'extra-rounded',
            cornerStyle: 'extra-rounded',
            eyeColor: '#b45309',
            eyeBallColor: '#f59e0b'
        }
    },
    {
        id: 'nature',
        name: 'Nature Green',
        description: 'Fresh green look',
        options: {
            fgColor: '#059669',
            bgColor: '#f0fdf4',
            dotStyle: 'rounded',
            cornerStyle: 'rounded',
            eyeColor: '#047857',
            eyeBallColor: '#10b981'
        }
    },
    {
        id: 'sunset',
        name: 'Sunset Orange',
        description: 'Warm sunset colors',
        options: {
            fgColor: '#ea580c',
            bgColor: '#fff7ed',
            dotStyle: 'dots',
            cornerStyle: 'rounded',
            eyeColor: '#c2410c',
            eyeBallColor: '#f97316'
        }
    }
]

export default function QRTemplates({ onApplyTemplate, currentOptions }) {
    const isTemplateActive = (template) => {
        return (
            template.options.fgColor === currentOptions.fgColor &&
            template.options.bgColor === currentOptions.bgColor &&
            template.options.dotStyle === currentOptions.dotStyle &&
            template.options.cornerStyle === currentOptions.cornerStyle
        )
    }

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-2">
                    Quick Templates
                </h3>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    Choose from pre-designed templates to get started quickly
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template, index) => (
                    <motion.button
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onApplyTemplate(template.options)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            isTemplateActive(template)
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 hover:border-primary-300 dark:hover:border-primary-600'
                        }`}
                    >
                        {/* Template Preview */}
                        <div className="flex items-center gap-3 mb-3">
                            <div 
                                className="w-12 h-12 rounded-lg border-2 border-secondary-200 dark:border-secondary-600 flex items-center justify-center"
                                style={{ backgroundColor: template.options.bgColor }}
                            >
                                <div className="grid grid-cols-3 gap-0.5">
                                    {[...Array(9)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-1 h-1 ${
                                                template.options.dotStyle === 'dots' ? 'rounded-full' :
                                                template.options.dotStyle === 'rounded' ? 'rounded-sm' :
                                                template.options.dotStyle === 'extra-rounded' ? 'rounded' : ''
                                            }`}
                                            style={{ backgroundColor: template.options.fgColor }}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <h4 className="font-semibold text-secondary-800 dark:text-white">
                                    {template.name}
                                </h4>
                                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                    {template.description}
                                </p>
                            </div>
                        </div>

                        {/* Color Swatches */}
                        <div className="flex gap-2">
                            <div 
                                className="w-4 h-4 rounded border border-secondary-300 dark:border-secondary-600"
                                style={{ backgroundColor: template.options.fgColor }}
                                title="Foreground Color"
                            />
                            <div 
                                className="w-4 h-4 rounded border border-secondary-300 dark:border-secondary-600"
                                style={{ backgroundColor: template.options.bgColor }}
                                title="Background Color"
                            />
                        </div>

                        {/* Active Indicator */}
                        {isTemplateActive(template) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                            >
                                <FiCheck className="text-white" size={14} />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}