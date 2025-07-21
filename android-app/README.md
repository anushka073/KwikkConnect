# KwikkConnect Expert Android App

A simple Android app for experts to receive case notifications and manage their assigned cases.

## Features

- **Login/Authentication**: Simple expert login
- **Case Management**: View and update assigned cases
- **Browser Notifications**: Receive notifications when new cases are assigned
- **Real-time Updates**: Case status updates and notifications

## Project Structure

```
android-app/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/kwikkconnect/expert/
│   │   │   │   ├── activities/
│   │   │   │   │   ├── LoginActivity.kt
│   │   │   │   │   ├── MainActivity.kt
│   │   │   │   │   └── CaseDetailActivity.kt
│   │   │   │   ├── adapters/
│   │   │   │   │   └── CaseAdapter.kt
│   │   │   │   ├── models/
│   │   │   │   │   ├── Expert.kt
│   │   │   │   │   └── Case.kt
│   │   │   │   ├── services/
│   │   │   │   │   ├── ApiService.kt
│   │   │   │   │   └── NotificationService.kt
│   │   │   │   └── utils/
│   │   │   │       └── Constants.kt
│   │   │   ├── res/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── activity_login.xml
│   │   │   │   │   ├── activity_main.xml
│   │   │   │   │   ├── activity_case_detail.xml
│   │   │   │   │   └── item_case.xml
│   │   │   │   ├── values/
│   │   │   │   │   ├── colors.xml
│   │   │   │   │   ├── strings.xml
│   │   │   │   │   └── themes.xml
│   │   │   │   └── drawable/
│   │   │   └── AndroidManifest.xml
│   │   └── test/
│   └── build.gradle
├── build.gradle
└── settings.gradle
```

## Setup Instructions

### Prerequisites
- Android Studio (latest version)
- Android SDK (API level 24+)
- Kotlin support

### Installation
1. Open Android Studio
2. Select "Open an existing Android Studio project"
3. Navigate to this `android-app` folder and select it
4. Wait for Gradle sync to complete
5. Connect an Android device or start an emulator
6. Click "Run" to build and install the app

### Configuration
1. Update the API base URL in `ApiService.kt` to match your backend server
2. Configure notification settings in `NotificationService.kt`
3. Update expert credentials in `LoginActivity.kt` for demo purposes

## Key Components

### Activities
- **LoginActivity**: Expert authentication
- **MainActivity**: Dashboard with case list
- **CaseDetailActivity**: Detailed case view and status updates

### Services
- **ApiService**: REST API communication with backend
- **NotificationService**: Browser notification handling

### Models
- **Expert**: Expert user data
- **Case**: Case information and status

## API Integration

The app communicates with the backend server running on `http://localhost:4000` and includes:
- Expert registration/login
- Fetching assigned cases
- Updating case status
- Receiving notifications

## Notifications

The app uses browser notifications to alert experts when:
- New cases are assigned
- Case status is updated
- High priority cases require attention

## Demo Credentials

For testing purposes:
- Email: `expert@example.com`
- Name: `John Expert`

## Development Notes

- This is a template/demo app
- Uses in-memory storage for demo data
- Can be extended with Firebase FCM for push notifications
- UI follows Material Design guidelines
- Compatible with Android 7.0+ (API 24+) 