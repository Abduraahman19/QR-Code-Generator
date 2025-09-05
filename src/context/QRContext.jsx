import { createContext, useContext, useState, useEffect } from 'react';

const QRContext = createContext();

export function QRProvider({ children }) {
    const [qrCodes, setQrCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadQRCodes = () => {
            try {
                const saved = localStorage.getItem('my-qr-codes');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    
                    // Validate and migrate data
                    const validated = parsed.map(qr => {
                        // Ensure required fields exist
                        if (!qr.id) qr.id = Date.now().toString();
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
            id: Date.now().toString(),
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
            createdAt: new Date().toISOString()
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
                    }
                } : qr
            )
        );
    };

    return (
        <QRContext.Provider value={{
            qrCodes,
            addQRCode,
            deleteQRCode,
            updateQRCode,
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