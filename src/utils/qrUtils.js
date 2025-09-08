// QR Code utility functions for better detection and processing

export const enhanceImageForQR = (canvas, ctx, imageData) => {
    const { data, width, height } = imageData
    const enhancedData = new Uint8ClampedArray(data)
    
    // Convert to grayscale and enhance contrast
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        // Convert to grayscale using luminance formula
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
        
        // Enhance contrast
        const enhanced = gray > 128 ? 255 : 0
        
        enhancedData[i] = enhanced     // R
        enhancedData[i + 1] = enhanced // G
        enhancedData[i + 2] = enhanced // B
        enhancedData[i + 3] = data[i + 3] // A
    }
    
    return new ImageData(enhancedData, width, height)
}

export const validateQRData = (data) => {
    if (!data || typeof data !== 'string') return false
    
    // Remove common QR code artifacts
    const cleaned = data.trim().replace(/[\x00-\x1F\x7F]/g, '')
    
    // Check if it's not just whitespace or control characters
    return cleaned.length > 0
}

export const formatQRData = (data) => {
    if (!data) return ''
    
    // Clean the data
    let cleaned = data.trim()
    
    // Remove null bytes and control characters
    cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    
    // Handle common encoding issues
    try {
        // Try to decode if it's URL encoded
        if (cleaned.includes('%')) {
            const decoded = decodeURIComponent(cleaned)
            if (decoded !== cleaned) {
                cleaned = decoded
            }
        }
    } catch (e) {
        // If decoding fails, use original
    }
    
    return cleaned
}