# Patient Management Mobile App

React Native mobile application for patients to track their mental health and manage appointments.

## Setup

1. Install dependencies:
```bash
npm install
```

2. For iOS (if using Expo):
```bash
cd ios && pod install && cd ..
```

3. Start the development server:
```bash
npm start
```

4. Run on device/emulator:
- Android: `npm run android`
- iOS: `npm run ios`

## Configuration

Update the API URL in `src/services/api.js` if your backend is running on a different host/port.

For physical devices, replace `localhost` with your computer's IP address.

## Features

- Patient authentication
- Mental health tracking (mood, anxiety, sleep, energy, stress)
- View appointments
- Profile management
- Health summary dashboard

## Demo Mode

All authentication is mocked. Use any credentials to login.
