# PawTrace - Social Media for Stray Animals 🐾

A comprehensive social media platform dedicated to stray animals, where users can track, feed, and share their interactions with street dogs, cats, and other animals.

## Features 🌟

### 🐾 Animal Management
- Add and track stray animals in your area
- Upload photos and set avatars for each animal
- Record location, favorite food, and personality traits
- Follow specific animals and get updates

### 📱 Social Media Features
- Create posts with photos and videos
- Tag animals in your posts
- Like and comment on posts
- Create reels (short videos)
- Location-based posts

### 🔥 GitHub-like Streaks System
- Track feeding streaks for each animal
- Current streak and longest streak tracking
- Visual feed history calendar
- Reputation points for consistent feeding

### 👥 Social Networking
- Connect with other animal lovers
- Send and accept friend requests
- Build a community of animal caregivers
- Share experiences and tips

### 💰 Donation System
- Support other caregivers financially
- Send donations for specific animals
- Track total donations received
- Build reputation through contributions

### 🏆 Reputation & Leaderboard
- Earn reputation points for activities
- Compete on leaderboards
- Track your impact over time
- Become recognized in the community

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)

### Animals
- `POST /animals` - Add new animal (with photo upload)
- `GET /animals` - Get all animals
- `GET /animals/:id/feeds` - Get feeding history for animal

### Feeding & Streaks
- `POST /feed` - Log feeding activity (with photo)
- `GET /streaks` - Get user's feeding streaks

### Posts & Social
- `POST /posts` - Create post (with media upload)
- `GET /posts` - Get all posts
- `POST /posts/:id/like` - Like/unlike post
- `POST /posts/:id/comment` - Add comment

### Connections
- `POST /connect` - Send friend request
- `PUT /connect/:id` - Accept/reject connection

### Donations
- `POST /donate` - Send donation to user

### Leaderboard
- `GET /leaderboard` - Get top users and popular animals

### File Upload
- `POST /upload` - Upload files (photos/videos)

## Tech Stack 🛠️

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **File Upload**: Multer
- **Security**: bcryptjs for password hashing

## Getting Started 🚀

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `npm run dev`
5. Server runs on port 5000

## File Upload 📸

- Photos and videos are stored in `/uploads` directory
- Supported formats: jpeg, jpg, png, gif, mp4, mov, avi, webm
- Maximum file size: 50MB
- Files are served statically at `/uploads`

## Database Models

### User
- Basic info (name, email, password)
- Extended profile (bio, avatar, reputation)
- Statistics (animals added, feeds, donations)
- Friends list

### Animal
- Basic info (name, type, location)
- Extended details (favorite food, personality)
- Media (photo, avatar)
- Statistics (total feeds, popularity)
- Followers

### Post
- Social media posts with media
- Tagged animals
- Likes and comments
- Reel support

### Streak
- GitHub-like feeding streaks
- Current and longest streak tracking
- Feed history

### Connection
- Friend request system
- Status tracking (pending, accepted, rejected)

### Donation
- Financial support system
- Animal-specific donations
- Message support

## Reputation System 🏅

- **Add animal**: +10 points
- **Create post**: +5 points
- **Feed animal**: +3 points
- **Like post**: +1 point
- **Comment**: +2 points
- **Receive donation**: +1 point per $10

## Contributing 🤝

This is a social impact project aimed at helping stray animals. Contributions are welcome!

## License 📄

MIT License - feel free to use this project for animal welfare initiatives.
