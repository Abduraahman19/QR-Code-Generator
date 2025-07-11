import { FiUpload, FiX } from 'react-icons/fi';
import { useRef } from 'react';

const LogoUpload = ({ onUpload, currentLogo, onRemove }) => {
    const fileInputRef = useRef(null);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Convert image to base64 string
                onUpload(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Logo Image
            </label>
            
            {currentLogo ? (
                <div className="relative">
                    <img 
                        src={currentLogo} 
                        alt="QR Code Logo" 
                        className="w-32 h-32 object-contain mx-auto border dark:border-gray-700 rounded-lg"
                    />
                    <button
                        onClick={onRemove}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full -mt-2 -mr-2 hover:bg-red-600"
                    >
                        <FiX size={16} />
                    </button>
                </div>
            ) : (
                <div 
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                >
                    <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Click to upload logo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        PNG, JPG up to 2MB
                    </p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            )}
            
            {currentLogo && (
                <button
                    onClick={() => fileInputRef.current.click()}
                    className="mt-2 w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm"
                >
                    Change Logo
                </button>
            )}
        </div>
    );
};

export default LogoUpload;