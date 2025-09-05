import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ label, color, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    
    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        
        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);
    
    const presetColors = [
        '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
        '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'
    ];
    
    return (
        <div>
            <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                {label}
            </label>
            <div className="relative" ref={pickerRef}>
                <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="flex items-center w-full p-3 border border-secondary-200 dark:border-secondary-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 transition-colors bg-white dark:bg-secondary-800"
                >
                    <div 
                        className="w-8 h-8 rounded-lg mr-3 border-2 border-secondary-200 dark:border-secondary-600 shadow-sm" 
                        style={{ backgroundColor: color }}
                    />
                    <span className="text-secondary-700 dark:text-secondary-300 font-medium">{color}</span>
                </button>
                
                {showPicker && (
                    <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl border border-secondary-200 dark:border-secondary-700 min-w-[280px]">
                        <HexColorPicker color={color} onChange={onChange} className="mb-4" />
                        
                        {/* Preset Colors */}
                        <div className="mb-4">
                            <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400 mb-2">Presets</p>
                            <div className="grid grid-cols-5 gap-2">
                                {presetColors.map((presetColor) => (
                                    <button
                                        key={presetColor}
                                        onClick={() => onChange(presetColor)}
                                        className="w-8 h-8 rounded-lg border-2 border-secondary-200 dark:border-secondary-600 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: presetColor }}
                                        title={presetColor}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => onChange(e.target.value)}
                                className="flex-1 p-2 border border-secondary-200 dark:border-secondary-700 dark:bg-secondary-700 dark:text-white rounded-lg text-sm font-mono"
                                placeholder="#000000"
                            />
                            <button
                                onClick={() => setShowPicker(false)}
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg font-medium transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColorPicker;