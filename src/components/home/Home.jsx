import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/50 text-center"
        >
            <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to My QR Generator
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-300 text-lg">
                Create and manage your QR codes with ease
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div whileHover={{ y: -5 }}>
                    <Link
                        to="/create"
                        className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-8 rounded-lg shadow-md transition-all"
                    >
                        Create QR Code
                    </Link>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                    <Link
                        to="/my-qr-codes"
                        className="inline-block bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 px-8 rounded-lg shadow-md transition-all"
                    >
                        My QR Codes
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    )
}