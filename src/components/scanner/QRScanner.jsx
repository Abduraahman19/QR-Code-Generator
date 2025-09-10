import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCamera, FiUpload, FiX, FiCopy, FiExternalLink, FiWifi, FiPhone, FiMail, FiMapPin, FiUser, FiLink, FiType, FiCheckCircle, FiAlertCircle, FiTrash2 } from 'react-icons/fi'
import jsQR from 'jsqr'
import { validateQRData, formatQRData, enhanceImageForQR } from '../../utils/qrUtils'

export default function QRScanner() {
    const [isScanning, setIsScanning] = useState(false)
    const [scannedData, setScannedData] = useState(null)
    const [error, setError] = useState('')
    const [scanHistory, setScanHistory] = useState(() => {
        const saved = localStorage.getItem('qr-scan-history')
        return saved ? JSON.parse(saved) : []
    })
    const [isProcessing, setIsProcessing] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const fileInputRef = useRef(null)
    const scanIntervalRef = useRef(null)

    const scanQRCode = useCallback(() => {
        if (!videoRef.current || !canvasRef.current || !isScanning) return

        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const { videoWidth, videoHeight } = video
            canvas.width = videoWidth
            canvas.height = videoHeight

            ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
            const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight)

            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            })

            if (code && code.data) {
                handleScanResult(code.data)
                stopScanning()
                return
            }

            const invertedCode = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "onlyInvert",
            })

            if (invertedCode && invertedCode.data) {
                handleScanResult(invertedCode.data)
                stopScanning()
            }
        }
    }, [isScanning])

    const startScanning = async () => {
        try {
            setError('')
            setIsProcessing(true)

            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera not supported in this browser')
            }

            const constraints = [
                {
                    video: {
                        facingMode: { exact: 'environment' },
                        width: { ideal: 1920, min: 640 },
                        height: { ideal: 1080, min: 480 },
                        frameRate: { ideal: 30, min: 15 }
                    }
                },
                {
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1280, min: 640 },
                        height: { ideal: 720, min: 480 }
                    }
                },
                {
                    video: {
                        width: { ideal: 1280, min: 640 },
                        height: { ideal: 720, min: 480 }
                    }
                },
                { video: true }
            ]

            let stream = null

            for (const constraint of constraints) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia(constraint)
                    break
                } catch (err) {
                    console.log('Constraint failed:', constraint, err)
                    continue
                }
            }

            if (!stream) {
                throw new Error('Unable to access camera with any configuration')
            }

            if (videoRef.current) {
                videoRef.current.srcObject = stream

                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play()
                    setIsScanning(true)
                    setIsProcessing(false)

                    scanIntervalRef.current = setInterval(scanQRCode, 150)
                }
            }
        } catch (err) {
            setIsProcessing(false)
            console.error('Camera error:', err)

            if (err.name === 'NotAllowedError') {
                setError('Camera permission denied. Please allow camera access and refresh the page.')
            } else if (err.name === 'NotFoundError') {
                setError('No camera found. Please connect a camera and try again.')
            } else if (err.name === 'NotReadableError') {
                setError('Camera is being used by another application. Please close other apps and try again.')
            } else {
                setError(`Camera error: ${err.message || 'Please check your camera settings and try again.'}`)
            }
        }
    }

    const stopScanning = () => {
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current)
            scanIntervalRef.current = null
        }

        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
            videoRef.current.srcObject = null
        }
        setIsScanning(false)
    }

    const handleScanResult = (rawData) => {
        if (!validateQRData(rawData)) {
            setError('Invalid QR code data detected')
            return
        }

        const formattedData = formatQRData(rawData)
        const result = {
            id: Date.now(),
            data: formattedData,
            timestamp: new Date().toISOString(),
            type: detectQRType(formattedData)
        }

        setScannedData(result)
        const newHistory = [result, ...scanHistory.slice(0, 19)]
        setScanHistory(newHistory)
        localStorage.setItem('qr-scan-history', JSON.stringify(newHistory))

        setSuccessMessage('QR Code scanned successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
    }

    const detectQRType = (data) => {
        if (!data || typeof data !== 'string') return 'Text'

        const trimmedData = data.trim()

        if (trimmedData.match(/^https?:\/\//i)) return 'URL'
        if (trimmedData.match(/^www\./i)) return 'URL'
        if (trimmedData.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)) return 'URL'

        if (trimmedData.startsWith('tel:')) return 'Phone'
        if (trimmedData.startsWith('mailto:')) return 'Email'
        if (trimmedData.startsWith('sms:')) return 'SMS'

        if (trimmedData.startsWith('WIFI:')) return 'WiFi'

        if (trimmedData.startsWith('BEGIN:VCARD') || trimmedData.startsWith('MECARD:')) return 'Contact'

        if (trimmedData.match(/^geo:/i)) return 'Location'

        if (trimmedData.match(/^(facebook|twitter|instagram|linkedin|youtube|tiktok)\./i)) return 'Social'

        if (trimmedData.match(/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/)) return 'Email'

        if (trimmedData.match(/^[+]?[\d\s\-\(\)]{10,}$/)) return 'Phone'

        if (trimmedData.match(/^(bitcoin:|ethereum:|litecoin:)/i)) return 'Crypto'

        if (trimmedData.match(/(play\.google\.com|apps\.apple\.com|microsoft\.com\/store)/i)) return 'App'

        if (trimmedData.startsWith('BEGIN:VEVENT')) return 'Event'

        return 'Text'
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]
        if (!file || !file.type.startsWith('image/')) {
            setError('Please select a valid image file (PNG, JPG, JPEG, GIF, BMP, WebP)')
            return
        }

        setIsProcessing(true)
        setError('')

        try {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()

            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                const code = jsQR(imageData.data, imageData.width, imageData.height)

                setIsProcessing(false)

                if (code && code.data) {
                    handleScanResult(code.data)
                } else {
                    setError('No QR code found in the image. Please try a clearer image.')
                }

                URL.revokeObjectURL(img.src)
            }

            img.onerror = () => {
                setIsProcessing(false)
                setError('Failed to load image. Please try again.')
                URL.revokeObjectURL(img.src)
            }

            img.src = URL.createObjectURL(file)
        } catch (err) {
            setIsProcessing(false)
            setError('Error processing image. Please try again.')
        }

        event.target.value = ''
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            setSuccessMessage('Copied to clipboard!')
            setTimeout(() => setSuccessMessage(''), 2000)
        } catch (err) {
            setError('Failed to copy to clipboard')
        }
    }

    const openLink = (data) => {
        try {
            if (data.match(/^https?:\/\//)) {
                window.open(data, '_blank', 'noopener,noreferrer')
            } else if (data.startsWith('tel:')) {
                window.location.href = data
            } else if (data.startsWith('mailto:') || data.match(/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/)) {
                window.location.href = data.startsWith('mailto:') ? data : `mailto:${data}`
            } else if (data.startsWith('sms:')) {
                window.location.href = data
            } else if (data.match(/^geo:/)) {
                window.open(`https://maps.google.com/?q=${encodeURIComponent(data.replace('geo:', ''))}`, '_blank')
            }
        } catch (err) {
            setError('Failed to open link')
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case 'URL': return <FiLink className="text-blue-500" size={16} />
            case 'Phone': return <FiPhone className="text-green-500" size={16} />
            case 'Email': return <FiMail className="text-purple-500" size={16} />
            case 'WiFi': return <FiWifi className="text-cyan-500" size={16} />
            case 'Contact': return <FiUser className="text-orange-500" size={16} />
            case 'Location': return <FiMapPin className="text-red-500" size={16} />
            case 'SMS': return <FiPhone className="text-yellow-500" size={16} />
            case 'Social': return <FiLink className="text-pink-500" size={16} />
            case 'Crypto': return <FiLink className="text-amber-500" size={16} />
            case 'App': return <FiLink className="text-indigo-500" size={16} />
            case 'Event': return <FiUser className="text-teal-500" size={16} />
            default: return <FiType className="text-gray-500" size={16} />
        }
    }

    const clearHistory = () => {
        setScanHistory([])
        localStorage.removeItem('qr-scan-history')
        setSuccessMessage('History cleared!')
        setTimeout(() => setSuccessMessage(''), 2000)
    }

    useEffect(() => {
        return () => {
            stopScanning()
        }
    }, [])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [error])

    return (
        <div className="p-4 mx-auto max-w-7xl md:p-8">
            <div className="mb-8 text-center">
                <h2 className="mb-3 text-4xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text">
                    Professional QR Scanner
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                    Advanced QR code detection with real-time scanning
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
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center p-4 mb-6 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-xl"
                    >
                        <FiAlertCircle className="mr-3 text-red-500" size={20} />
                        <span className="text-red-700 dark:text-red-300">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                    <div className="p-6 card">
                        <h3 className="mb-4 text-lg font-semibold text-secondary-800 dark:text-white">
                            Camera Scanner
                        </h3>

                        <div className="relative mb-4 overflow-hidden bg-black rounded-xl" style={{ aspectRatio: '4/3' }}>
                            {isScanning ? (
                                <div className="relative w-full h-full">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="object-cover w-full h-full bg-black"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="relative">
                                            <div className="relative w-64 h-64 border-2 border-primary-400 rounded-2xl">
                                                <div className="absolute w-6 h-6 border-t-4 border-l-4 rounded-tl-lg -top-1 -left-1 border-primary-500"></div>
                                                <div className="absolute w-6 h-6 border-t-4 border-r-4 rounded-tr-lg -top-1 -right-1 border-primary-500"></div>
                                                <div className="absolute w-6 h-6 border-b-4 border-l-4 rounded-bl-lg -bottom-1 -left-1 border-primary-500"></div>
                                                <div className="absolute w-6 h-6 border-b-4 border-r-4 rounded-br-lg -bottom-1 -right-1 border-primary-500"></div>

                                                <div className="absolute overflow-hidden inset-2 rounded-xl">
                                                    <div className="scan-line w-full h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-lg shadow-primary-500/50"></div>
                                                </div>
                                            </div>

                                            <div className="absolute text-center transform -translate-x-1/2 -bottom-12 left-1/2">
                                                <p className="px-3 py-1 text-sm text-white rounded-full bg-black/50">
                                                    Position QR code within the frame
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <canvas ref={canvasRef} className="hidden" />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full bg-secondary-100 dark:bg-secondary-800">
                                    <div className="text-center">
                                        <FiCamera className="mx-auto mb-4 text-secondary-400" size={48} />
                                        <p className="text-secondary-600 dark:text-secondary-400">
                                            {isProcessing ? 'Initializing camera...' : 'Camera preview will appear here'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            {!isScanning ? (
                                <button
                                    onClick={startScanning}
                                    disabled={isProcessing}
                                    className="flex items-center justify-center flex-1 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FiCamera className="mr-2" />
                                    {isProcessing ? "Starting..." : "Start Scanning"}
                                </button>
                            ) : (
                                <button
                                    onClick={stopScanning}
                                    className="flex items-center justify-center flex-1 px-6 py-3 font-medium text-white transition-colors bg-red-600 hover:bg-red-700 rounded-xl"
                                >
                                    <FiX className="mr-2" />
                                    Stop Scanning
                                </button>
                            )}

                            <label className="flex items-center justify-center px-6 py-3 cursor-pointer btn-secondary disabled:opacity-50">
                                <FiUpload className="mr-2" />
                                {isProcessing ? "Processing..." : "Upload"}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,.png,.jpg,.jpeg,.gif,.bmp,.webp"
                                    onChange={handleFileUpload}
                                    disabled={isProcessing}
                                    className="hidden"
                                />
                            </label>
                        </div>

                    </div>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {scannedData && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="p-6 card"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-secondary-800 dark:text-white">
                                        Scan Result
                                    </h3>
                                    <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-300">
                                        {scannedData.type}
                                    </span>
                                </div>

                                <div className="p-4 mb-4 bg-secondary-50 dark:bg-secondary-800/50 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            {getTypeIcon(scannedData.type)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-mono text-sm break-all text-secondary-800 dark:text-secondary-200">
                                                {scannedData.data}
                                            </p>
                                            <p className="mt-2 text-xs text-secondary-500 dark:text-secondary-400">
                                                Scanned: {new Date(scannedData.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyToClipboard(scannedData.data)}
                                        className="px-4 py-2 text-sm btn-secondary"
                                    >
                                        <FiCopy className="mr-2" size={16} />
                                        Copy
                                    </button>

                                    {(scannedData.data.match(/^https?:\/\//) ||
                                        scannedData.data.startsWith('tel:') ||
                                        scannedData.data.startsWith('mailto:') ||
                                        scannedData.data.match(/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/)) && (
                                            <button
                                                onClick={() => openLink(scannedData.data)}
                                                className="px-4 py-2 text-sm btn-primary"
                                            >
                                                <FiExternalLink className="mr-2" size={16} />
                                                Open
                                            </button>
                                        )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="p-6 card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-secondary-800 dark:text-white">
                                Scan History ({scanHistory.length})
                            </h3>
                            {scanHistory.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                    <FiTrash2 size={14} />
                                    Clear All
                                </button>
                            )}
                        </div>

                        {scanHistory.length > 0 ? (
                            <div className="space-y-3 overflow-y-auto max-h-64">
                                {scanHistory.map((scan) => (
                                    <div
                                        key={scan.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-secondary-50 dark:bg-secondary-800/50"
                                    >
                                        <div className="flex items-center flex-1 min-w-0 gap-3">
                                            {getTypeIcon(scan.type)}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-1 text-xs rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                                                        {scan.type}
                                                    </span>
                                                    <span className="text-xs text-secondary-500 dark:text-secondary-400">
                                                        {new Date(scan.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="font-mono text-sm truncate text-secondary-700 dark:text-secondary-300">
                                                    {scan.data}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => copyToClipboard(scan.data)}
                                                className="p-2 transition-colors rounded-lg text-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                                                title="Copy"
                                            >
                                                <FiCopy size={14} />
                                            </button>
                                            <button
                                                onClick={() => setScannedData(scan)}
                                                className="p-2 transition-colors rounded-lg text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                                                title="View Details"
                                            >
                                                <FiExternalLink size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
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