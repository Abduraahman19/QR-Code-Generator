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
            className="p-6 mx-auto max-w-7xl"
        >
            {/* Header and filter sections remain the same */}
            <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                            <span className="text-sm font-bold text-white">QR</span>
                        </div>
                        <h2 className="text-3xl font-bold text-secondary-800 dark:text-white">
                            My <span className="gradient-text">QR Codes</span>
                        </h2>
                    </div>
                    <span className="px-4 py-2 text-sm font-semibold border rounded-full bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-800 dark:text-primary-200 border-primary-200 dark:border-primary-700">
                        {qrCodes.length} {qrCodes.length === 1 ? 'QRcode' : 'QRcodes'}
                    </span>
                </div>

                <div className="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search QR codes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="p-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
                        className="p-2 text-sm border rounded-lg border-secondary-300 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence>
                        {filteredQRCodes.map((qr) => (
                            <motion.div
                                key={qr.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="p-6 transition-all duration-300 card card-hover group"
                            >
                                <div className="relative group">
                                    <div
                                        id={`qr-${qr.id}`}
                                        className="flex justify-center p-4 mb-3 rounded-lg"
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

                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100">
                                        <button
                                            onClick={() => openDetailsModal(qr)}
                                            className="p-2 text-gray-800 transition-colors bg-white rounded-full hover:bg-gray-100"
                                            title="View Details"
                                        >
                                            <FiEye size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between mb-2">
                                    <h3
                                        className="flex-1 px-2 font-medium text-center truncate dark:text-white"
                                        title={qr.name}
                                    >
                                        {qr.name}
                                    </h3>
                                </div>

                                <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span>
                                        {new Date(qr.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center">
                                        {qr.logo && (
                                            <span className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                        )}
                                        {qr.logo ? 'With Logo' : 'No Logo'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <select
                                        value={selectedFormat}
                                        onChange={(e) => setSelectedFormat(e.target.value)}
                                        className="p-1 text-xs border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-700 dark:text-white"
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
                                                <span className="absolute px-2 py-1 -mt-8 -ml-2 text-xs text-white bg-gray-800 rounded">
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