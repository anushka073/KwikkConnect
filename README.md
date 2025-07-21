# KwikkConnect - Case Management & Expert Notification System

A comprehensive case management system with real-time notifications for experts, featuring a web dashboard and Android app.

## 🚀 Features

### Web Application
- **Case Management Dashboard**: Create, view, and manage cases
- **Expert Matching**: Assign cases to experts
- **Real-time Collaboration**: Swarm room for team collaboration
- **Timeline Tracking**: Activity tracking and case history
- **Postmortem Analysis**: Documentation and lessons learned
- **Browser Notifications**: Real-time alerts for experts
- **Note Taking**: Add and manage case notes
- **Case Sharing**: Share cases via links

### Expert Dashboard
- **Expert Login**: Simple authentication system
- **Case Overview**: View assigned cases with status and priority
- **Status Updates**: Update case status in real-time
- **Notification Management**: Browser notification permissions
- **Statistics**: Case counts and progress tracking

### Backend API
- **RESTful API**: Case and expert management
- **Real-time Notifications**: Browser notification system
- **Expert Registration**: Expert onboarding
- **Case Assignment**: Assign cases to experts

### Android App (Template)
- **Material Design UI**: Modern Android interface
- **Expert Authentication**: Login system
- **Case Management**: View and update assigned cases
- **Notification Support**: Ready for push notifications
- **API Integration**: Backend communication

## 📁 Project Structure

```
kwikkconnectdraft/
├── kwikkconnect/                 # Web Application (React + Vite)
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page components
│   │   ├── utils/                # Utilities and services
│   │   └── styles/               # CSS and styling
│   └── package.json
├── backend/                      # Node.js Backend API
│   ├── index.js                  # Main server file
│   └── package.json
├── android-app/                  # Android Application Template
│   ├── app/                      # Android app source
│   ├── build.gradle              # Project configuration
│   └── README.md                 # Android setup instructions
├── start-all.sh                  # Start script for all services
└── README.md                     # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android app)
- Modern web browser

### Quick Start

1. **Clone and Install Dependencies**
   ```bash
   # Install web app dependencies
   cd kwikkconnect
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

2. **Start All Services**
   ```bash
   # From project root
   ./start-all.sh
   ```
   
   Or start manually:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Web App
   cd kwikkconnect && npm start
   ```

3. **Access the Applications**
   - **Web App**: http://localhost:4028
   - **Expert Dashboard**: http://localhost:4028/expert-dashboard
   - **Backend API**: http://localhost:4000

### Android App Setup

1. **Open in Android Studio**
   - Open Android Studio
   - Select "Open an existing Android Studio project"
   - Navigate to `android-app/` folder
   - Wait for Gradle sync

2. **Configure API URL**
   - Update `ApiService.kt` with your backend URL
   - Default: `http://localhost:4000`

3. **Build and Run**
   - Connect Android device or start emulator
   - Click "Run" in Android Studio

## 🔧 Configuration

### Backend Configuration
- **Port**: 4000 (configurable via `PORT` environment variable)
- **CORS**: Enabled for local development
- **Storage**: In-memory (demo mode)

### Web App Configuration
- **Port**: 4028 (Vite default)
- **API URL**: http://localhost:4000 (configurable in `apiService.js`)

### Notification Settings
- **Browser Notifications**: Automatically requested on expert dashboard
- **Permission**: Required for notification functionality
- **Fallback**: Works without notifications

## 📱 Usage

### For Case Managers
1. Access the web app at http://localhost:4028
2. Create new cases using "Create New Case" button
3. Assign cases to experts
4. Monitor case progress and timeline
5. Add notes and share cases

### For Experts
1. Access expert dashboard at http://localhost:4028/expert-dashboard
2. Grant notification permissions when prompted
3. View assigned cases and update status
4. Receive browser notifications for new cases
5. Use Android app for mobile access

### Demo Credentials
- **Expert Email**: expert@example.com
- **Expert Name**: John Expert

## 🔌 API Endpoints

### Expert Management
- `POST /api/register-expert` - Register new expert
- `GET /api/experts` - Get all experts

### Case Management
- `POST /api/create-case` - Create new case
- `GET /api/cases` - Get all cases
- `GET /api/expert/:email/cases` - Get expert's cases
- `PUT /api/cases/:id/status` - Update case status

## 🔔 Notification System

### Browser Notifications
- **Automatic Permission Request**: On expert dashboard load
- **New Case Notifications**: When cases are assigned
- **Status Update Notifications**: When case status changes
- **Click to Navigate**: Notifications link to relevant cases

### Notification Features
- **Priority-based**: Different styling for high-priority cases
- **Non-intrusive**: Requires user interaction
- **Cross-platform**: Works on all modern browsers
- **No External Dependencies**: Uses native browser APIs

## 🎨 UI/UX Features

### Web App
- **Responsive Design**: Works on desktop and mobile
- **Dark/Light Theme**: Automatic theme detection
- **Material Design**: Modern UI components
- **Smooth Animations**: Page transitions and interactions
- **Accessibility**: Screen reader friendly

### Expert Dashboard
- **Clean Interface**: Focused on case management
- **Real-time Updates**: Live status changes
- **Statistics Cards**: Quick overview of case counts
- **Filter and Search**: Easy case discovery

## 🚀 Development

### Adding New Features
1. **Backend**: Add endpoints in `backend/index.js`
2. **Web App**: Create components in `kwikkconnect/src/`
3. **Android**: Add activities in `android-app/app/src/main/`

### Testing
- **Web App**: Refresh browser to see changes
- **Backend**: Restart server after changes
- **Android**: Rebuild app in Android Studio

### Deployment
- **Web App**: Build with `npm run build`
- **Backend**: Deploy to cloud platform
- **Android**: Generate APK in Android Studio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for demonstration purposes. Feel free to use and modify as needed.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify backend server is running
3. Check API endpoints are accessible
4. Review notification permissions

---

**Happy Case Managing! 🎉** 