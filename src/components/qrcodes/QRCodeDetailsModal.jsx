import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const QRCodeDetailsModal = ({ qrCode, onClose, onSave }) => {
    const [editedQR, setEditedQR] = useState({});

    useEffect(() => {
        if (qrCode) {
            setEditedQR(qrCode);
        }
    }, [qrCode]);

    const handleChange = (key, value) => {
        setEditedQR(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedQR);
    };

    return (
        <AnimatePresence>
            {qrCode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 py-8 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 sm:p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    Edit QR Code
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <FiX size={24} className="text-gray-600 dark:text-gray-300" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            QR Code Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editedQR.name || ''}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className="w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Content
                                        </label>
                                        <textarea
                                            value={editedQR.value || ''}
                                            onChange={(e) => handleChange('value', e.target.value)}
                                            rows="5"
                                            className="w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QRCodeDetailsModal;
