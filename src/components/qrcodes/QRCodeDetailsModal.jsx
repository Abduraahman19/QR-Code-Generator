import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUpload, FiTrash2, FiDownload, FiRefreshCw, FiEdit2, FiSettings } from 'react-icons/fi';
import CustomQRCode from '../common/CustomQRCode';
import ColorPicker from '../common/ColorPicker';
import * as htmlToImage from 'html-to-image';

const QRCodeDetailsModal = ({ qrCode, onClose, onSave }) => {
    const [editedQR, setEditedQR] = useState({});
    const [activeTab, setActiveTab] = useState('basic');
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const fileInputRef = useRef(null);
    const qrPreviewRef = useRef(null);

    useEffect(() => {
        if (qrCode) {
            setEditedQR({
                ...qrCode,
                options: {
                    fgColor: '#000000',
                    bgColor: '#ffffff',
                    eyeColor: '#000000',
                    eyeBallColor: '#000000',
                    dotStyle: 'square',
                    cornerStyle: 'square',
                    errorCorrectionLevel: 'M',
                    ...qrCode.options
                }
            });
            setLogoPreview(qrCode.logo);
        }
    }, [qrCode]);

    const handleChange = (key, value) => {
        setEditedQR(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleOptionChange = (key, value) => {
        setEditedQR(prev => ({
            ...prev,
            options: {
                ...prev.options,
                [key]: value
            }
        }));
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const logoUrl = e.target.result;
                setLogoPreview(logoUrl);
                setEditedQR(prev => ({
                    ...prev,
                    logo: logoUrl
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
        setEditedQR(prev => ({
            ...prev,
            logo: null
        }));
    };

    const downloadQR = async (format) => {
        setIsDownloading(true);
        try {
            const element = qrPreviewRef.current;
            if (!element) throw new Error('QR element not found');

            const fileName = editedQR.name || `qr-code-${editedQR.id}`;
            let dataUrl;

            switch (format) {
                case 'png':
                    dataUrl = await htmlToImage.toPng(element, { quality: 1, pixelRatio: 2 });
                    break;
                case 'jpg':
                    dataUrl = await htmlToImage.toJpeg(element, { quality: 1, pixelRatio: 2 });
                    break;
                case 'svg':
                    const svg = element.querySelector('svg');
                    if (!svg) throw new Error('SVG not found');
                    const svgString = new XMLSerializer().serializeToString(svg);
                    const blob = new Blob([svgString], { type: 'image/svg+xml' });
                    dataUrl = URL.createObjectURL(blob);
                    break;
                default:
                    throw new Error('Unsupported format');
            }

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${fileName}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (format === 'svg') {
                URL.revokeObjectURL(dataUrl);
            }
        } catch (err) {
            console.error('Download failed:', err);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedQR);
    };

    const resetToDefaults = () => {
        setEditedQR(prev => ({
            ...prev,
            options: {
                fgColor: '#000000',
                bgColor: '#ffffff',
                eyeColor: '#000000',
                eyeBallColor: '#000000',
                dotStyle: 'square',
                cornerStyle: 'square',
                errorCorrectionLevel: 'M'
            },
            logo: null,
            logoSize: 25
        }));
        removeLogo();
    };

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: FiSettings },
        { id: 'design', label: 'Design', icon: FiEdit2 },
        { id: 'logo', label: 'Logo', icon: FiUpload }
    ];

    return (
        <AnimatePresence>
            {qrCode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70  backdrop-blur-sm flex items-center justify-center px-4 py-8 z-[9999]"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white dark:bg-secondary-900 rounded-xl mt-20 shadow-2xl w-full h-full max-w-[95vw] max-h-[90vh] sm:max-w-6xl sm:max-h-[85vh] overflow-auto border border-secondary-200 dark:border-secondary-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-soft">
                                    <span className="text-sm font-bold text-white">QR</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary-800 dark:text-white">
                                        Edit QR Code
                                    </h3>
                                    <p className="text-sm text-secondary-600 dark:text-secondary-300">
                                        Customize your QR code design and content
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetToDefaults}
                                    className="p-2 transition-colors text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-xl"
                                    title="Reset to defaults"
                                >
                                    <FiRefreshCw size={20} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="p-2 transition-colors text-secondary-600 dark:text-secondary-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-xl"
                                >
                                    <FiX size={24} />
                                </motion.button>
                            </div>
                        </div>

                        <div className="flex flex-col h-full lg:flex-row">
                            {/* Left Panel - Form */}
                            <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[60vh] lg:max-h-full">
                                {/* Tabs */}
                                <div className="flex p-1 mb-6 bg-secondary-100 dark:bg-secondary-800 rounded-xl">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                                    activeTab === tab.id
                                                        ? 'bg-white dark:bg-secondary-700 text-primary-600 dark:text-primary-400 shadow-soft'
                                                        : 'text-secondary-600 dark:text-secondary-300 hover:text-secondary-800 dark:hover:text-white'
                                                }`}
                                            >
                                                <Icon size={18} />
                                                <span className="hidden sm:inline">{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Basic Info Tab */}
                                    {activeTab === 'basic' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                    QR Code Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editedQR.name || ''}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                    className="w-full px-4 py-3 transition-all border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    placeholder="Enter QR code name"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                    Content
                                                </label>
                                                <textarea
                                                    value={editedQR.value || ''}
                                                    onChange={(e) => handleChange('value', e.target.value)}
                                                    rows="6"
                                                    className="w-full px-4 py-3 transition-all border resize-none border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    placeholder="Enter URL, text, or any content for your QR code"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                    Error Correction Level
                                                </label>
                                                <select
                                                    value={editedQR.options?.errorCorrectionLevel || 'M'}
                                                    onChange={(e) => handleOptionChange('errorCorrectionLevel', e.target.value)}
                                                    className="w-full px-4 py-3 transition-all border border-secondary-300 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                >
                                                    <option value="L">Low (7%)</option>
                                                    <option value="M">Medium (15%)</option>
                                                    <option value="Q">Quartile (25%)</option>
                                                    <option value="H">High (30%)</option>
                                                </select>
                                                <p className="mt-2 text-xs text-secondary-500 dark:text-secondary-400">
                                                    Higher levels allow more damage but create denser QR codes
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Design Tab */}
                                    {activeTab === 'design' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div>
                                                    <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                        Foreground Color
                                                    </label>
                                                    <ColorPicker
                                                        color={editedQR.options?.fgColor || '#000000'}
                                                        onChange={(color) => handleOptionChange('fgColor', color)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                        Background Color
                                                    </label>
                                                    <ColorPicker
                                                        color={editedQR.options?.bgColor || '#ffffff'}
                                                        onChange={(color) => handleOptionChange('bgColor', color)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div>
                                                    <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                        Eye Color
                                                    </label>
                                                    <ColorPicker
                                                        color={editedQR.options?.eyeColor || editedQR.options?.fgColor || '#000000'}
                                                        onChange={(color) => handleOptionChange('eyeColor', color)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                        Eye Ball Color
                                                    </label>
                                                    <ColorPicker
                                                        color={editedQR.options?.eyeBallColor || editedQR.options?.fgColor || '#000000'}
                                                        onChange={(color) => handleOptionChange('eyeBallColor', color)}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                    Dot Pattern
                                                </label>
                                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                                    {['square', 'dots', 'rounded', 'extra-rounded'].map((pattern) => (
                                                        <button
                                                            key={`dot-${pattern}`}
                                                            type="button"
                                                            onClick={() => handleOptionChange('dotStyle', pattern)}
                                                            className={`p-3 border-2 rounded-xl transition-all ${
                                                                editedQR.options?.dotStyle === pattern
                                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                                    : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-300'
                                                            }`}
                                                        >
                                                            <div className="text-xs font-medium text-center capitalize text-secondary-700 dark:text-secondary-300">
                                                                {pattern.replace('-', ' ')}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                    Corner Style
                                                </label>
                                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                                    {['square', 'dot', 'rounded', 'extra-rounded'].map((style) => (
                                                        <button
                                                            key={`corner-${style}`}
                                                            type="button"
                                                            onClick={() => handleOptionChange('cornerStyle', style)}
                                                            className={`p-3 border-2 rounded-xl transition-all ${
                                                                editedQR.options?.cornerStyle === style
                                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                                    : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-300'
                                                            }`}
                                                        >
                                                            <div className="text-xs font-medium text-center capitalize text-secondary-700 dark:text-secondary-300">
                                                                {style.replace('-', ' ')}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Logo Tab */}
                                    {activeTab === 'logo' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                    Logo Upload
                                                </label>
                                                <div className="flex flex-col items-center justify-center p-8 transition-colors border-2 border-dashed border-secondary-300 dark:border-secondary-600 rounded-xl hover:border-primary-400">
                                                    {logoPreview ? (
                                                        <div className="text-center">
                                                            <img
                                                                src={logoPreview}
                                                                alt="Logo preview"
                                                                className="object-contain w-20 h-20 mx-auto mb-4 rounded-lg"
                                                            />
                                                            <div className="flex justify-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                    className="px-4 py-2 text-sm btn-secondary"
                                                                >
                                                                    Change Logo
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={removeLogo}
                                                                    className="px-4 py-2 text-sm btn-danger"
                                                                >
                                                                    <FiTrash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center">
                                                            <FiUpload size={48} className="mx-auto mb-4 text-secondary-400" />
                                                            <p className="mb-2 text-sm text-secondary-600 dark:text-secondary-300">
                                                                Click to upload logo
                                                            </p>
                                                            <p className="text-xs text-secondary-500 dark:text-secondary-400">
                                                                PNG, JPG up to 5MB
                                                            </p>
                                                            <button
                                                                type="button"
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className="px-6 py-2 mt-4 btn-primary"
                                                            >
                                                                Choose File
                                                            </button>
                                                        </div>
                                                    )}
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoUpload}
                                                        className="hidden"
                                                    />
                                                </div>
                                            </div>

                                            {logoPreview && (
                                                <div>
                                                    <label className="block mb-3 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                                        Logo Size: {editedQR.logoSize || 25}%
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="10"
                                                        max="50"
                                                        value={editedQR.logoSize || 25}
                                                        onChange={(e) => handleChange('logoSize', parseInt(e.target.value))}
                                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-secondary-200 dark:bg-secondary-700 slider"
                                                    />
                                                    <div className="flex justify-between mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                                                        <span>10%</span>
                                                        <span>50%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 pt-6 border-t sm:flex-row border-secondary-200 dark:border-secondary-700">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 py-3 btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 btn-primary"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Panel - Preview */}
                            <div className="p-4 sm:p-6 border-t lg:border-t-0 lg:border-l lg:w-80 xl:w-96 bg-secondary-50 dark:bg-secondary-800/50 border-secondary-200 dark:border-secondary-700 max-h-[40vh] lg:max-h-full overflow-y-auto">
                                <div className="lg:sticky lg:top-6">
                                    <h4 className="mb-4 text-lg font-semibold text-secondary-800 dark:text-white">
                                        Live Preview
                                    </h4>
                                    
                                    <div className="mb-6">
                                        <div
                                            ref={qrPreviewRef}
                                            className="flex justify-center p-6 rounded-2xl shadow-soft"
                                            style={{
                                                backgroundColor: editedQR.options?.bgColor || '#ffffff'
                                            }}
                                        >
                                            <CustomQRCode
                                                value={editedQR.value || 'https://example.com'}
                                                size={200}
                                                fgColor={editedQR.options?.fgColor || '#000000'}
                                                bgColor="transparent"
                                                dotType={editedQR.options?.dotStyle || 'square'}
                                                cornerSquareType={editedQR.options?.cornerStyle || 'square'}
                                                cornerDotType={editedQR.options?.cornerStyle || 'square'}
                                                eyeColor={editedQR.options?.eyeColor || editedQR.options?.fgColor || '#000000'}
                                                eyeBallColor={editedQR.options?.eyeBallColor || editedQR.options?.fgColor || '#000000'}
                                                logo={logoPreview}
                                                logoSize={editedQR.logoSize || 25}
                                                errorCorrectionLevel={editedQR.options?.errorCorrectionLevel || 'M'}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                            Quick Download
                                        </h5>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['png', 'jpg', 'svg'].map((format) => (
                                                <button
                                                    key={format}
                                                    type="button"
                                                    onClick={() => downloadQR(format)}
                                                    disabled={isDownloading}
                                                    className="px-3 py-2 text-xs btn-secondary disabled:opacity-50"
                                                >
                                                    <FiDownload size={14} className="mr-1" />
                                                    {format.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 mt-6 bg-white border dark:bg-secondary-800 rounded-xl border-secondary-200 dark:border-secondary-600">
                                        <h5 className="mb-2 text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                                            QR Code Info
                                        </h5>
                                        <div className="space-y-2 text-xs text-secondary-600 dark:text-secondary-400">
                                            <div className="flex justify-between">
                                                <span>Name:</span>
                                                <span className="font-medium">{editedQR.name || 'Untitled'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Content Length:</span>
                                                <span className="font-medium">{(editedQR.value || '').length} chars</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Error Correction:</span>
                                                <span className="font-medium">{editedQR.options?.errorCorrectionLevel || 'M'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Has Logo:</span>
                                                <span className="font-medium">{logoPreview ? 'Yes' : 'No'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QRCodeDetailsModal;
