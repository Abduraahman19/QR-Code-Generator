import { useState, useRef, useEffect } from 'react';
import { useQR } from '../../context/QRContext';
import { FiDownload, FiSave, FiEdit2, FiImage, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import * as htmlToImage from 'html-to-image';
import CustomQRCode from '../common/CustomQRCode';
import ColorPicker from '../common/ColorPicker';
import PatternPicker from '../common/PatternPicker';
import LogoUpload from '../common/LogoUpload';
import QRTemplates from '../common/QRTemplates';

const QRGenerator = () => {
    const [inputText, setInputText] = useState('');
    const [qrName, setQrName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [activeTab, setActiveTab] = useState('content');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [logo, setLogo] = useState(null);
    const [logoSize, setLogoSize] = useState(30);

    const qrRef = useRef(null);
    const { addQRCode } = useQR();

    const [qrOptions, setQrOptions] = useState({
        size: 256,
        bgColor: '#ffffff',
        fgColor: '#000000',
        level: 'H',
        pattern: 'square',
        margin: 4,
        cornerStyle: 'square',
        dotStyle: 'square',
        eyeColor: '#000000',
        eyeBallColor: '#000000'
    });

    const generateQR = () => {
        if (!inputText.trim()) {
            setError('Please enter a URL or text!');
            return;
        }

        // Validate colors for sufficient contrast
        if (getContrastRatio(qrOptions.fgColor, qrOptions.bgColor) < 4.5) {
            setError('Color contrast too low for reliable scanning!');
            return;
        }

        setError('');
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 800);
    };

    // Helper function to calculate contrast ratio
    function getContrastRatio(color1, color2) {
        // Convert hex to RGB
        const r1 = parseInt(color1.substr(1, 2), 16);
        const g1 = parseInt(color1.substr(3, 2), 16);
        const b1 = parseInt(color1.substr(5, 2), 16);

        const r2 = parseInt(color2.substr(1, 2), 16);
        const g2 = parseInt(color2.substr(3, 2), 16);
        const b2 = parseInt(color2.substr(5, 2), 16);

        // Calculate luminance
        const l1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
        const l2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;

        // Return contrast ratio
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    // In the saveQR function:
    // Inside QRGenerator component
    const saveQR = () => {
        if (!inputText.trim()) {
            setError('Please generate QR code first!');
            return;
        }

        const newQR = {
            id: Date.now().toString(), // Add unique ID
            value: inputText,
            name: qrName || `QR-${Date.now()}`,
            options: {
                ...qrOptions,
                level: qrOptions.level || 'H',
                margin: qrOptions.margin || 4
            },
            logo: logo, // This is now the base64 string
            logoSize: Math.min(logoSize, 40),
            createdAt: new Date().toISOString()
        };

        addQRCode(newQR);
        setSuccess('QR code saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
    };

    // Update the handleLogoUpload function
    const handleLogoUpload = (base64String) => {
        setLogo(base64String);
    };

    const downloadQR = async (format) => {
        if (!inputText.trim() || !qrRef.current) {
            setError('Please generate QR code first!');
            return;
        }

        setIsDownloading(true);
        try {
            const fileName = qrName || 'qr-code';
            const node = qrRef.current;

            let dataUrl;
            switch (format) {
                case 'png':
                    dataUrl = await htmlToImage.toPng(node, {
                        quality: 1,
                        pixelRatio: 2
                    });
                    break;
                case 'jpg':
                    dataUrl = await htmlToImage.toJpeg(node, {
                        quality: 1,
                        pixelRatio: 2
                    });
                    break;
                case 'svg':
                    const svg = node.querySelector('svg');
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const blob = new Blob([svgData], { type: 'image/svg+xml' });
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
        } catch (error) {
            console.error('Download failed:', error);
            setError('Failed to download QR code');
        } finally {
            setIsDownloading(false);
        }
    };

    const triggerDownload = (url, name) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleColorChange = (key, value) => {
        setQrOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handlePatternChange = (patternType, value) => {
        setQrOptions(prev => ({
            ...prev,
            [patternType]: value
        }));
    };

    // const handleLogoUpload = (file) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         setLogo(e.target.result);
    //     };
    //     reader.readAsDataURL(file);
    // };

    const removeLogo = () => {
        setLogo(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto p-8 card shadow-xl"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">QR</span>
                    </div>
                    <h2 className="text-3xl font-bold text-secondary-800 dark:text-white">
                        QR Code <span className="gradient-text">Generator</span>
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex border-b dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('content')}
                            className={`px-6 py-3 font-semibold rounded-t-xl transition-all duration-200 ${activeTab === 'content' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-b-2 border-primary-500' : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300'}`}
                        >
                            Content
                        </button>
                        <button
                            onClick={() => setActiveTab('design')}
                            className={`px-6 py-3 font-semibold rounded-t-xl transition-all duration-200 ${activeTab === 'design' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-b-2 border-primary-500' : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300'}`}
                        >
                            Design
                        </button>
                        <button
                            onClick={() => setActiveTab('logo')}
                            className={`px-6 py-3 font-semibold rounded-t-xl transition-all duration-200 ${activeTab === 'logo' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-b-2 border-primary-500' : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300'}`}
                        >
                            Logo
                        </button>
                        <button
                            onClick={() => setActiveTab('templates')}
                            className={`px-6 py-3 font-semibold rounded-t-xl transition-all duration-200 ${activeTab === 'templates' ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-b-2 border-primary-500' : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300'}`}
                        >
                            Templates
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'content' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                                            QR Code Content
                                        </label>
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            placeholder="https://example.com or any text"
                                            className="input-field"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Enter the URL or text you want to encode in the QR code
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                                            QR Code Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={qrName}
                                            onChange={(e) => setQrName(e.target.value)}
                                            placeholder="My QR Code"
                                            className="input-field"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Give your QR code a name for easy identification
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'design' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ColorPicker
                                            label="Foreground Color"
                                            color={qrOptions.fgColor}
                                            onChange={(color) => handleColorChange('fgColor', color)}
                                        />
                                        <ColorPicker
                                            label="Background Color"
                                            color={qrOptions.bgColor}
                                            onChange={(color) => handleColorChange('bgColor', color)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ColorPicker
                                            label="Eye Color"
                                            color={qrOptions.eyeColor}
                                            onChange={(color) => handleColorChange('eyeColor', color)}
                                        />
                                        <ColorPicker
                                            label="Eye Ball Color"
                                            color={qrOptions.eyeBallColor}
                                            onChange={(color) => handleColorChange('eyeBallColor', color)}
                                        />
                                    </div>

                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ColorPicker
                                            label="Eye Color"
                                            color={qrOptions.eyeColor}
                                            onChange={(color) => handleColorChange('eyeColor', color)}
                                        />
                                        <ColorPicker
                                            label="Eye Ball Color"
                                            color={qrOptions.eyeBallColor}
                                            onChange={(color) => handleColorChange('eyeBallColor', color)}
                                        />
                                    </div> */}

                                    <button
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        <FiSettings className="mr-1" />
                                        {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                                    </button>

                                    {showAdvanced && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4 overflow-hidden"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Dot Style
                                                </label>
                                                <PatternPicker
                                                    selected={qrOptions.dotStyle}
                                                    onChange={(pattern) => {
                                                        setQrOptions(prev => ({
                                                            ...prev,
                                                            dotStyle: pattern
                                                        }));
                                                        // Force a re-render
                                                        setActiveTab(activeTab); // This tricks React into re-rendering
                                                    }}
                                                    patterns={[
                                                        { value: 'square', label: 'Square' },
                                                        { value: 'dots', label: 'Dots' },
                                                        { value: 'rounded', label: 'Rounded' },
                                                        { value: 'extra-rounded', label: 'Extra Rounded' },
                                                        { value: 'classy', label: 'Classy' }
                                                    ]}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Corner Style
                                                </label>
                                                <PatternPicker
                                                    selected={qrOptions.cornerStyle}
                                                    onChange={(pattern) => handlePatternChange('cornerStyle', pattern)}
                                                    patterns={[
                                                        { value: 'square', label: 'Square' },
                                                        { value: 'dot', label: 'Dot' },
                                                        { value: 'rounded', label: 'Rounded' },
                                                        { value: 'extra-rounded', label: 'Extra Rounded' }
                                                    ]}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Error Correction Level
                                                </label>
                                                <select
                                                    value={qrOptions.level}
                                                    onChange={(e) => handleColorChange('level', e.target.value)}
                                                    className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"
                                                >
                                                    <option value="L">Low (7%)</option>
                                                    <option value="M">Medium (15%)</option>
                                                    <option value="Q">Quartile (25%)</option>
                                                    <option value="H">High (30%)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Margin Size
                                                </label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="10"
                                                    value={qrOptions.margin}
                                                    onChange={(e) => handleColorChange('margin', parseInt(e.target.value))}
                                                    className="w-full"
                                                />
                                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                                    <span>0</span>
                                                    <span>{qrOptions.margin}</span>
                                                    <span>10</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'logo' && (
                                <div className="space-y-4">
                                    <LogoUpload
                                        onUpload={handleLogoUpload}
                                        currentLogo={logo}
                                        onRemove={removeLogo}
                                    />

                                    {logo && (
                                        <div>
                                            <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                                                Logo Size
                                            </label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="50"
                                                value={logoSize}
                                                onChange={(e) => setLogoSize(parseInt(e.target.value))}
                                                className="w-full accent-primary-600"
                                            />
                                            <div className="flex justify-between text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                                                <span>Small</span>
                                                <span className="font-medium">{logoSize}%</span>
                                                <span>Large</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'templates' && (
                                <QRTemplates
                                    onApplyTemplate={(templateOptions) => {
                                        setQrOptions(prev => ({
                                            ...prev,
                                            ...templateOptions
                                        }));
                                    }}
                                    currentOptions={qrOptions}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    <div className="pt-4">
                        <button
                            onClick={generateQR}
                            disabled={isGenerating}
                            className="w-full btn-primary text-lg py-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                'Generate QR Code'
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg"
                            >
                                {error}
                            </motion.p>
                        )}
                        {success && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg"
                            >
                                {success}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <div className="bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-700 dark:to-secondary-800 p-8 rounded-2xl shadow-inner border border-secondary-100 dark:border-secondary-600">
                            <h3 className="text-xl font-bold text-secondary-800 dark:text-white mb-6 text-center">QR Code Preview</h3>

                            {inputText ? (
                                <div className="flex flex-col items-center">
                                    <div
                                        ref={qrRef}
                                        className="p-4 rounded-lg border dark:border-gray-600 flex justify-center items-center mb-4"
                                        style={{
                                            backgroundColor: qrOptions.bgColor,
                                            width: '200px',  // Fixed width for container
                                            height: '200px'  // Fixed height for container
                                        }}
                                    >
                                        {/* Make QR code smaller but keep it centered */}
                                        <div style={{
                                            width: '160px',  // Smaller QR code size
                                            height: '160px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <CustomQRCode
                                                value={inputText}
                                                size={160}  // Smaller QR code
                                                fgColor={qrOptions.fgColor}
                                                bgColor="transparent"  // Make QR code background transparent
                                                dotType={qrOptions.dotStyle}
                                                cornerSquareType={qrOptions.cornerStyle}
                                                cornerDotType={qrOptions.cornerStyle}
                                                eyeColor={qrOptions.eyeColor}
                                                eyeBallColor={qrOptions.eyeBallColor}
                                                logo={logo}
                                                logoSize={logoSize}
                                                level={qrOptions.level}
                                                margin={0}  // No margin since we're handling spacing with container
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full space-y-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            {['png', 'jpg', 'svg'].map((format) => (
                                                <motion.button
                                                    key={format}
                                                    whileHover={{ y: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => downloadQR(format)}
                                                    disabled={isDownloading}
                                                    className="flex items-center dark:text-white justify-center bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 py-2 rounded-lg text-sm font-medium"
                                                >
                                                    <FiDownload className="mr-1" />
                                                    {format.toUpperCase()}
                                                </motion.button>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={saveQR}
                                            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white py-2 rounded-lg shadow-md transition-all flex items-center justify-center"
                                        >
                                            <FiSave className="mr-2" />
                                            Save QR Code
                                        </motion.button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed dark:border-gray-600">
                                    <div className="text-center p-4">
                                        <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                                        <h4 className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            No QR Code Generated
                                        </h4>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            Enter content and click "Generate" to create your QR code
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default QRGenerator;