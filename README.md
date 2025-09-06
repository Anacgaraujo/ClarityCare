# 🩺 ClarityCare - AI Health Insurance Navigator

ClarityCare is a revolutionary React Native app that uses AI to help patients navigate the complex world of health insurance. It translates medical jargon, checks coverage, tracks benefits, and helps with claim appeals.

## 🚀 Features

### ✅ **AI-Powered Coverage Checker**
- Enter symptoms or diagnoses to check coverage
- Get CPT/ICD code translations
- Receive pre-authorization suggestions
- Real-time deductible and benefit tracking

### 📊 **Benefits Tracker**
- Visual progress bars for deductibles, copays, and out-of-pocket maximums
- Track primary care visits, specialist visits, and mental health sessions
- Real-time spending updates

### 📋 **Claims Management**
- View claim status and history
- Generate appeal letters for denied claims
- AI-powered appeal suggestions
- Document upload and management

### 👤 **Profile & Insurance Management**
- Add multiple insurance plans
- HIPAA-compliant data handling
- Document upload and export
- Privacy and security controls

### 🤖 **AI Assistant**
- Natural language queries about coverage
- Insurance terminology translation
- Personalized recommendations
- 24/7 support

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **UI**: Custom components with dark/light theme support
- **Language**: TypeScript
- **Icons**: SF Symbols (iOS) / Material Icons (Android)

## 📱 Screenshots

The app features a modern, intuitive interface with:
- Dashboard with quick actions and benefits summary
- Coverage checker with AI analysis
- Benefits tracker with visual progress indicators
- Claims management with appeal generation
- Profile management with HIPAA compliance

## 🚀 Getting Started

### Prerequisites
- Node.js 22.10.0 or later
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anacgaraujo/ClarityCare.git
   cd ClarityCare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` in the terminal

## 📁 Project Structure

```
ClarityCare/
├── app/                    # Main app directory (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Dashboard
│   │   ├── coverage.tsx   # Coverage checker
│   │   ├── benefits.tsx   # Benefits tracker
│   │   ├── claims.tsx     # Claims management
│   │   └── profile.tsx    # Profile & settings
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── constants/            # App constants and colors
├── hooks/               # Custom React hooks
└── assets/              # Images, fonts, and other assets
```

## 🔧 Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

### Key Features Implementation

1. **Coverage Checker**: AI-powered analysis of symptoms/diagnoses with CPT code mapping
2. **Benefits Tracker**: Real-time tracking of insurance benefits with visual progress indicators
3. **Claims Management**: Comprehensive claim tracking with automated appeal letter generation
4. **HIPAA Compliance**: Secure data handling and privacy controls

## 🔒 Privacy & Security

ClarityCare is built with HIPAA compliance in mind:
- Encrypted data storage
- Secure API communications
- User consent management
- Data export capabilities
- Account deletion options

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on how to:
- Report bugs
- Suggest new features
- Submit pull requests
- Set up the development environment

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please:
- Check the documentation
- Open an issue on GitHub
- Contact our support team

## 🎯 Roadmap

- [ ] Integration with real insurance APIs
- [ ] Advanced AI features with GPT integration
- [ ] Provider network integration
- [ ] Telemedicine integration
- [ ] Multi-language support
- [ ] Wearable device integration

---

**Built with ❤️ for better healthcare navigation**
