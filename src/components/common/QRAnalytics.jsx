import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBarChart, FiTrendingUp, FiUsers, FiMapPin, FiCalendar, FiClock, FiRefreshCw, FiDownload, FiEye, FiShare2 } from 'react-icons/fi'

export default function QRAnalytics({ qrCode }) {
    const [analytics, setAnalytics] = useState(null)
    const [timeRange, setTimeRange] = useState('7d')
    const [isLoading, setIsLoading] = useState(true)

    // Simulate real analytics data based on QR code
    useEffect(() => {
        const generateAnalytics = () => {
            const baseScans = qrCode ? Math.floor(Math.random() * 500) + 100 : 0
            const todayScans = Math.floor(baseScans * 0.1) + Math.floor(Math.random() * 20)

            return {
                totalScans: baseScans,
                todayScans: todayScans,
                yesterdayScans: Math.floor(todayScans * 0.8) + Math.floor(Math.random() * 15),
                weeklyGrowth: Math.floor(Math.random() * 40) + 5,
                monthlyGrowth: Math.floor(Math.random() * 60) + 10,
                avgScansPerDay: Math.floor(baseScans / 30),
                peakHour: Math.floor(Math.random() * 12) + 9, // 9 AM to 9 PM
                topLocations: [
                    { country: 'Pakistan', scans: Math.floor(baseScans * 0.35), flag: '🇵🇰', growth: '+12%' },
                    { country: 'India', scans: Math.floor(baseScans * 0.25), flag: '🇮🇳', growth: '+8%' },
                    { country: 'USA', scans: Math.floor(baseScans * 0.20), flag: '🇺🇸', growth: '+15%' },
                    { country: 'UK', scans: Math.floor(baseScans * 0.12), flag: '🇬🇧', growth: '+5%' },
                    { country: 'Canada', scans: Math.floor(baseScans * 0.08), flag: '🇨🇦', growth: '+3%' }
                ],
                scansByDay: Array.from({ length: 7 }, (_, i) => ({
                    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                    scans: Math.floor(Math.random() * 50) + 10,
                    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
                })),
                scansByHour: Array.from({ length: 24 }, (_, i) => ({
                    hour: i,
                    scans: Math.floor(Math.random() * 20) + (i >= 9 && i <= 21 ? 10 : 2)
                })),
                deviceTypes: [
                    { type: 'Mobile', percentage: 65, scans: Math.floor(baseScans * 0.65) },
                    { type: 'Desktop', percentage: 25, scans: Math.floor(baseScans * 0.25) },
                    { type: 'Tablet', percentage: 10, scans: Math.floor(baseScans * 0.10) }
                ],
                referrers: [
                    { source: 'Direct Scan', percentage: 45, scans: Math.floor(baseScans * 0.45) },
                    { source: 'Social Media', percentage: 30, scans: Math.floor(baseScans * 0.30) },
                    { source: 'Website', percentage: 15, scans: Math.floor(baseScans * 0.15) },
                    { source: 'Email', percentage: 10, scans: Math.floor(baseScans * 0.10) }
                ],
                lastUpdated: new Date().toLocaleString()
            }
        }

        setIsLoading(true)
        setTimeout(() => {
            setAnalytics(generateAnalytics())
            setIsLoading(false)
        }, 1000)
    }, [qrCode, timeRange])

    const refreshData = () => {
        setIsLoading(true)
        setTimeout(() => {
            setAnalytics(prev => ({
                ...prev,
                todayScans: prev.todayScans + Math.floor(Math.random() * 5),
                lastUpdated: new Date().toLocaleString()
            }))
            setIsLoading(false)
        }, 500)
    }

    if (!qrCode) {
        return (
            <div className="py-12 text-center">
                <FiBarChart className="mx-auto mb-4 text-secondary-400" size={48} />
                <h3 className="mb-2 text-lg font-semibold text-secondary-600 dark:text-secondary-400">
                    No QR Code Selected
                </h3>
                <p className="text-secondary-500 dark:text-secondary-500">
                    Select a QR code to view detailed analytics
                </p>
            </div>
        )
    }

    if (isLoading || !analytics) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="w-48 h-8 rounded bg-secondary-200 dark:bg-secondary-700 animate-pulse"></div>
                    <div className="w-24 h-8 rounded bg-secondary-200 dark:bg-secondary-700 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-6 card">
                            <div className="w-20 h-4 mb-2 rounded bg-secondary-200 dark:bg-secondary-700 animate-pulse"></div>
                            <div className="w-16 h-8 rounded bg-secondary-200 dark:bg-secondary-700 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const maxScans = Math.max(...analytics.scansByDay.map(d => d.scans))
    const maxHourlyScans = Math.max(...analytics.scansByHour.map(h => h.scans))

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h3 className="mb-1 text-2xl font-bold text-secondary-800 dark:text-white">
                        QR Analytics Dashboard
                    </h3>
                    <p className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400">
                        <FiClock size={16} />
                        Last updated: {analytics.lastUpdated}
                    </p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-2 text-sm input-field"
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                    </select>
                    <button
                        onClick={refreshData}
                        disabled={isLoading}
                        className="px-3 py-2 text-sm btn-secondary"
                    >
                        <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} size={16} />
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border-l-4 card border-primary-500"
                >
                    <div className="flex items-center justify-between mb-2">
                        <FiBarChart className="text-primary-500" size={24} />
                        <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full dark:bg-green-900/30">
                            +{analytics.weeklyGrowth}%
                        </span>
                    </div>
                    <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                        Total Scans
                    </p>
                    <p className="text-3xl font-bold text-secondary-800 dark:text-white">
                        {analytics.totalScans.toLocaleString()}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 border-l-4 border-green-500 card"
                >
                    <div className="flex items-center justify-between mb-2">
                        <FiUsers className="text-green-500" size={24} />
                        <span className="text-xs text-secondary-500 dark:text-secondary-400">
                            vs {analytics.yesterdayScans} yesterday
                        </span>
                    </div>
                    <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                        Today's Scans
                    </p>
                    <p className="text-3xl font-bold text-secondary-800 dark:text-white">
                        {analytics.todayScans}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 border-l-4 border-purple-500 card"
                >
                    <div className="flex items-center justify-between mb-2">
                        <FiTrendingUp className="text-purple-500" size={24} />
                        <span className="px-2 py-1 text-xs text-purple-600 bg-purple-100 rounded-full dark:bg-purple-900/30">
                            Daily Avg
                        </span>
                    </div>
                    <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                        Avg Scans/Day
                    </p>
                    <p className="text-3xl font-bold text-secondary-800 dark:text-white">
                        {analytics.avgScansPerDay}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 border-l-4 border-orange-500 card"
                >
                    <div className="flex items-center justify-between mb-2">
                        <FiClock className="text-orange-500" size={24} />
                        <span className="px-2 py-1 text-xs text-orange-600 bg-orange-100 rounded-full dark:bg-orange-900/30">
                            Peak Time
                        </span>
                    </div>
                    <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                        Peak Hour
                    </p>
                    <p className="text-3xl font-bold text-secondary-800 dark:text-white">
                        {analytics.peakHour}:00
                    </p>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Daily Scans Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 card"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-secondary-800 dark:text-white">
                            Daily Scans Trend
                        </h4>
                        <FiCalendar className="text-secondary-400" size={20} />
                    </div>
                    <div className="space-y-4">
                        {analytics.scansByDay.map((day, index) => (
                            <div key={day.day} className="flex items-center gap-4">
                                <div className="w-12 text-sm font-medium text-secondary-600 dark:text-secondary-400">
                                    {day.day}
                                </div>
                                <div className="relative flex-1 h-3 overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-700">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(day.scans / maxScans) * 100}%` }}
                                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                                        className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                                    />
                                </div>
                                <div className="w-12 text-sm font-bold text-right text-secondary-800 dark:text-white">
                                    {day.scans}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Hourly Activity */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 card"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-secondary-800 dark:text-white">
                            Hourly Activity
                        </h4>
                        <FiClock className="text-secondary-400" size={20} />
                    </div>
                    <div className="grid h-32 grid-cols-12 gap-1">
                        {analytics.scansByHour.map((hour, index) => (
                            <div key={hour.hour} className="flex flex-col items-center justify-end">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(hour.scans / maxHourlyScans) * 100}%` }}
                                    transition={{ delay: 0.8 + index * 0.02, duration: 0.5 }}
                                    className="w-full bg-gradient-to-t from-accent-500 to-accent-400 rounded-sm min-h-[2px]"
                                    title={`${hour.hour}:00 - ${hour.scans} scans`}
                                />
                                <span className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                                    {hour.hour}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Geographic & Device Data */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Top Locations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 card"
                >
                    <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-secondary-800 dark:text-white">
                        <FiMapPin size={20} />
                        Top Locations
                    </h4>
                    <div className="space-y-3">
                        {analytics.topLocations.map((location, index) => (
                            <motion.div
                                key={location.country}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="flex items-center justify-between p-3 transition-colors bg-secondary-50 dark:bg-secondary-700/50 rounded-xl hover:bg-secondary-100 dark:hover:bg-secondary-700"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{location.flag}</span>
                                    <div>
                                        <span className="block font-medium text-secondary-800 dark:text-white">
                                            {location.country}
                                        </span>
                                        <span className="text-xs text-green-600 dark:text-green-400">
                                            {location.growth}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-primary-600 dark:text-primary-400">
                                        {location.scans}
                                    </span>
                                    <span className="text-xs text-secondary-500 dark:text-secondary-400">
                                        scans
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Device Types */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-6 card"
                >
                    <h4 className="mb-4 text-lg font-semibold text-secondary-800 dark:text-white">
                        Device Types
                    </h4>
                    <div className="space-y-4">
                        {analytics.deviceTypes.map((device, index) => (
                            <div key={device.type} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                        {device.type}
                                    </span>
                                    <span className="text-sm font-bold text-secondary-800 dark:text-white">
                                        {device.percentage}%
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-secondary-200 dark:bg-secondary-700">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${device.percentage}%` }}
                                        transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                                        className={`h-2 rounded-full ${index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                                index === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                                    'bg-gradient-to-r from-purple-500 to-purple-600'
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Traffic Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-6 card"
                >
                    <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-secondary-800 dark:text-white">
                        <FiShare2 size={20} />
                        Traffic Sources
                    </h4>
                    <div className="space-y-3">
                        {analytics.referrers.map((referrer, index) => (
                            <div key={referrer.source} className="flex items-center justify-between">
                                <span className="text-sm text-secondary-700 dark:text-secondary-300">
                                    {referrer.source}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-secondary-800 dark:text-white">
                                        {referrer.percentage}%
                                    </span>
                                    <div className="w-16 h-1 rounded-full bg-secondary-200 dark:bg-secondary-700">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${referrer.percentage}%` }}
                                            transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                                            className="h-1 rounded-full bg-gradient-to-r from-accent-500 to-accent-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Export Options */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="p-6 border bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800 rounded-xl"
            >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h4 className="mb-1 font-semibold text-primary-800 dark:text-primary-200">
                            Export Analytics Data
                        </h4>
                        <p className="text-sm text-primary-600 dark:text-primary-300">
                            Download detailed reports in various formats
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center px-4 py-2 text-sm btn-secondary">
                            <FiDownload className="mr-2" size={16} />
                            Export CSV
                        </button>
                        <button className="flex items-center px-4 py-2 text-sm btn-primary">
                            <FiEye className="mr-2" size={16} />
                            View Report
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    )
}