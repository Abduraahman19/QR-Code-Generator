import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QRProvider } from './context/QRContext'
import QRGenerator from './components/generator/QRGenerator'
import BulkQRGenerator from './components/generator/BulkQRGenerator'
import QRScanner from './components/scanner/QRScanner'
import MyQRCodes from './components/qrcodes/MyQRCodes'
import Analytics from './components/analytics/Analytics'
import Navbar from './components/home/Navbar'
import Home from './components/home/Home'
import Footer from './components/common/Footer'
import usePageViewTracking from './hooks/usePageViewTracking'
import { useEffect, useState } from 'react'

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

// Animated route wrapper
function AnimatedRoute({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()
  usePageViewTracking()

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link focus-ring">
        Skip to main content
      </a>
      
      <Navbar />
      
      <main 
        id="main-content"
        className="pt-16 lg:pt-20 min-h-screen relative z-10"
        role="main"
      >
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            } />
            <Route path="/create" element={
              <AnimatedRoute>
                <QRGenerator />
              </AnimatedRoute>
            } />
            <Route path="/bulk" element={
              <AnimatedRoute>
                <BulkQRGenerator />
              </AnimatedRoute>
            } />
            <Route path="/scanner" element={
              <AnimatedRoute>
                <QRScanner />
              </AnimatedRoute>
            } />
            <Route path="/my-qr-codes" element={
              <AnimatedRoute>
                <MyQRCodes />
              </AnimatedRoute>
            } />
            <Route path="/analytics" element={
              <AnimatedRoute>
                <Analytics />
              </AnimatedRoute>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'light'
  })

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  if (isLoading) {
    return (
      <div className="min-h-screen center-content bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-900 dark:to-secondary-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 border-4 border-primary-200 border-t-primary-600 rounded-full"
          />
          <h2 className="text-2xl font-bold gradient-text mb-2">QRCraft</h2>
          <p className="text-secondary-600 dark:text-secondary-400">Loading your QR experience...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <QRProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-800 theme-transition relative overflow-x-hidden">
          {/* Background decorative elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-70" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-100 dark:bg-accent-900/20 rounded-full blur-3xl opacity-70" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-primary-50 to-transparent dark:from-primary-900/10 dark:to-transparent rounded-full blur-3xl opacity-30" />
          </div>
          
          {/* Noise texture overlay */}
          <div className="fixed inset-0 bg-noise opacity-[0.015] dark:opacity-[0.02] pointer-events-none" />
          
          <AppRoutes />
        </div>
      </Router>
    </QRProvider>
  )
}

export default App
