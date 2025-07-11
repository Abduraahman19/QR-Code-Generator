import { motion } from 'framer-motion';

const EmptyState = ({ searchTerm, filterOption, totalQRCodes }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
            {searchTerm ? (
                <>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        No QR codes found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Your search for "{searchTerm}" didn't match any QR codes.
                    </p>
                    {filterOption !== 'all' && (
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Try changing your filter or search term.
                        </p>
                    )}
                </>
            ) : filterOption !== 'all' ? (
                <>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        No {filterOption === 'withLogo' ? 'QR codes with logo' : 'QR codes without logo'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {totalQRCodes > 0 
                            ? 'Try changing your filter to see your QR codes.'
                            : 'Create your first QR code to get started.'}
                    </p>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                        No QR codes yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Create your first QR code to get started.
                    </p>
                </>
            )}
        </motion.div>
    );
};

export default EmptyState;