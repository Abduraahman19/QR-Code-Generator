// QR Code API Service
class QRApiService {
    constructor() {
        this.baseUrl = 'https://api.qrcraft.com/v1'
        this.apiKey = 'demo-key'
    }

    async generateQR(options) {
        try {
            // Mock API call - replace with real API
            return {
                success: true,
                qrCode: options.data,
                downloadUrl: `data:image/png;base64,mock-data`,
                id: Date.now().toString()
            }
        } catch (error) {
            console.error('QR Generation failed:', error)
            throw error
        }
    }

    async shortenUrl(longUrl) {
        try {
            // Mock URL shortening
            const shortCode = Math.random().toString(36).substring(7)
            return `https://qr.ly/${shortCode}`
        } catch (error) {
            console.error('URL shortening failed:', error)
            return longUrl
        }
    }

    async getAnalytics(qrId) {
        try {
            // Mock analytics data
            return {
                totalScans: Math.floor(Math.random() * 1000),
                todayScans: Math.floor(Math.random() * 50),
                weeklyGrowth: Math.floor(Math.random() * 30),
                topCountries: [
                    { country: 'Pakistan', scans: 45 },
                    { country: 'India', scans: 32 },
                    { country: 'USA', scans: 28 }
                ]
            }
        } catch (error) {
            console.error('Analytics fetch failed:', error)
            return null
        }
    }

    validateQRData(data, type) {
        switch (type) {
            case 'url':
                try {
                    new URL(data)
                    return { valid: true }
                } catch {
                    return { valid: false, error: 'Invalid URL format' }
                }
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(data) 
                    ? { valid: true } 
                    : { valid: false, error: 'Invalid email format' }
            
            case 'phone':
                const phoneRegex = /^\+?[\d\s\-\(\)]+$/
                return phoneRegex.test(data) 
                    ? { valid: true } 
                    : { valid: false, error: 'Invalid phone format' }
            
            default:
                return { valid: true }
        }
    }
}

export default new QRApiService()