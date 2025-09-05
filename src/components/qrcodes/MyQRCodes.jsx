import { useState, useRef } from 'react';
import { useQR } from '../../context/QRContext';
import { FiDownload, FiTrash2, FiSearch, FiEdit2, FiCopy, FiEye } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import * as htmlToImage from 'html-to-image';
import CustomQRCode from '../common/CustomQRCode';
import QRCodeDetailsModal from './QRCodeDetailsModal';
import EmptyState from '../common/EmptyState';
import QRAnalytics from '../common/QRAnalytics';

const MyQRCodes = () => {
    const { qrCodes, deleteQRCode, updateQRCode } = useQR();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('png');
    const [selectedQR, setSelectedQR] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState('newest');
    const [filterOption, setFilterOption] = useState('all');
    const [copiedId, setCopiedId] = useState(null);
    const [showAnalytics, setShowAnalytics] = useState(false);

    const filteredQRCodes = qrCodes
        .filter(qr => {
            const matchesSearch =
                qr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                qr.value.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter =
                filterOption === 'all' ||
                (filterOption === 'withLogo' && qr.logo) ||
                (filterOption === 'withoutLogo' && !qr.logo);

            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortOption === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortOption === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

    const downloadQR = async (qr, format) => {
        setIsDownloading(true);
        try {
            const element = document.getElementById(`qr-${qr.id}`);
            if (!element) throw new Error('QR element not found');

            const fileName = qr.name || `qr-code-${qr.id}`;
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

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const openDetailsModal = (qr) => {
        setSelectedQR(qr);
        setIsModalOpen(true);
    };

    const handleUpdateQR = (updatedQR) => {
        updateQRCode(updatedQR.id, updatedQR);
        setIsModalOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto p-6"
        >
            {/* Header and filter sections remain the same */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">QR</span>
                        </div>
                        <h2 className="text-3xl font-bold text-secondary-800 dark:text-white">
                            My <span className="gradient-text">QR Codes</span>
                        </h2>
                    </div>
                    <span className="bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-800 dark:text-primary-200 text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 dark:border-primary-700">
                        {qrCodes.length} {qrCodes.length === 1 ? 'QRcode' : 'QRcodes'}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search QR codes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="text-sm p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name">By Name</option>
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Filter:</label>
                    <select
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className="text-sm p-2 border border-secondary-300 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white rounded-lg"
                    >
                        <option value="all">All QR Codes</option>
                        <option value="withLogo">With Logo</option>
                        <option value="withoutLogo">Without Logo</option>
                    </select>
                    <button
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className={`btn-secondary text-sm px-4 py-2 ${showAnalytics ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : ''}`}
                    >
                        {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                    </button>
                </div>
            </div>

            {/* Analytics Section */}
            {showAnalytics && qrCodes.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8"
                >
                    <QRAnalytics qrCode={qrCodes[0]} />
                </motion.div>
            )}

            {filteredQRCodes.length === 0 ? (
                <EmptyState
                    searchTerm={searchTerm}
                    filterOption={filterOption}
                    totalQRCodes={qrCodes.length}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredQRCodes.map((qr) => (
                            <motion.div
                                key={qr.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="card card-hover p-6 group transition-all duration-300"
                            >
                                <div className="relative group">
                                    <div
                                        id={`qr-${qr.id}`}
                                        className="flex justify-center mb-3 p-4 rounded-lg"
                                        style={{
                                            backgroundColor: qr.options?.bgColor || '#ffffff',
                                            width: '100%',
                                            minHeight: '200px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div style={{ 
                                            width: '150px', 
                                            height: '150px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <CustomQRCode
                                                value={qr.value}
                                                size={150}
                                                fgColor={qr.options?.fgColor || '#000000'}
                                                bgColor="transparent"
                                                dotType={qr.options?.dotStyle || 'square'}
                                                cornerSquareType={qr.options?.cornerStyle || 'square'}
                                                cornerDotType={qr.options?.cornerStyle || 'square'}
                                                eyeColor={qr.options?.eyeColor || qr.options?.fgColor || '#000000'}
                                                eyeBallColor={qr.options?.eyeBallColor || qr.options?.fgColor || '#000000'}
                                                logo={qr.logo}
                                                logoSize={qr.logoSize || 25}
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <button
                                            onClick={() => openDetailsModal(qr)}
                                            className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                                            title="View Details"
                                        >
                                            <FiEye size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-2">
                                    <h3
                                        className="font-medium text-center flex-1 truncate px-2 dark:text-white"
                                        title={qr.name}
                                    >
                                        {qr.name}
                                    </h3>
                                </div>

                                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    <span>
                                        {new Date(qr.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center">
                                        {qr.logo && (
                                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                                        )}
                                        {qr.logo ? 'With Logo' : 'No Logo'}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <select
                                        value={selectedFormat}
                                        onChange={(e) => setSelectedFormat(e.target.value)}
                                        className="text-xs p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded"
                                        disabled={isDownloading}
                                    >
                                        <option value="png">PNG</option>
                                        <option value="jpg">JPG</option>
                                        <option value="svg">SVG</option>
                                    </select>

                                    <div className="flex space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => copyToClipboard(qr.value, qr.id)}
                                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                            title="Copy Content"
                                        >
                                            <FiCopy size={16} />
                                            {copiedId === qr.id && (
                                                <span className="absolute -mt-8 -ml-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                                    Copied!
                                                </span>
                                            )}
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => downloadQR(qr, selectedFormat)}
                                            disabled={isDownloading}
                                            className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50"
                                            title="Download"
                                        >
                                            <FiDownload size={16} />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => deleteQRCode(qr.id)}
                                            className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                            title="Delete"
                                        >
                                            <FiTrash2 size={16} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {isModalOpen && selectedQR && (
                <QRCodeDetailsModal
                    qrCode={selectedQR}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleUpdateQR}
                />
            )}
        </motion.div>
    );
};

export default MyQRCodes;