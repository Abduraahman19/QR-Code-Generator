import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QRProvider } from './context/QRContext'
import QRGenerator from './components/generator/QRGenerator'
import MyQRCodes from './components/qrcodes/MyQRCodes'
import Navbar from './components/home/Navbar'
import Home from './components/home/Home'

function App() {
  return (
    <QRProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<QRGenerator />} />
              <Route path="/my-qr-codes" element={<MyQRCodes />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QRProvider>
  )
}

export default App