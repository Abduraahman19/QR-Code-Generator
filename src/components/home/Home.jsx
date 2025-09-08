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
                className="relative px-4 py-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900"
            >
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200 to-accent-200 opacity-20 blur-3xl"></div>
                    <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-200 to-primary-200 opacity-20 blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                            <span className="gradient-text">QRCraft</span>
                            <br />
                            <span className="text-secondary-800 dark:text-white">Professional QR Codes</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-xl leading-relaxed md:text-2xl text-secondary-600 dark:text-secondary-300">
                            Create stunning, customizable QR codes with logos, colors, and patterns.
                            Perfect for businesses, events, and personal use.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col items-center justify-center gap-6 mb-16 sm:flex-row"
                    >
                        <Link
                            to="/create"
                            className="flex items-center px-8 py-4 text-lg btn-primary group"
                        >
                            Start Creating
                            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            to="/my-qr-codes"
                            className="flex items-center px-8 py-4 text-lg btn-secondary"
                        >
                            View My QR Codes
                        </Link>
                    </motion.div>


                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid max-w-4xl grid-cols-2 gap-8 mx-auto md:grid-cols-4"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-2 text-3xl font-bold md:text-4xl gradient-text">
                                    {stat.number}
                                </div>
                                <div className="font-medium text-secondary-600 dark:text-secondary-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="px-4 py-20 bg-white dark:bg-secondary-800">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 text-4xl font-bold md:text-5xl text-secondary-800 dark:text-white">
                            Why Choose <span className="gradient-text">QRCraft</span>?
                        </h2>
                        <p className="max-w-3xl mx-auto text-xl text-secondary-600 dark:text-secondary-300">
                            Powerful features designed to make QR code creation effortless and professional
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 text-center card card-hover group"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-200 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl group-hover:scale-110">
                                        <Icon className="text-2xl text-white" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-secondary-800 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="leading-relaxed text-secondary-600 dark:text-secondary-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-20 text-white bg-gradient-to-br from-primary-600 to-accent-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                            Ready to Create Amazing QR Codes?
                        </h2>
                        <p className="mb-8 text-xl opacity-90">
                            Join thousands of users who trust QRCraft for their QR code needs
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                to="/create"
                                className="px-8 py-4 font-bold transition-all duration-200 transform bg-white shadow-lg text-primary-600 hover:bg-primary-50 rounded-xl hover:shadow-xl hover:-translate-y-1"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/my-qr-codes"
                                className="px-8 py-4 font-bold text-white transition-all duration-200 transform border-2 border-white hover:bg-white hover:text-primary-600 rounded-xl hover:-translate-y-1"
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