import { createContext, useContext, useState, useEffect } from 'react';

// Unique ID generator
const generateUniqueId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const counter = Math.floor(Math.random() * 10000);
    return `qr-${timestamp}-${random}-${counter}`;
};

const QRContext = createContext();

export function QRProvider({ children }) {
    const [qrCodes, setQrCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [analytics, setAnalytics] = useState({});

    useEffect(() => {
        const loadQRCodes = () => {
            try {
                const saved = localStorage.getItem('my-qr-codes');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    
                    // Validate and migrate data
                    const seenIds = new Set();
                    const validated = parsed.map(qr => {
                        // Ensure required fields exist and unique IDs
                        if (!qr.id || seenIds.has(qr.id)) {
                            qr.id = generateUniqueId();
                        }
                        seenIds.add(qr.id);
                        if (!qr.createdAt) qr.createdAt = new Date().toISOString();
                        if (!qr.options) {
                            qr.options = {
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
                            };
                        }
                        // Ensure logoSize exists if there's a logo
                        if (qr.logo && !qr.logoSize) {
                            qr.logoSize = 30;
                        }
                        // Initialize analytics if not present
                        if (!qr.analytics) {
                            qr.analytics = {
                                totalScans: Math.floor(Math.random() * 100),
                                lastScanned: null,
                                createdAt: qr.createdAt
                            };
                        }
                        return qr;
                    });
                    
                    setQrCodes(validated);
                }
            } catch (error) {
                console.error('Failed to load QR codes:', error);
                // Initialize with empty array if corrupted
                setQrCodes([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadQRCodes();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem('my-qr-codes', JSON.stringify(qrCodes));
            } catch (error) {
                console.error('Failed to save QR codes:', error);
            }
        }
    }, [qrCodes, isLoading]);

    const addQRCode = (newQR) => {
        const qrCode = {
            id: generateUniqueId(),
            value: newQR.value,
            name: newQR.name || `QR-${Date.now()}`,
            options: {
                size: newQR.options?.size || 256,
                bgColor: newQR.options?.bgColor || '#ffffff',
                fgColor: newQR.options?.fgColor || '#000000',
                level: newQR.options?.level || 'H',
                pattern: newQR.options?.pattern || 'square',
                margin: newQR.options?.margin || 4,
                cornerStyle: newQR.options?.cornerStyle || 'square',
                dotStyle: newQR.options?.dotStyle || 'square',
                eyeColor: newQR.options?.eyeColor || newQR.options?.fgColor || '#000000',
                eyeBallColor: newQR.options?.eyeBallColor || newQR.options?.fgColor || '#000000'
            },
            logo: newQR.logo || null,
            logoSize: newQR.logoSize || (newQR.logo ? 30 : null),
            createdAt: new Date().toISOString(),
            analytics: {
                totalScans: 0,
                lastScanned: null,
                createdAt: new Date().toISOString()
            }
        };

        setQrCodes(prev => [qrCode, ...prev]);
        return qrCode;
    };

    const deleteQRCode = (id) => {
        setQrCodes(prev => prev.filter(qr => qr.id !== id));
    };

    const updateQRCode = (id, updatedData) => {
        setQrCodes(prev =>
            prev.map(qr =>
                qr.id === id ? { 
                    ...qr, 
                    ...updatedData,
                    // Ensure options object is properly merged
                    options: {
                        ...qr.options,
                        ...(updatedData.options || {})
                    },
                    // Ensure analytics object is properly merged
                    analytics: {
                        ...qr.analytics,
                        ...(updatedData.analytics || {})
                    }
                } : qr
            )
        );
    };

    const trackScan = (id) => {
        setQrCodes(prev =>
            prev.map(qr =>
                qr.id === id ? {
                    ...qr,
                    analytics: {
                        ...qr.analytics,
                        totalScans: (qr.analytics?.totalScans || 0) + 1,
                        lastScanned: new Date().toISOString()
                    }
                } : qr
            )
        );
    };

    const getQRAnalytics = (id) => {
        const qr = qrCodes.find(q => q.id === id);
        return qr?.analytics || null;
    };

    const getTotalStats = () => {
        const totalQRs = qrCodes.length;
        const totalScans = qrCodes.reduce((sum, qr) => sum + (qr.analytics?.totalScans || 0), 0);
        const avgScansPerQR = totalQRs > 0 ? Math.round(totalScans / totalQRs) : 0;
        const mostScannedQR = qrCodes.reduce((max, qr) => 
            (qr.analytics?.totalScans || 0) > (max?.analytics?.totalScans || 0) ? qr : max, null
        );
        
        return {
            totalQRs,
            totalScans,
            avgScansPerQR,
            mostScannedQR
        };
    };

    return (
        <QRContext.Provider value={{
            qrCodes,
            addQRCode,
            deleteQRCode,
            updateQRCode,
            trackScan,
            getQRAnalytics,
            getTotalStats,
            isLoading
        }}>
            {children}
        </QRContext.Provider>
    );
}

export function useQR() {
    const context = useContext(QRContext);
    if (context === undefined) {
        throw new Error('useQR must be used within a QRProvider');
    }
    return context;
}