import { motion } from 'framer-motion';

const PatternPicker = ({ selected, onChange, patterns }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {patterns.map((pattern, index) => (
                <motion.button
                    key={pattern.value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChange(pattern.value)}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                        selected === pattern.value 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-lg' 
                            : 'border-secondary-200 dark:border-secondary-600 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-secondary-800'
                    }`}
                    title={pattern.label}
                >
                    <div className="relative">
                        <div className={`w-8 h-8 ${getPatternStyle(pattern.value)} ${selected === pattern.value ? 'text-primary-600' : 'text-secondary-600'}`}></div>
                        {selected === pattern.value && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"
                            />
                        )}
                    </div>
                    <span className={`text-xs font-medium ${
                        selected === pattern.value 
                            ? 'text-primary-700 dark:text-primary-300' 
                            : 'text-secondary-600 dark:text-secondary-400'
                    }`}>
                        {pattern.label}
                    </span>
                </motion.button>
            ))}
        </div>
    );
};

const getPatternStyle = (pattern) => {
    switch (pattern) {
        case 'square':
            return 'bg-current';
        case 'dots':
            return 'rounded-full bg-current';
        case 'rounded':
            return 'rounded-md bg-current';
        case 'extra-rounded':
            return 'rounded-lg bg-current';
        case 'classy':
            return 'bg-current transform rotate-45';
        default:
            return 'bg-current';
    }
};

export default PatternPicker;