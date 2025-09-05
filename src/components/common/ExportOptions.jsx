import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiPrinter, FiShare2, FiMail } from 'react-icons/fi'

export default function ExportOptions({ qrCode, onExport }) {
    const [exportFormat, setExportFormat] = useState('png')
    const [exportSize, setExportSize] = useState(512)
    const [includeText, setIncludeText] = useState(true)
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')

    const formats = [
        { value: 'png', label: 'PNG', description: 'Best for web use' },
        { value: 'jpg', label: 'JPG', description: 'Smaller file size' },
        { value: 'svg', label: 'SVG', description: 'Vector format' },
        { value: 'pdf', label: 'PDF', description: 'Print ready' }
    ]

    const sizes = [
        { value: 256, label: 'Small (256px)' },
        { value: 512, label: 'Medium (512px)' },
        { value: 1024, label: 'Large (1024px)' },
        { value: 2048, label: 'Extra Large (2048px)' }
    ]

    const handleExport = () => {
        onExport({
            format: exportFormat,
            size: exportSize,
            includeText,
            backgroundColor,
            qrCode
        })
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        printWindow.document.write(`
            <html>
                <head><title>QR Code - ${qrCode.name}</title></head>
                <body style="text-align: center; padding: 50px;">
                    <h2>${qrCode.name}</h2>
                    <div id="qr-container"></div>
                    ${includeText ? `<p style="margin-top: 20px; word-break: break-all;">${qrCode.value}</p>` : ''}
                </body>
            </html>
        `)
        printWindow.document.close()
        printWindow.print()
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `QR Code - ${qrCode.name}`,
                    text: qrCode.value,
                    url: window.location.href
                })
            } catch (err) {
                console.log('Share cancelled')
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(qrCode.value)
            alert('QR code data copied to clipboard!')
        }
    }

    const handleEmail = () => {
        const subject = encodeURIComponent(`QR Code - ${qrCode.name}`)
        const body = encodeURIComponent(`Check out this QR code: ${qrCode.value}`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-4">
                    Export Options
                </h3>
            </div>

            {/* Format Selection */}
            <div>
                <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-3">
                    Export Format
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formats.map((format) => (
                        <motion.button
                            key={format.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setExportFormat(format.value)}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                                exportFormat === format.value
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300 bg-white dark:bg-secondary-800'
                            }`}
                        >
                            <p className={`font-semibold ${
                                exportFormat === format.value ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'
                            }`}>
                                {format.label}
                            </p>
                            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                                {format.description}
                            </p>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-3">
                    Export Size
                </label>
                <select
                    value={exportSize}
                    onChange={(e) => setExportSize(parseInt(e.target.value))}
                    className="input-field"
                >
                    {sizes.map((size) => (
                        <option key={size.value} value={size.value}>
                            {size.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                        Include QR data as text
                    </label>
                    <button
                        onClick={() => setIncludeText(!includeText)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                            includeText ? 'bg-primary-600' : 'bg-secondary-300 dark:bg-secondary-600'
                        }`}
                    >
                        <motion.div
                            animate={{ x: includeText ? 24 : 0 }}
                            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                        />
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                        Background Color
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-12 h-10 rounded-lg border border-secondary-300 dark:border-secondary-600"
                        />
                        <input
                            type="text"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="flex-1 input-field"
                            placeholder="#ffffff"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <button
                    onClick={handleExport}
                    className="btn-primary py-3 text-sm"
                >
                    <FiDownload className="mr-2" size={16} />
                    Download
                </button>
                
                <button
                    onClick={handlePrint}
                    className="btn-secondary py-3 text-sm"
                >
                    <FiPrinter className="mr-2" size={16} />
                    Print
                </button>
                
                <button
                    onClick={handleShare}
                    className="btn-secondary py-3 text-sm"
                >
                    <FiShare2 className="mr-2" size={16} />
                    Share
                </button>
                
                <button
                    onClick={handleEmail}
                    className="btn-secondary py-3 text-sm"
                >
                    <FiMail className="mr-2" size={16} />
                    Email
                </button>
            </div>
        </div>
    )
}