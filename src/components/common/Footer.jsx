import { motion } from 'framer-motion'
import { FiHeart, FiGithub, FiTwitter, FiMail } from 'react-icons/fi'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-secondary-900 text-white py-12 px-4 mt-20">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">QR</span>
                            </div>
                            <h3 className="text-2xl font-bold gradient-text">QRCraft</h3>
                        </div>
                        <p className="text-secondary-300 mb-4 max-w-md">
                            Create stunning, professional QR codes with ease. Perfect for businesses, 
                            events, and personal use with full customization options.
                        </p>
                        <div className="flex gap-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://github.com"
                                className="w-10 h-10 bg-secondary-800 hover:bg-secondary-700 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <FiGithub size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://twitter.com"
                                className="w-10 h-10 bg-secondary-800 hover:bg-secondary-700 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <FiTwitter size={20} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:support@qrcraft.com"
                                className="w-10 h-10 bg-secondary-800 hover:bg-secondary-700 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <FiMail size={20} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/create" className="text-secondary-300 hover:text-white transition-colors">Create QR Code</a></li>
                            <li><a href="/my-qr-codes" className="text-secondary-300 hover:text-white transition-colors">My QR Codes</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Templates</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">API</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-secondary-300 hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-secondary-400 text-sm">
                        © {currentYear} QRCraft. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-secondary-400 text-sm">
                        <span>Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                        >
                            <FiHeart className="text-red-500" size={16} />
                        </motion.div>
                        <span>by QRCraft Team</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}