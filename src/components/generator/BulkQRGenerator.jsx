import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiDownload, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import { useQR } from '../../context/QRContext'
import CustomQRCode from '../common/CustomQRCode'

export default function BulkQRGenerator() {
    const [bulkData, setBulkData] = useState([
        { id: 1, text: '', name: '' }
    ])
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedQRs, setGeneratedQRs] = useState([])
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
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-secondary-800 dark:text-white mb-2">
                    Bulk QR Generator
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                    Generate multiple QR codes at once for efficiency
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="card p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-secondary-800 dark:text-white">
                                QR Code Data
                            </h3>
                            <div className="flex gap-2">
                                <label className="btn-secondary text-sm px-4 py-2 cursor-pointer">
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
                                    className="btn-primary text-sm px-4 py-2"
                                >
                                    <FiPlus className="mr-2" size={16} />
                                    Add Row
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            <AnimatePresence>
                                {bulkData.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="grid grid-cols-12 gap-2 items-center"
                                    >
                                        <div className="col-span-1 text-sm font-medium text-secondary-600 dark:text-secondary-400">
                                            {index + 1}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="QR Name"
                                            value={item.name}
                                            onChange={(e) => updateRow(item.id, 'name', e.target.value)}
                                            className="col-span-4 input-field text-sm py-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="URL or Text"
                                            value={item.text}
                                            onChange={(e) => updateRow(item.id, 'text', e.target.value)}
                                            className="col-span-6 input-field text-sm py-2"
                                        />
                                        <button
                                            onClick={() => removeRow(item.id)}
                                            className="col-span-1 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            disabled={bulkData.length === 1}
                                        >
                                            <FiX size={16} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-6 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                            <button
                                onClick={generateBulkQRs}
                                disabled={isGenerating}
                                className="w-full btn-primary py-3 disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Generating...
                                    </>
                                ) : (
                                    `Generate ${bulkData.filter(item => item.text.trim()).length} QR Codes`
                                )}
                            </button>
                        </div>
                    </div>

                    {/* CSV Format Help */}
                    <div className="card p-4">
                        <h4 className="font-semibold text-secondary-800 dark:text-white mb-2">
                            CSV Format
                        </h4>
                        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                            Upload a CSV file with the following format:
                        </p>
                        <code className="text-xs bg-secondary-100 dark:bg-secondary-700 p-2 rounded block">
                            Name,URL<br/>
                            Website,https://example.com<br/>
                            Contact,tel:+1234567890
                        </code>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="card p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-secondary-800 dark:text-white">
                                Generated QR Codes ({generatedQRs.length})
                            </h3>
                            {generatedQRs.length > 0 && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={saveAllQRs}
                                        className="btn-secondary text-sm px-4 py-2"
                                    >
                                        Save All
                                    </button>
                                    <button
                                        onClick={downloadAllQRs}
                                        className="btn-primary text-sm px-4 py-2"
                                    >
                                        <FiDownload className="mr-2" size={16} />
                                        Download All
                                    </button>
                                </div>
                            )}
                        </div>

                        {generatedQRs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                {generatedQRs.map((qr, index) => (
                                    <motion.div
                                        key={qr.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="card p-4 text-center"
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
                                        <h4 className="font-medium text-secondary-800 dark:text-white text-sm mb-1">
                                            {qr.name}
                                        </h4>
                                        <p className="text-xs text-secondary-600 dark:text-secondary-400 truncate">
                                            {qr.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-700 rounded-full flex items-center justify-center mx-auto mb-4">
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