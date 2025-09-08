import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiDownload, FiTrash2, FiPlus, FiX, FiFileText, FiCheckCircle, FiAlertCircle, FiCopy, FiEye } from 'react-icons/fi'
import { useQR } from '../../context/QRContext'
import CustomQRCode from '../common/CustomQRCode'

export default function BulkQRGenerator() {
    const [bulkData, setBulkData] = useState([
        { id: 1, text: '', name: '' }
    ])
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedQRs, setGeneratedQRs] = useState([])
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [previewQR, setPreviewQR] = useState(null)
    const { addQRCode } = useQR()

    const [bulkOptions] = useState({
        size: 256,
        bgColor: '#ffffff',
        fgColor: '#000000',
        level: 'H',
        dotStyle: 'square',
        cornerStyle: 'square',
        eyeColor: '#000000',
        eyeBallColor: '#000000'
    })

    const addRow = () => {
        setBulkData(prev => [...prev, {
            id: Date.now(),
            text: '',
            name: ''
        }])
    }

    const removeRow = (id) => {
        setBulkData(prev => prev.filter(item => item.id !== id))
    }

    const updateRow = (id, field, value) => {
        setBulkData(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ))
    }

    const handleCSVUpload = (event) => {
        const file = event.target.files[0]
        if (file && file.type === 'text/csv') {
            const reader = new FileReader()
            reader.onload = (e) => {
                const csv = e.target.result
                const lines = csv.split('\n')
                const newData = lines
                    .filter(line => line.trim())
                    .map((line, index) => {
                        const [name, text] = line.split(',').map(item => item.trim())
                        return {
                            id: Date.now() + index,
                            name: name || `QR-${index + 1}`,
                            text: text || name || ''
                        }
                    })
                setBulkData(newData)
            }
            reader.readAsText(file)
        }
    }

    const generateBulkQRs = async () => {
        const validData = bulkData.filter(item => item.text.trim())
        if (validData.length === 0) {
            alert('Please add at least one valid QR code data')
            return
        }

        setIsGenerating(true)

        // Simulate generation delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const generated = validData.map(item => ({
            ...item,
            options: bulkOptions,
            createdAt: new Date().toISOString()
        }))

        setGeneratedQRs(generated)
        setIsGenerating(false)
    }

    const saveAllQRs = () => {
        generatedQRs.forEach(qr => {
            addQRCode({
                value: qr.text,
                name: qr.name,
                options: qr.options
            })
        })
        alert(`${generatedQRs.length} QR codes saved successfully!`)
    }

    const downloadAllQRs = () => {
        // In a real app, this would generate a ZIP file with all QR codes
        alert('Bulk download feature would be available in the full version')
    }

    return (
        <div className="p-4 mx-auto max-w-7xl md:p-8">
            <div className="mb-8 text-center">
                <h2 className="mb-3 text-4xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text">
                    Professional Bulk QR Generator
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                    Generate multiple QR codes efficiently with batch processing
                </p>
            </div>

            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center p-4 mb-6 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-xl"
                    >
                        <FiCheckCircle className="mr-3 text-green-500" size={20} />
                        <span className="text-green-700 dark:text-green-300">{successMessage}</span>
                    </motion.div>
                )}
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center p-4 mb-6 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-xl"
                    >
                        <FiAlertCircle className="mr-3 text-red-500" size={20} />
                        <span className="text-red-700 dark:text-red-300">{errorMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="p-6 card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-secondary-800 dark:text-white">
                                QR Code Data
                            </h3>
                            <div className="flex items-center gap-2">
                                <label className="flex items-center px-4 py-2 text-sm cursor-pointer btn-secondary">
                                    <FiUpload className="mr-2" size={16} />
                                    Import CSV
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleCSVUpload}
                                        className="hidden"
                                    />
                                </label>
                                <button
                                    onClick={addRow}
                                    className="flex items-center px-4 py-2 text-sm btn-primary"
                                >
                                    <FiPlus className="mr-2" size={16} />
                                    Add Row
                                </button>
                            </div>

                        </div>

                        <div className="space-y-3 overflow-y-auto max-h-96">
                            <AnimatePresence>
                                {bulkData.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="grid items-center grid-cols-12 gap-2"
                                    >
                                        <div className="col-span-1 text-sm font-medium text-secondary-600 dark:text-secondary-400">
                                            {index + 1}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="QR Name"
                                            value={item.name}
                                            onChange={(e) => updateRow(item.id, 'name', e.target.value)}
                                            className="col-span-4 py-2 text-sm input-field"
                                        />
                                        <input
                                            type="text"
                                            placeholder="URL or Text"
                                            value={item.text}
                                            onChange={(e) => updateRow(item.id, 'text', e.target.value)}
                                            className="col-span-6 py-2 text-sm input-field"
                                        />
                                        <button
                                            onClick={() => removeRow(item.id)}
                                            className="col-span-1 p-2 text-red-500 transition-colors rounded-lg hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            disabled={bulkData.length === 1}
                                        >
                                            <FiX size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="pt-4 mt-6 border-t border-secondary-200 dark:border-secondary-700">
                            <button
                                onClick={generateBulkQRs}
                                disabled={isGenerating}
                                className="w-full py-3 btn-primary disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    `Generate ${bulkData.filter(item => item.text.trim()).length} QR Codes`
                                )}
                            </button>
                        </div>
                    </div>

                    {/* CSV Format Help */}
                    <div className="p-4 card">
                        <h4 className="mb-2 font-semibold text-secondary-800 dark:text-white">
                            CSV Format
                        </h4>
                        <p className="mb-2 text-sm text-secondary-600 dark:text-secondary-400">
                            Upload a CSV file with the following format:
                        </p>
                        <code className="block p-2 text-xs rounded dark:text-white bg-secondary-100 dark:bg-secondary-700">
                            Name,URL<br />
                            Website,https://example.com<br />
                            Contact,tel:+1234567890
                        </code>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="p-6 card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-secondary-800 dark:text-white">
                                Generated QR Codes ({generatedQRs.length})
                            </h3>
                            {generatedQRs.length > 0 && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={saveAllQRs}
                                        className="px-4 py-2 text-sm btn-secondary"
                                    >
                                        Save All
                                    </button>
                                    <button
                                        onClick={downloadAllQRs}
                                        className="px-4 py-2 text-sm btn-primary"
                                    >
                                        <FiDownload className="mr-2" size={16} />
                                        Download All
                                    </button>
                                </div>
                            )}
                        </div>

                        {generatedQRs.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 max-h-96">
                                {generatedQRs.map((qr, index) => (
                                    <motion.div
                                        key={qr.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 text-center card"
                                    >
                                        <div className="mb-3">
                                            <CustomQRCode
                                                value={qr.text}
                                                size={120}
                                                fgColor={qr.options.fgColor}
                                                bgColor={qr.options.bgColor}
                                                dotType={qr.options.dotStyle}
                                                cornerSquareType={qr.options.cornerStyle}
                                                eyeColor={qr.options.eyeColor}
                                                eyeBallColor={qr.options.eyeBallColor}
                                            />
                                        </div>
                                        <h4 className="mb-1 text-sm font-medium text-secondary-800 dark:text-white">
                                            {qr.name}
                                        </h4>
                                        <p className="text-xs truncate text-secondary-600 dark:text-secondary-400">
                                            {qr.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-100 dark:bg-secondary-700">
                                    <FiDownload className="text-secondary-400" size={24} />
                                </div>
                                <p className="text-secondary-600 dark:text-secondary-400">
                                    Generated QR codes will appear here
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}