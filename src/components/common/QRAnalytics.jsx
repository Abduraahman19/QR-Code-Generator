import { motion } from 'framer-motion'
import { FiBarChart, FiTrendingUp, FiUsers, FiMapPin } from 'react-icons/fi'

export default function QRAnalytics({ qrCode }) {
    // Mock analytics data - in real app, this would come from API
    const analytics = {
        totalScans: Math.floor(Math.random() * 1000) + 50,
        todayScans: Math.floor(Math.random() * 50) + 5,
        weeklyGrowth: Math.floor(Math.random() * 30) + 5,
        topLocations: [
            { country: 'Pakistan', scans: 45, flag: '🇵🇰' },
            { country: 'India', scans: 32, flag: '🇮🇳' },
            { country: 'USA', scans: 28, flag: '🇺🇸' },
            { country: 'UK', scans: 15, flag: '🇬🇧' }
        ],
        scansByDay: [
            { day: 'Mon', scans: 12 },
            { day: 'Tue', scans: 19 },
            { day: 'Wed', scans: 8 },
            { day: 'Thu', scans: 25 },
            { day: 'Fri', scans: 32 },
            { day: 'Sat', scans: 28 },
            { day: 'Sun', scans: 15 }
        ]
    }

    const maxScans = Math.max(...analytics.scansByDay.map(d => d.scans))

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-secondary-800 dark:text-white mb-2">
                    QR Code Analytics
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                    Track performance and engagement metrics
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                                Total Scans
                            </p>
                            <p className="text-3xl font-bold text-secondary-800 dark:text-white">
                                {analytics.totalScans.toLocaleString()}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <FiBarChart className="text-white" size={24} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                                Today's Scans
                            </p>
                            <p className="text-3xl font-bold text-secondary-800 dark:text-white">
                                {analytics.todayScans}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                            <FiUsers className="text-white" size={24} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                                Weekly Growth
                            </p>
                            <p className="text-3xl font-bold text-green-600">
                                +{analytics.weeklyGrowth}%
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                            <FiTrendingUp className="text-white" size={24} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-6"
                >
                    <h4 className="text-lg font-semibold text-secondary-800 dark:text-white mb-4">
                        Weekly Scans
                    </h4>
                    <div className="space-y-3">
                        {analytics.scansByDay.map((day, index) => (
                            <div key={day.day} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400 w-8">
                                    {day.day}
                                </span>
                                <div className="flex-1 bg-secondary-100 dark:bg-secondary-700 rounded-full h-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(day.scans / maxScans) * 100}%` }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                                    />
                                </div>
                                <span className="text-sm font-semibold text-secondary-800 dark:text-white w-8">
                                    {day.scans}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Locations */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card p-6"
                >
                    <h4 className="text-lg font-semibold text-secondary-800 dark:text-white mb-4 flex items-center gap-2">
                        <FiMapPin size={20} />
                        Top Locations
                    </h4>
                    <div className="space-y-3">
                        {analytics.topLocations.map((location, index) => (
                            <motion.div
                                key={location.country}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-700/50 rounded-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{location.flag}</span>
                                    <span className="font-medium text-secondary-800 dark:text-white">
                                        {location.country}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                                        {location.scans} scans
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Note */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
                <p className="text-sm text-primary-700 dark:text-primary-300">
                    <strong>Note:</strong> This is a demo of analytics features. In the full version, 
                    real-time tracking would be available with detailed insights and export options.
                </p>
            </div>
        </div>
    )
}