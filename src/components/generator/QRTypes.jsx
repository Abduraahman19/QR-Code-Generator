import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiWifi, FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiLink, FiMessageSquare } from 'react-icons/fi'

const qrTypes = [
    {
        id: 'url',
        name: 'Website URL',
        icon: FiLink,
        description: 'Link to any website',
        fields: [
            { name: 'url', label: 'Website URL', type: 'url', placeholder: 'https://example.com' }
        ]
    },
    {
        id: 'wifi',
        name: 'WiFi Network',
        icon: FiWifi,
        description: 'Connect to WiFi automatically',
        fields: [
            { name: 'ssid', label: 'Network Name (SSID)', type: 'text', placeholder: 'MyWiFi' },
            { name: 'password', label: 'Password', type: 'password', placeholder: 'password123' },
            { name: 'security', label: 'Security Type', type: 'select', options: ['WPA', 'WEP', 'nopass'] }
        ]
    },
    {
        id: 'vcard',
        name: 'Contact Card',
        icon: FiUser,
        description: 'Share contact information',
        fields: [
            { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
            { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
            { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1234567890' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
            { name: 'organization', label: 'Company', type: 'text', placeholder: 'Company Inc.' }
        ]
    },
    {
        id: 'email',
        name: 'Email',
        icon: FiMail,
        description: 'Send pre-filled email',
        fields: [
            { name: 'email', label: 'Email Address', type: 'email', placeholder: 'contact@example.com' },
            { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Hello' },
            { name: 'body', label: 'Message', type: 'textarea', placeholder: 'Your message here...' }
        ]
    },
    {
        id: 'sms',
        name: 'SMS Message',
        icon: FiMessageSquare,
        description: 'Send pre-filled SMS',
        fields: [
            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1234567890' },
            { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message here...' }
        ]
    },
    {
        id: 'phone',
        name: 'Phone Call',
        icon: FiPhone,
        description: 'Make a phone call',
        fields: [
            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1234567890' }
        ]
    },
    {
        id: 'event',
        name: 'Calendar Event',
        icon: FiCalendar,
        description: 'Add to calendar',
        fields: [
            { name: 'title', label: 'Event Title', type: 'text', placeholder: 'Meeting' },
            { name: 'startDate', label: 'Start Date', type: 'datetime-local' },
            { name: 'endDate', label: 'End Date', type: 'datetime-local' },
            { name: 'location', label: 'Location', type: 'text', placeholder: 'Conference Room' },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Event details...' }
        ]
    },
    {
        id: 'location',
        name: 'Location',
        icon: FiMapPin,
        description: 'Share GPS coordinates',
        fields: [
            { name: 'latitude', label: 'Latitude', type: 'number', placeholder: '40.7128' },
            { name: 'longitude', label: 'Longitude', type: 'number', placeholder: '-74.0060' },
            { name: 'query', label: 'Location Name', type: 'text', placeholder: 'New York City' }
        ]
    }
]

export default function QRTypes({ selectedType, onTypeChange, formData, onFormDataChange }) {
    const generateQRData = (type, data) => {
        switch (type) {
            case 'url':
                return data.url || ''
            case 'wifi':
                return `WIFI:T:${data.security || 'WPA'};S:${data.ssid || ''};P:${data.password || ''};H:false;;`
            case 'vcard':
                return `BEGIN:VCARD
VERSION:3.0
FN:${data.firstName || ''} ${data.lastName || ''}
ORG:${data.organization || ''}
TEL:${data.phone || ''}
EMAIL:${data.email || ''}
END:VCARD`
            case 'email':
                return `mailto:${data.email || ''}?subject=${encodeURIComponent(data.subject || '')}&body=${encodeURIComponent(data.body || '')}`
            case 'sms':
                return `sms:${data.phone || ''}?body=${encodeURIComponent(data.message || '')}`
            case 'phone':
                return `tel:${data.phone || ''}`
            case 'event':
                const start = data.startDate ? new Date(data.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : ''
                const end = data.endDate ? new Date(data.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : ''
                return `BEGIN:VEVENT
SUMMARY:${data.title || ''}
DTSTART:${start}
DTEND:${end}
LOCATION:${data.location || ''}
DESCRIPTION:${data.description || ''}
END:VEVENT`
            case 'location':
                return data.query ? `geo:${data.latitude || 0},${data.longitude || 0}?q=${encodeURIComponent(data.query)}` : `geo:${data.latitude || 0},${data.longitude || 0}`
            default:
                return ''
        }
    }

    const currentType = qrTypes.find(type => type.id === selectedType) || qrTypes[0]

    return (
        <div className="space-y-6">
            {/* Type Selection */}
            <div>
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-white mb-4">
                    QR Code Type
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {qrTypes.map((type) => {
                        const Icon = type.icon
                        return (
                            <motion.button
                                key={type.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    onTypeChange(type.id)
                                    onFormDataChange({})
                                }}
                                className={`p-4 rounded-xl border-2 text-center transition-all ${
                                    selectedType === type.id
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                        : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300 bg-white dark:bg-secondary-800'
                                }`}
                            >
                                <Icon className={`mx-auto mb-2 ${
                                    selectedType === type.id ? 'text-primary-600' : 'text-secondary-600'
                                }`} size={24} />
                                <p className={`text-sm font-medium ${
                                    selectedType === type.id ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'
                                }`}>
                                    {type.name}
                                </p>
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            {/* Form Fields */}
            <div>
                <h4 className="text-md font-semibold text-secondary-800 dark:text-white mb-3">
                    {currentType.name} Details
                </h4>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    {currentType.description}
                </p>
                
                <div className="space-y-4">
                    {currentType.fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                                {field.label}
                            </label>
                            {field.type === 'select' ? (
                                <select
                                    value={formData[field.name] || ''}
                                    onChange={(e) => onFormDataChange({
                                        ...formData,
                                        [field.name]: e.target.value
                                    })}
                                    className="input-field"
                                >
                                    {field.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    value={formData[field.name] || ''}
                                    onChange={(e) => onFormDataChange({
                                        ...formData,
                                        [field.name]: e.target.value
                                    })}
                                    placeholder={field.placeholder}
                                    className="input-field min-h-[80px]"
                                    rows={3}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => onFormDataChange({
                                        ...formData,
                                        [field.name]: e.target.value
                                    })}
                                    placeholder={field.placeholder}
                                    className="input-field"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Generated Data Preview */}
            <div className="bg-secondary-50 dark:bg-secondary-800/50 rounded-xl p-4">
                <h5 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                    Generated QR Data:
                </h5>
                <pre className="text-xs text-secondary-600 dark:text-secondary-400 whitespace-pre-wrap break-all">
                    {generateQRData(selectedType, formData) || 'Fill in the fields above to see the generated data'}
                </pre>
            </div>
        </div>
    )
}