import { motion } from 'framer-motion'
import { FiHeart, FiGithub, FiTwitter, FiMail, FiLinkedin, FiInstagram, FiArrowUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const footerLinks = {
        product: [
            { name: 'Create QR Code', path: '/create' },
            { name: 'Bulk Generator', path: '/bulk' },
            { name: 'QR Scanner', path: '/scanner' },
            { name: 'My QR Codes', path: '/my-qr-codes' },
            { name: 'Analytics', path: '/analytics' }
        ],
        resources: [
            { name: 'Help Center', path: '#' },
            { name: 'API Documentation', path: '#' },
            { name: 'Templates', path: '#' },
            { name: 'Best Practices', path: '#' },
            { name: 'Blog', path: '#' }
        ],
        company: [
            { name: 'About Us', path: '#' },
            { name: 'Contact', path: '#' },
            { name: 'Careers', path: '#' },
            { name: 'Press Kit', path: '#' },
            { name: 'Partners', path: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', path: '#' },
            { name: 'Terms of Service', path: '#' },
            { name: 'Cookie Policy', path: '#' },
            { name: 'GDPR', path: '#' }
        ]
    }

    const socialLinks = [
        { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
        { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: FiMail, href: 'mailto:support@qrcraft.com', label: 'Email' }
    ]

    return (
        <>
            <footer className="relative mt-20 overflow-hidden bg-gradient-to-br from-secondary-100 via-secondary-200 to-secondary-100 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 text-secondary-800 dark:text-white">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-noise" />
                </div>
                <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-accent-500/10 blur-3xl" />
                <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-500/10 to-primary-500/10 blur-3xl" />

                <div className="relative container-responsive section-padding">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-6 xs:gap-12 xs:mb-16">
                        {/* Brand Section */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl shadow-soft">
                                        <span className="text-lg font-bold text-white">QR</span>
                                    </div>
                                    <h3 className="text-3xl font-bold gradient-text">QRCraft</h3>
                                </div>
                                <p className="max-w-md mb-6 text-base leading-relaxed xs:text-lg text-secondary-600 dark:text-secondary-300">
                                    Create stunning, professional QR codes with ease. Perfect for businesses, 
                                    events, marketing campaigns, and personal use with full customization options.
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => {
                                        const Icon = social.icon
                                        return (
                                            <motion.a
                                                key={index}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-12 h-12 transition-all duration-200 border rounded-xl bg-secondary-200/50 dark:bg-secondary-800/50 hover:bg-gradient-to-br hover:from-primary-500 hover:to-accent-500 backdrop-blur-sm border-secondary-300 dark:border-secondary-700 hover:border-transparent group"
                                                aria-label={social.label}
                                            >
                                                <Icon size={20} className="transition-colors text-secondary-600 dark:text-secondary-300 group-hover:text-white" />
                                            </motion.a>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </div>

                        {/* Product Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="mb-6 text-lg font-semibold text-secondary-800 dark:text-white">Product</h4>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={link.path}
                                            className="inline-block transition-colors duration-200 transform text-secondary-600 dark:text-secondary-300 hover:text-secondary-800 dark:hover:text-white hover:translate-x-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Resources Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="mb-6 text-lg font-semibold text-secondary-800 dark:text-white">Resources</h4>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.path}
                                            className="inline-block transition-colors duration-200 transform text-secondary-600 dark:text-secondary-300 hover:text-secondary-800 dark:hover:text-white hover:translate-x-1"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Company Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="mb-6 text-lg font-semibold text-secondary-800 dark:text-white">Company</h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.path}
                                            className="inline-block transition-colors duration-200 transform text-secondary-600 dark:text-secondary-300 hover:text-secondary-800 dark:hover:text-white hover:translate-x-1"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Legal Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="mb-6 text-lg font-semibold text-secondary-800 dark:text-white">Legal</h4>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.path}
                                            className="inline-block transition-colors duration-200 transform text-secondary-600 dark:text-secondary-300 hover:text-secondary-800 dark:hover:text-white hover:translate-x-1"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Newsletter Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="p-6 mb-12 border xs:p-8 xs:mb-16 bg-gradient-to-r from-primary-600/20 to-accent-600/20 backdrop-blur-sm border-primary-500/20 rounded-3xl"
                    >
                        <div className="max-w-2xl mx-auto text-center">
                            <h4 className="mb-4 text-2xl font-bold xs:text-3xl text-secondary-800 dark:text-white">
                                Stay Updated with QRCraft
                            </h4>
                            <p className="mb-6 text-base text-secondary-600 dark:text-secondary-300 xs:text-lg">
                                Get the latest updates, tips, and exclusive features delivered to your inbox.
                            </p>
                            <div className="flex flex-col max-w-md gap-3 mx-auto xs:flex-row">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 border bg-white/80 dark:bg-white/10 border-secondary-300 dark:border-white/20 rounded-xl text-secondary-800 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
                                />
                                <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-soft hover:shadow-glow">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-between gap-4 pt-8 border-t xs:flex-row border-secondary-300 dark:border-secondary-700/50"
                    >
                        <p className="text-sm text-center xs:text-base text-secondary-500 dark:text-secondary-400 xs:text-left">
                            © {currentYear} QRCraft. All rights reserved. Built with passion for innovation.
                        </p>
                        <div className="flex items-center gap-2 text-sm xs:text-base text-secondary-500 dark:text-secondary-400">
                            <span>Made with</span>
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    repeatDelay: 3,
                                    ease: "easeInOut"
                                }}
                            >
                                <FiHeart className="text-red-500" size={18} />
                            </motion.div>
                            <span>by QRCraft Team</span>
                        </div>
                    </motion.div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: showScrollTop ? 1 : 0,
                    scale: showScrollTop ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                onClick={scrollToTop}
                className="fixed z-50 p-3 text-white transition-all duration-200 transform rounded-full bottom-6 right-6 bg-gradient-to-r from-primary-500 to-accent-500 shadow-glow hover:shadow-glow-lg hover:-translate-y-1 focus-ring"
                aria-label="Scroll to top"
            >
                <FiArrowUp size={20} />
            </motion.button>
        </>
    )
}