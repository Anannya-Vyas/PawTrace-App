# 🐾 PawTrace - Social Media for Stray Animals

A beautiful ocean-themed social media platform dedicated to stray animals, where users can track, feed, and share their interactions with street animals.

## 🌟 Features

### 🐾 Animal Management
- Add and track stray animals in your area
- Beautiful avatar creator with emojis and accessories
- Record location, favorite food, and personality traits
- Follow specific animals and get updates

### 🌊 Ocean Theme UI
- Stunning ocean-themed interface with floating sea creatures
- Smooth animations and transitions
- Avatar design system with accessories and animal friends
- Mobile-responsive design

### 📱 Social Features
- Create posts with photos and videos
- Tag animals in your posts
- Like and comment on posts
- Location-based posts

### 🔥 Streaks System
- Track feeding streaks for each animal
- Visual feed history calendar
- Reputation points for consistent feeding

### 👥 Community
- Connect with other animal lovers
- Build a community of animal caregivers
- Share experiences and tips

## 🚀 Quick Setup Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (optional - works without it for demo)

### Step 1: Clone & Install
```bash
# Clone the repository
git clone https://github.com/Anannya-Vyas/PawTrace-App.git
cd PawTrace-App

# Install dependencies
npm install
```

### Step 2: Environment Setup
```bash
# Create .env file
touch .env

# Add these lines to .env
MONGO_URI=mongodb+srv://pawtrace:avyas524@cluster1.tchfipc.mongodb.net/pawtrace?retryWrites=true&w=majority
JWT_SECRET=supersecretkey123
```

### Step 3: Start the Application
```bash
# Start the backend server
node app.js

# Server will start on port 5000
# Open your browser and go to: http://localhost:5000/pawtrace-ultimate.html
```

## 🌐 Access Points

### Main Application
- **URL**: http://localhost:5000/pawtrace-ultimate.html
- **Features**: Registration, Login, Avatar Creator, Animal Management

### Backend API
- **Base URL**: http://localhost:5000
- **Status**: http://localhost:5000/ (should show "PawTrace Backend Running 🐶🔥")

## 📱 How to Use

### 1. Registration
- Fill in your details (name, phone, password)
- Select your favorite animals
- Design your avatar with accessories
- Click "Create Account"

### 2. Login
- Enter your phone number and password
- Click "Sign In"

### 3. Avatar Creator
- Choose base avatar
- Add accessories (hats, glasses, etc.)
- Add animal friends
- Save your design

### 4. Animal Management
- Add new animals to track
- Upload photos
- Set favorite foods and locations
- Track feeding activities

## 🛠️ Tech Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database (optional)
- **JWT** - Authentication tokens
- **Multer** - File uploads
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with animations
- **JavaScript** - Interactivity
- **LocalStorage** - Session management

## 📁 Project Structure

```
PawTrace-App/
├── app.js                 # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── models/               # Database models
│   ├── User.js
│   ├── Animal.js
│   └── ...
├── middleware/           # Authentication & uploads
│   ├── auth.js
│   └── upload.js
├── public/               # Frontend files
│   ├── pawtrace-ultimate.html
│   └── app-ultimate.js
├── uploads/             # File uploads (auto-created)
└── README.md            # This file
```

## 🔧 Development Commands

### Start Development Server
```bash
node app.js
```

### Check Server Status
```bash
curl http://localhost:5000/
```

### Test Registration
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","phoneNumber":"+911234567890","password":"123456","confirmPassword":"123456"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+911234567890","password":"123456"}'
```

## 🐛 Troubleshooting

### Server Not Starting
```bash
# Check if port 5000 is in use
netstat -an | findstr :5000

# Kill process on port 5000 (Windows)
taskkill /PID <process_id> /F
```

### MongoDB Connection Issues
- The app works without MongoDB for demo purposes
- For full functionality, ensure MongoDB URI is correct in .env
- Check network connectivity to MongoDB Atlas

### Frontend Not Loading
- Ensure backend server is running
- Check browser console for errors (F12)
- Verify file paths in HTML

### Registration/Login Not Working
- Check server logs in terminal
- Open browser console (F12) for error messages
- Test with the "🧪 Test Server" button

## 🌟 Current Features Status

### ✅ Working Features
- [x] Beautiful ocean-themed UI
- [x] User registration (phone-based)
- [x] User login
- [x] Avatar creator with accessories
- [x] Animal selection system
- [x] Mock authentication (no database required)
- [x] Responsive design
- [x] Smooth animations

### 🔄 In Progress
- [ ] Real MongoDB integration
- [ ] Animal management system
- [ ] Feeding streaks
- [ ] Social features (posts, likes, comments)
- [ ] File upload system

### 📋 Planned Features
- [ ] Real-time notifications
- [ ] GPS-based animal tracking
- [ ] Donation system
- [ ] Community features
- [ ] Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for animal welfare initiatives.

## 🌟 Why This Project?

This project aims to help stray animals by:
- Creating a community of animal caregivers
- Tracking feeding schedules and locations
- Building awareness about stray animals
- Encouraging community participation
- Providing tools for animal welfare

## 📞 Support

If you face any issues:
1. Check the troubleshooting section above
2. Look at the browser console (F12) for errors
3. Check the server terminal for error messages
4. Test with the provided curl commands

---

**Made with ❤️ for stray animals everywhere** 🐾

**GitHub Repository**: https://github.com/Anannya-Vyas/PawTrace-App
