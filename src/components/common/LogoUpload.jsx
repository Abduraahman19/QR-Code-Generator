import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoUpload = ({ onUpload, currentLogo, onRemove }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };
    
    const processFile = (file) => {
        if (file && file.type.match('image.*')) {
            // Check file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should be less than 2MB');
                return;
            }
            
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                onUpload(event.target.result);
                setIsLoading(false);
            };
            reader.onerror = () => {
                alert('Error reading file');
                setIsLoading(false);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file');
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };
    
    return (
        <div>
            <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                Logo Image
            </label>
            
            <AnimatePresence mode="wait">
                {currentLogo ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group"
                    >
                        <div className="relative overflow-hidden rounded-2xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 p-4">
                            <img 
                                src={currentLogo} 
                                alt="QR Code Logo" 
                                className="w-32 h-32 object-contain mx-auto rounded-xl"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="p-2 bg-white text-secondary-800 rounded-lg mr-2 hover:bg-secondary-100 transition-colors"
                                    title="Change Logo"
                                >
                                    <FiImage size={18} />
                                </button>
                                <button
                                    onClick={onRemove}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    title="Remove Logo"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                            isDragging 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                                : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:hover:border-primary-500 bg-secondary-50 dark:bg-secondary-800/50'
                        }`}
                        onClick={() => fileInputRef.current.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {isLoading ? (
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-3"></div>
                                <p className="text-sm text-secondary-600 dark:text-secondary-400">Processing...</p>
                            </div>
                        ) : (
                            <>
                                <motion.div
                                    animate={{ y: isDragging ? -5 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiUpload className={`mx-auto h-12 w-12 mb-4 ${
                                        isDragging ? 'text-primary-600' : 'text-secondary-400'
                                    }`} />
                                </motion.div>
                                <p className={`text-lg font-medium mb-2 ${
                                    isDragging ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'
                                }`}>
                                    {isDragging ? 'Drop your logo here' : 'Upload Logo'}
                                </p>
                                <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                                    Drag & drop or click to browse
                                </p>
                                <p className="text-xs text-secondary-400 dark:text-secondary-500">
                                    PNG, JPG, SVG up to 2MB
                                </p>
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LogoUpload;