# Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
✅ Backend running on `http://localhost:3001`

### Step 2: Web App (Terminal 2)
```bash
cd web-app
npm install
npm start
```
✅ Web app opens at `http://localhost:3000`

### Step 3: Mobile App (Terminal 3)
```bash
cd mobile-app
npm install
npm start
```
✅ Press `a` for Android or `i` for iOS

## 🔑 Demo Login

### Web Dashboard (Doctor/Admin)
1. Go to `http://localhost:3000`
2. Select role: **Doctor** or **Admin**
3. Enter any email and password
4. Click "Sign In"

### Mobile App (Patient)
1. Open the mobile app
2. Enter any email and password
3. Tap "Sign In"

## 📱 Mobile App - Physical Device Setup

If testing on a physical device:

1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`

2. Update `mobile-app/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3001/api';
   ```

3. Make sure your phone and computer are on the same WiFi network

## 🎯 Testing the System

### As a Patient (Mobile)
- ✅ Login with any credentials
- ✅ View dashboard with health summary
- ✅ Add mental health entries
- ✅ View appointments
- ✅ Check profile

### As a Doctor (Web)
- ✅ Login as "Doctor" role
- ✅ View patient list
- ✅ Click on patient to see details
- ✅ View mental health history
- ✅ See upcoming appointments

### As an Admin (Web)
- ✅ Login as "Admin" role
- ✅ View system statistics
- ✅ See all users
- ✅ Access admin features

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Make sure Node.js 18+ is installed

### Web app can't connect to backend
- Verify backend is running on port 3001
- Check browser console for errors

### Mobile app can't connect
- For emulator: Use `localhost` or `10.0.2.2` (Android)
- For physical device: Use your computer's IP address
- Ensure both devices are on same network

### Port already in use
- Change port in `backend/server.js` or `web-app/package.json`
- Update API URLs accordingly

## 📚 Next Steps

- Review the main `README.md` for detailed documentation
- Check individual README files in each directory
- Explore the codebase structure
- Customize mock data in `backend/data/mockData.js`

Happy coding! 🎉
