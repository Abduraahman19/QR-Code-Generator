import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { QRProvider } from './context/QRContext'
import QRGenerator from './components/generator/QRGenerator'
import BulkQRGenerator from './components/generator/BulkQRGenerator'
import QRScanner from './components/scanner/QRScanner'
import MyQRCodes from './components/qrcodes/MyQRCodes'
import Navbar from './components/home/Navbar'
import Home from './components/home/Home'
import Footer from './components/common/Footer'
import usePageViewTracking from './hooks/usePageViewTracking' // 👈 custom hook

function AppRoutes() {
  usePageViewTracking(); // ✅ Call inside Router context

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<QRGenerator />} />
          <Route path="/bulk" element={<BulkQRGenerator />} />
          <Route path="/scanner" element={<QRScanner />} />
          <Route path="/my-qr-codes" element={<MyQRCodes />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <QRProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 transition-colors duration-300">
          <AppRoutes />
        </div>
      </Router>
    </QRProvider>
  )
}

export default App
