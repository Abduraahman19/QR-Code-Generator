import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiZap, FiSettings, FiDownload, FiShield, FiArrowRight } from 'react-icons/fi'

const features = [
    {
        icon: FiZap,
        title: "Lightning Fast",
        description: "Generate QR codes instantly with our optimized engine"
    },
    {
        icon: FiSettings,
        title: "Fully Customizable",
        description: "Colors, patterns, logos, and styles - make it yours"
    },
    {
        icon: FiDownload,
        title: "Multiple Formats",
        description: "Download as PNG, JPG, or SVG in high quality"
    },
    {
        icon: FiShield,
        title: "Privacy First",
        description: "All processing happens locally - your data stays private"
    }
]

const stats = [
    { number: "10K+", label: "QR Codes Generated" },
    { number: "99.9%", label: "Uptime" },
    { number: "5⭐", label: "User Rating" },
    { number: "24/7", label: "Available" }
]

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 py-20 px-4"
            >
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-200 to-primary-200 rounded-full opacity-20 blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="gradient-text">QRCraft</span>
                            <br />
                            <span className="text-secondary-800 dark:text-white">Professional QR Codes</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
                            Create stunning, customizable QR codes with logos, colors, and patterns. 
                            Perfect for businesses, events, and personal use.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
                    >
                        <Link to="/create" className="btn-primary text-lg px-8 py-4 group">
                            Start Creating
                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/my-qr-codes" className="btn-secondary text-lg px-8 py-4">
                            View My QR Codes
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-secondary-600 dark:text-secondary-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white dark:bg-secondary-800">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary-800 dark:text-white">
                            Why Choose <span className="gradient-text">QRCraft</span>?
                        </h2>
                        <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
                            Powerful features designed to make QR code creation effortless and professional
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="card card-hover p-8 text-center group"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                                        <Icon className="text-2xl text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-secondary-800 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Create Amazing QR Codes?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of users who trust QRCraft for their QR code needs
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link 
                                to="/create" 
                                className="bg-white text-primary-600 hover:bg-primary-50 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                            >
                                Get Started Free
                            </Link>
                            <Link 
                                to="/my-qr-codes" 
                                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:-translate-y-1"
                            >
                                View Examples
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}