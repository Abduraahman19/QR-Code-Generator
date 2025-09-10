# 🎨 QRCraft - Professional QR Code Generator

<div align="center">
  <img src="public/favicon.svg" alt="QRCraft Logo" width="120" height="120">
  
  **Create stunning, customizable QR codes with logos, colors, and patterns**
  
  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/qrcraft)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![React](https://img.shields.io/badge/React-19+-61dafb.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6+-646cff.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38bdf8.svg)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12+-ff0055.svg)](https://www.framer.com/motion/)
</div>

## ✨ Features

### 🚀 Core Features
- **Lightning Fast Generation** - Create QR codes instantly with optimized performance
- **Full Customization** - Colors, patterns, logos, and advanced styling options
- **Multiple Export Formats** - Download as PNG, JPG, SVG, or PDF
- **Logo Integration** - Seamlessly embed your brand logo with size controls
- **Bulk Generation** - Create multiple QR codes at once
- **QR Code Scanner** - Built-in scanner with camera support
- **Analytics Dashboard** - Track scans, performance, and user engagement

### 🎨 Design & UX
- **Professional UI/UX** - Modern, clean, and intuitive interface
- **Fully Responsive** - Perfect on all devices (320px to 4K+)
- **Dark Mode Support** - Beautiful dark theme with system preference detection
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Accessibility First** - WCAG compliant with keyboard navigation and screen reader support
- **International Ready** - Multi-language support and RTL layout ready

### 🔧 Technical Excellence
- **Privacy First** - All processing happens locally in your browser
- **PWA Ready** - Installable as a native app with offline support
- **Performance Optimized** - Code splitting, lazy loading, and optimized bundles
- **Type Safe** - Built with TypeScript for better development experience
- **Modern Stack** - React 19, Vite 6, Tailwind CSS 3.4+

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** 8+ or **yarn** 1.22+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qrcraft.git
   cd qrcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Built With

### Core Technologies
- **[React 19](https://reactjs.org/)** - Latest React with concurrent features
- **[Vite 6](https://vitejs.dev/)** - Next generation frontend tooling
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4+](https://tailwindcss.com/)** - Utility-first CSS framework

### UI & Animation
- **[Framer Motion 12+](https://www.framer.com/motion/)** - Production-ready motion library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon library
- **[React Router 7+](https://reactrouter.com/)** - Declarative routing

### QR Code Libraries
- **[QR Code Styling](https://github.com/kozakdenys/qr-code-styling)** - Advanced QR customization
- **[QRCode.react](https://github.com/zpao/qrcode.react)** - React QR code component
- **[QR Scanner](https://github.com/nimiq/qr-scanner)** - Camera-based QR scanning

### Utilities
- **[html-to-image](https://github.com/bubkoo/html-to-image)** - DOM to image conversion
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation
- **[date-fns](https://date-fns.org/)** - Modern date utility library

## 📖 Usage Guide

### Creating QR Codes

1. **Enter Content** - Add your URL, text, email, phone, or WiFi credentials
2. **Customize Design** - Choose colors, patterns, and corner styles
3. **Add Logo** - Upload your brand logo with size controls
4. **Apply Templates** - Use pre-designed templates for quick styling
5. **Generate & Download** - Export in multiple formats (PNG, JPG, SVG, PDF)

### Advanced Features

#### 🎨 Design Customization
- **Color Schemes** - Foreground, background, eye colors with contrast validation
- **Pattern Styles** - Square, dots, rounded, extra-rounded, classy
- **Corner Styles** - Square, dot, rounded variations
- **Error Correction** - L (7%), M (15%), Q (25%), H (30%) levels
- **Logo Integration** - Smart positioning with size controls (10-50%)

#### 📊 Analytics Dashboard
- **Performance Metrics** - Total scans, growth rates, averages
- **Time-based Charts** - Scan trends over time with interactive graphs
- **Device Breakdown** - Mobile, desktop, tablet usage statistics
- **Geographic Data** - Country-wise scan distribution
- **QR Type Analysis** - Performance by content type

#### 🔍 QR Scanner
- **Camera Integration** - Real-time scanning with device camera
- **File Upload** - Scan QR codes from image files
- **History Tracking** - Keep track of scanned codes
- **Action Handling** - Smart actions for URLs, emails, phones

### Responsive Design Breakpoints

```css
/* Mobile First Approach */
xs: 320px   /* Extra small devices */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
3xl: 1920px /* Ultra wide displays */
```

## 🎨 Customization

### Theme Configuration

The project uses a comprehensive design system with:

- **Color Palette** - Primary, secondary, accent colors with 50-950 shades
- **Typography** - Inter font family with responsive sizing
- **Spacing** - Consistent spacing scale from 0.5 to 128
- **Shadows** - Soft, medium, hard, and glow variants
- **Animations** - 20+ custom animations and transitions

### Adding Custom Themes

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#your-color-50',
          // ... add your brand colors
          950: '#your-color-950',
        }
      }
    }
  }
}
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Project Structure

```
src/
├── components/
│   ├── analytics/       # Analytics dashboard components
│   ├── common/          # Reusable UI components
│   │   ├── ColorPicker.jsx
│   │   ├── CustomQRCode.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Toast.jsx
│   ├── generator/       # QR generation components
│   ├── home/           # Landing page components
│   ├── qrcodes/        # QR management components
│   └── scanner/        # QR scanning components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── index.css           # Global styles and Tailwind
└── main.jsx            # App entry point
```

### Performance Optimizations

- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Components loaded on demand
- **Image Optimization** - WebP support with fallbacks
- **Bundle Analysis** - Built-in bundle size analysis
- **Caching Strategy** - Aggressive caching for static assets

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** 14+
- **Chrome Mobile** 90+

## 📱 PWA Features

- **Installable** - Add to home screen on mobile/desktop
- **Offline Support** - Core functionality works offline
- **Background Sync** - Sync data when connection restored
- **Push Notifications** - Optional scan notifications
- **App-like Experience** - Native app feel and performance

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Standards

- **ESLint** - Airbnb configuration with React hooks
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety and better DX
- **Conventional Commits** - Standardized commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[QR Code Styling](https://github.com/kozakdenys/qr-code-styling)** - Excellent QR generation library
- **[Tailwind CSS](https://tailwindcss.com/)** - Amazing utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and interactions
- **[React Icons](https://react-icons.github.io/react-icons/)** - Beautiful icon collection
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool

## 📞 Support & Contact

- 📧 **Email**: support@qrcraft.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/qrcraft/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/qrcraft/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/qrcraft/wiki)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

<div align="center">
  <p>Made with ❤️ by the QRCraft Team</p>
  <p>
    <a href="https://github.com/yourusername/qrcraft">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/qrcraft">🐦 Follow on Twitter</a> •
    <a href="https://qrcraft.com">🌐 Visit Website</a>
  </p>
</div>