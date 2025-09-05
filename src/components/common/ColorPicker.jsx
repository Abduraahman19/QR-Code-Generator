import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ label, color, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);
    
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <div className="relative">
                <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="flex items-center w-full p-2 border dark:border-gray-700 rounded-lg"
                >
                    <div 
                        className="w-6 h-6 rounded mr-2 border dark:border-gray-600" 
                        style={{ backgroundColor: color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{color}</span>
                </button>
                
                {showPicker && (
                    <div className="absolute z-10 mt-1 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                        <HexColorPicker color={color} onChange={onChange} />
                        <div className="flex justify-between mt-2">
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-24 p-1 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded text-sm"
                            />
                            <button
                                onClick={() => setShowPicker(false)}
                                className="px-2 py-1 bg-blue-600 text-white text-sm rounded"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColorPicker;