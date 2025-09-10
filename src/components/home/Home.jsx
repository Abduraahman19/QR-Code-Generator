import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiZap, FiSettings, FiDownload, FiShield, FiArrowRight, FiStar, FiUsers, FiTrendingUp, FiGlobe } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const features = [
    {
        icon: FiZap,
        title: "Lightning Fast",
        description: "Generate QR codes instantly with our optimized engine. No waiting, just results.",
        color: "from-yellow-500 to-orange-500"
    },
    {
        icon: FiSettings,
        title: "Fully Customizable",
        description: "Colors, patterns, logos, and styles - make it uniquely yours with endless possibilities.",
        color: "from-blue-500 to-purple-500"
    },
    {
        icon: FiDownload,
        title: "Multiple Formats",
        description: "Download as PNG, JPG, SVG, or PDF in ultra-high quality for any use case.",
        color: "from-green-500 to-teal-500"
    },
    {
        icon: FiShield,
        title: "Privacy First",
        description: "All processing happens locally in your browser - your data never leaves your device.",
        color: "from-red-500 to-pink-500"
    },
    {
        icon: FiUsers,
        title: "Team Collaboration",
        description: "Share and manage QR codes with your team. Perfect for businesses and organizations.",
        color: "from-indigo-500 to-blue-500"
    },
    {
        icon: FiTrendingUp,
        title: "Analytics & Insights",
        description: "Track scans, analyze performance, and optimize your QR code campaigns.",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: FiGlobe,
        title: "Global Reach",
        description: "Works worldwide with support for international standards and best practices.",
        color: "from-cyan-500 to-blue-500"
    },
    {
        icon: FiStar,
        title: "Premium Quality",
        description: "Professional-grade QR codes that work flawlessly across all devices and scanners.",
        color: "from-amber-500 to-yellow-500"
    }
]

const stats = [
    { number: "50K+", label: "QR Codes Generated", icon: FiZap },
    { number: "99.9%", label: "Uptime Guarantee", icon: FiShield },
    { number: "4.9⭐", label: "User Rating", icon: FiStar },
    { number: "24/7", label: "Always Available", icon: FiGlobe }
]

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechCorp",
        content: "QRCraft has revolutionized how we handle QR codes for our campaigns. The customization options are incredible!",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
        name: "Ahmed Hassan",
        role: "Restaurant Owner",
        company: "Spice Garden",
        content: "Perfect for our contactless menu. Easy to use, beautiful designs, and our customers love scanning them.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
        name: "Maria Rodriguez",
        role: "Event Coordinator",
        company: "Elite Events",
        content: "The bulk generation feature saved us hours of work. Professional quality QR codes for all our events.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
]

export default function Home() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative py-16 container-responsive xs:py-20 sm:py-24 lg:py-32"
            >
                {/* Animated background elements */}
                <div className="">
                    <motion.div 
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-accent-200/30 blur-3xl"
                    />
                    <motion.div 
                        animate={{ 
                            rotate: [360, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                            duration: 25, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-200/30 to-primary-200/30 blur-3xl"
                    />
                    <motion.div 
                        animate={{ 
                            y: [-20, 20, -20],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="absolute w-32 h-32 rounded-full top-1/4 right-1/4 bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-2xl"
                    />
                </div>

                <div className="relative mx-auto text-center max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8 xs:mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium border rounded-full bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300"
                        >
                            <FiStar className="w-4 h-4" />
                            Trusted by 50,000+ users worldwide
                        </motion.div>
                        
                        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                            <motion.span 
                                className="block gradient-text"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                QRCraft
                            </motion.span>
                            <motion.span 
                                className="block text-secondary-800 dark:text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Professional QR Codes
                            </motion.span>
                        </h1>
                        
                        <motion.p 
                            className="max-w-4xl mx-auto text-lg leading-relaxed xs:text-xl sm:text-2xl text-secondary-600 dark:text-secondary-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            Create stunning, customizable QR codes with logos, colors, and patterns.
                            <br className="hidden sm:block" />
                            Perfect for businesses, events, marketing campaigns, and personal use.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center justify-center gap-4 mb-12 xs:gap-6 xs:mb-16 sm:flex-row"
                    >
                        <Link
                            to="/create"
                            className="flex items-center justify-center w-full px-6 py-3 text-base xs:px-8 xs:py-4 xs:text-lg btn-primary group sm:w-auto"
                        >
                            Start Creating Free
                            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            to="/scanner"
                            className="flex items-center justify-center w-full px-6 py-3 text-base xs:px-8 xs:py-4 xs:text-lg btn-secondary sm:w-auto"
                        >
                            Try QR Scanner
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="grid max-w-5xl grid-cols-2 gap-6 mx-auto lg:grid-cols-4 xs:gap-8"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div 
                                    key={index} 
                                    className="p-4 text-center xs:p-6 card card-hover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Icon className="w-6 h-6 mx-auto mb-3 xs:w-8 xs:h-8 text-primary-600 dark:text-primary-400" />
                                    <div className="mb-2 text-2xl font-bold xs:text-3xl lg:text-4xl gradient-text">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm font-medium xs:text-base text-secondary-600 dark:text-secondary-400">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="bg-white section-padding dark:bg-secondary-800">
                <div className="container-responsive">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center xs:mb-16"
                    >
                        <h2 className="mb-6 text-3xl font-bold xs:text-4xl lg:text-5xl text-secondary-800 dark:text-white">
                            Why Choose <span className="gradient-text">QRCraft</span>?
                        </h2>
                        <p className="max-w-3xl mx-auto text-lg xs:text-xl text-secondary-600 dark:text-secondary-300">
                            Powerful features designed to make QR code creation effortless and professional
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xs:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    className="p-6 text-center cursor-pointer xs:p-8 card card-hover group"
                                >
                                    <div className={`flex items-center justify-center w-14 h-14 xs:w-16 xs:h-16 mx-auto mb-6 transition-all duration-300 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:scale-110 group-hover:rotate-3 shadow-soft group-hover:shadow-glow`}>
                                        <Icon className="text-xl text-white xs:text-2xl" />
                                    </div>
                                    <h3 className="mb-4 text-lg font-bold xs:text-xl text-secondary-800 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed xs:text-base text-secondary-600 dark:text-secondary-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800">
                <div className="container-responsive">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center xs:mb-16"
                    >
                        <h2 className="mb-6 text-3xl font-bold xs:text-4xl lg:text-5xl text-secondary-800 dark:text-white">
                            Loved by <span className="gradient-text">Professionals</span>
                        </h2>
                        <p className="max-w-3xl mx-auto text-lg xs:text-xl text-secondary-600 dark:text-secondary-300">
                            See what our users say about their QRCraft experience
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="p-8 text-center xs:p-12 card card-gradient"
                        >
                            <div className="flex justify-center mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <blockquote className="mb-8 text-lg font-medium leading-relaxed xs:text-xl lg:text-2xl text-secondary-800 dark:text-white">
                                "{testimonials[currentTestimonial].content}"
                            </blockquote>
                            <div className="flex items-center justify-center gap-4">
                                <img
                                    src={testimonials[currentTestimonial].avatar}
                                    alt={testimonials[currentTestimonial].name}
                                    className="object-cover w-12 h-12 border-2 rounded-full xs:w-16 xs:h-16 border-primary-200 dark:border-primary-700"
                                />
                                <div className="text-left">
                                    <div className="font-bold text-secondary-800 dark:text-white">
                                        {testimonials[currentTestimonial].name}
                                    </div>
                                    <div className="text-sm text-secondary-600 dark:text-secondary-400">
                                        {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial indicators */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                        index === currentTestimonial
                                            ? 'bg-primary-600 scale-125'
                                            : 'bg-secondary-300 dark:bg-secondary-600 hover:bg-primary-400'
                                    }`}
                                    aria-label={`View testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative -mb-20 overflow-hidden text-white section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
                    <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-20" />
                </div>

                <div className="relative container-responsive">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="mb-6 text-3xl font-bold leading-tight xs:text-4xl lg:text-5xl xl:text-6xl">
                            Ready to Create Amazing QR Codes?
                        </h2>
                        <p className="mb-8 text-lg leading-relaxed xs:mb-12 xs:text-xl lg:text-2xl opacity-90">
                            Join thousands of professionals who trust QRCraft for their QR code needs.
                            <br className="hidden sm:block" />
                            Start creating beautiful, functional QR codes in seconds.
                        </p>
                        <div className="flex flex-col justify-center gap-4 xs:gap-6 sm:flex-row">
                            <Link
                                to="/create"
                                className="w-full px-6 py-3 text-base font-bold text-center transition-all duration-300 transform bg-white xs:px-8 xs:py-4 xs:text-lg shadow-soft text-primary-600 hover:bg-primary-50 rounded-2xl hover:shadow-glow hover:-translate-y-1 sm:w-auto"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/analytics"
                                className="w-full px-6 py-3 text-base font-bold text-center text-white transition-all duration-300 transform border-2 xs:px-8 xs:py-4 xs:text-lg border-white/30 hover:bg-white/10 hover:border-white rounded-2xl hover:-translate-y-1 backdrop-blur-sm sm:w-auto"
                            >
                                View Analytics Demo
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}