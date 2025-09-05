import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCamera, FiUpload, FiX, FiCopy, FiExternalLink } from 'react-icons/fi'

export default function QRScanner() {
    const [isScanning, setIsScanning] = useState(false)
    const [scannedData, setScannedData] = useState(null)
    const [error, setError] = useState('')
    const [scanHistory, setScanHistory] = useState([])
    const videoRef = useRef(null)
    const fileInputRef = useRef(null)

    const mockScanResult = () => {
        const mockResults = [
            'https://qrcraft.com',
            'Hello World!',
            'tel:+1234567890',
            'mailto:test@example.com',
            'WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;'
        ]
        return mockResults[Math.floor(Math.random() * mockResults.length)]
    }

    const startScanning = async () => {
        try {
            setError('')
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            })
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setIsScanning(true)
                
                setTimeout(() => {
                    const result = mockScanResult()
                    handleScanResult(result)
                    stopScanning()
                }, 3000)
            }
        } catch (err) {
            setError('Camera access denied or not available')
        }
    }

    const stopScanning = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
            videoRef.current.srcObject = null
        }
        setIsScanning(false)
    }

    const handleScanResult = (data) => {
        const result = {
            id: Date.now(),
            data,
            timestamp: new Date().toISOString(),
            type: detectQRType(data)
        }
        
        setScannedData(result)
        setScanHistory(prev => [result, ...prev.slice(0, 9)])
    }

    const detectQRType = (data) => {
        if (data.startsWith('http')) return 'URL'
        if (data.startsWith('tel:')) return 'Phone'
        if (data.startsWith('mailto:')) return 'Email'
        if (data.startsWith('WIFI:')) return 'WiFi'
        if (data.startsWith('BEGIN:VCARD')) return 'Contact'
        if (data.startsWith('geo:')) return 'Location'
        return 'Text'
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setTimeout(() => {
                const result = mockScanResult()
                handleScanResult(result)
            }, 1000)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    const openLink = (data) => {
        if (data.startsWith('http')) {
            window.open(data, '_blank')
        } else if (data.startsWith('tel:')) {
            window.location.href = data
        } else if (data.startsWith('mailto:')) {
            window.location.href = data
        }
    }

    useEffect(() => {
        return () => {
            stopScanning()
        }
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-secondary-800 dark:text-white mb-2">
                    QR Code Scanner
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                    Scan QR codes using your camera or upload an image
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-4">
                            Camera Scanner
                        </h3>
                        
                        <div className="relative bg-secondary-100 dark:bg-secondary-800 rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '1' }}>
                            {isScanning ? (
                                <div className="relative w-full h-full">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 border-4 border-primary-500 rounded-xl">
                                        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary-500"></div>
                                        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary-500"></div>
                                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary-500"></div>
                                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary-500"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <FiCamera className="mx-auto mb-4 text-secondary-400" size={48} />
                                        <p className="text-secondary-600 dark:text-secondary-400">
                                            Camera preview will appear here
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            {!isScanning ? (
                                <button
                                    onClick={startScanning}
                                    className="flex-1 btn-primary py-3"
                                >
                                    <FiCamera className="mr-2" />
                                    Start Scanning
                                </button>
                            ) : (
                                <button
                                    onClick={stopScanning}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                                >
                                    <FiX className="mr-2" />
                                    Stop Scanning
                                </button>
                            )}
                            
                            <label className="btn-secondary py-3 px-6 cursor-pointer">
                                <FiUpload className="mr-2" />
                                Upload
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {scannedData && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="card p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-secondary-800 dark:text-white">
                                        Scan Result
                                    </h3>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                        {scannedData.type}
                                    </span>
                                </div>
                                
                                <div className="bg-secondary-50 dark:bg-secondary-800/50 rounded-xl p-4 mb-4">
                                    <p className="text-secondary-800 dark:text-secondary-200 break-all">
                                        {scannedData.data}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyToClipboard(scannedData.data)}
                                        className="btn-secondary text-sm px-4 py-2"
                                    >
                                        <FiCopy className="mr-2" size={16} />
                                        Copy
                                    </button>
                                    
                                    {(scannedData.data.startsWith('http') || 
                                      scannedData.data.startsWith('tel:') || 
                                      scannedData.data.startsWith('mailto:')) && (
                                        <button
                                            onClick={() => openLink(scannedData.data)}
                                            className="btn-primary text-sm px-4 py-2"
                                        >
                                            <FiExternalLink className="mr-2" size={16} />
                                            Open
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="card p-6">
                        <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-4">
                            Scan History
                        </h3>
                        
                        {scanHistory.length > 0 ? (
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {scanHistory.map((scan) => (
                                    <div
                                        key={scan.id}
                                        className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                                                    {scan.type}
                                                </span>
                                                <span className="text-xs text-secondary-500 dark:text-secondary-400">
                                                    {new Date(scan.timestamp).toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-secondary-700 dark:text-secondary-300 truncate">
                                                {scan.data}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setScannedData(scan)}
                                            className="ml-3 p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                        >
                                            <FiExternalLink size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FiCamera className="mx-auto mb-3 text-secondary-400" size={32} />
                                <p className="text-secondary-600 dark:text-secondary-400">
                                    No scans yet. Start scanning to see history.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}