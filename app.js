require("dotenv").config()
const FeedLog = require("./models/FeedLog")
const Post = require("./models/Post")
const Streak = require("./models/Streak")
const Connection = require("./models/Connection")
const Donation = require("./models/Donation")

const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")

const User = require("./models/User")
const Animal = require("./models/Animal")
const auth = require("./middleware/auth")
const upload = require("./middleware/upload")

const app = express()

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'))
// Serve static files from public directory
app.use(express.static('public'))
app.use(express.json())

/* =========================
   CONNECT TO MONGODB
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully 🚀"))
  .catch((err) => console.log("MongoDB Connection Error:", err))

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("PawTrace Backend Running 🐶🔥")
})

/* =========================
   TEST REGISTER ROUTE (No Auth)
========================= */
app.post("/test-register", async (req, res) => {
  try {
    console.log('Test register received:', req.body);
    res.status(201).json({ message: "Test route working", received: req.body });
  } catch (error) {
    console.error("Test register error:", error);
    res.status(500).json({ message: "Test server error", error: error.message });
  }
})

/* =========================
   REGISTER USER (Simple Version - No MongoDB)
========================= */
app.post("/register", async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { fullName, nickname, profession, phoneNumber, password, confirmPassword, favoriteAnimals } = req.body

    // Validation
    if (!fullName || !phoneNumber || !password) {
      return res.status(400).json({ message: "Please fill in all required fields" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    // For now, just return success without MongoDB
    const mockUser = {
      id: Date.now(),
      fullName,
      nickname: nickname || fullName,
      profession,
      phoneNumber,
      favoriteAnimals: favoriteAnimals || [],
      reputation: 0,
      createdAt: new Date().toISOString()
    }

    const mockToken = "mock-jwt-token-" + Date.now();

    console.log('Registration successful for:', phoneNumber);
    res.status(201).json({
      message: "User registered successfully",
      user: mockUser,
      token: mockToken
    })

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

/* =========================
   LOGIN USER (Simple Version - No MongoDB)
========================= */
app.post("/login", async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { phoneNumber, password } = req.body

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Please enter phone number and password" })
    }

    // For now, just accept any login (mock authentication)
    const mockUser = {
      id: Date.now(),
      fullName: "Test User",
      nickname: "Test",
      profession: "Animal Lover",
      phoneNumber,
      favoriteAnimals: ["dog", "cat"],
      reputation: 10,
      createdAt: new Date().toISOString()
    }

    const mockToken = "mock-jwt-token-" + Date.now();

    console.log('Login successful for:', phoneNumber);
    res.json({
      message: "Login successful",
      user: mockUser,
      token: mockToken
    })

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

/* =========================
   PROTECTED PROFILE
========================= */
app.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   ADD ANIMAL
========================= */
app.post("/animals", auth, upload.single('photo'), async (req, res) => {
  try {
    const { name, type, location, description, favoriteFood, personality } = req.body

    const animal = new Animal({
      name,
      type,
      location,
      description,
      favoriteFood,
      personality,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: req.user.id
    })

    await animal.save()

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalAnimalsAdded: 1, reputation: 10 }
    })

    res.status(201).json({
      message: "Animal added successfully ",
      animal
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   GET ALL ANIMALS
========================= */
app.get("/animals", async (req, res) => {
  try {
    const animals = await Animal.find().populate("createdBy", "name email")
    res.json(animals)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   ADD FEED LOG
========================= */
app.post("/feed", auth, upload.single('photo'), async (req, res) => {
  try {
    const { animalId, note } = req.body

    const animal = await Animal.findById(animalId)
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" })
    }

    const feedLog = new FeedLog({
      animal: animalId,
      fedBy: req.user.id,
      note,
      photo: req.file ? `/uploads/${req.file.filename}` : null
    })

    await feedLog.save()

    // Increase total feed count
    animal.totalFeeds += 1
    animal.lastFed = new Date()
    await animal.save()

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalFeeds: 1, reputation: 3 }
    })

    // Update or create streak
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let streak = await Streak.findOne({
      user: req.user.id,
      animal: animalId
    })

    if (streak) {
      const lastFeed = new Date(streak.lastFeedDate)
      lastFeed.setHours(0, 0, 0, 0)
      
      const dayDiff = Math.floor((today - lastFeed) / (1000 * 60 * 60 * 24))
      
      if (dayDiff === 1) {
        streak.currentStreak += 1
      } else if (dayDiff > 1) {
        streak.currentStreak = 1
      }
      
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak
      }
      
      streak.lastFeedDate = new Date()
      streak.feedDates.push(new Date())
      streak.totalFeeds += 1
    } else {
      streak = new Streak({
        user: req.user.id,
        animal: animalId,
        currentStreak: 1,
        longestStreak: 1,
        lastFeedDate: new Date(),
        feedDates: [new Date()],
        totalFeeds: 1
      })
    }

    await streak.save()

    res.status(201).json({
      message: "Feeding logged successfully 🍖",
      feedLog,
      streak: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   GET FEEDS FOR AN ANIMAL
========================= */
app.get("/animals/:id/feeds", async (req, res) => {
  try {
    const feeds = await FeedLog.find({ animal: req.params.id })
      .populate("fedBy", "name email")
      .sort({ fedAt: -1 })

    res.json(feeds)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   CREATE POST
========================= */
app.post("/posts", auth, upload.array('media', 10), async (req, res) => {
  try {
    const { caption, taggedAnimals, isReel, location } = req.body

    const media = req.files ? req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      mediaType: file.mimetype.startsWith('video/') ? 'video' : 'photo'
    })) : []

    const post = new Post({
      caption,
      media,
      taggedAnimals: taggedAnimals ? JSON.parse(taggedAnimals) : [],
      isReel: isReel === 'true',
      location,
      author: req.user.id
    })

    await post.save()
    await post.populate("author", "name avatar")
    await post.populate("taggedAnimals", "name photo")

    // Update user reputation
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { reputation: 5 }
    })

    res.status(201).json({
      message: "Post created successfully 📸",
      post
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   GET ALL POSTS
========================= */
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name avatar reputation")
      .populate("taggedAnimals", "name photo")
      .populate("comments.author", "name avatar")
      .sort({ createdAt: -1 })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   LIKE POST
========================= */
app.post("/posts/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const isLiked = post.likes.includes(req.user.id)
    
    if (isLiked) {
      post.likes.pull(req.user.id)
      await User.findByIdAndUpdate(req.user.id, { $inc: { reputation: -1 } })
    } else {
      post.likes.push(req.user.id)
      await User.findByIdAndUpdate(req.user.id, { $inc: { reputation: 1 } })
    }

    await post.save()

    res.json({
      message: isLiked ? "Post unliked" : "Post liked",
      likeCount: post.likes.length
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   ADD COMMENT
========================= */
app.post("/posts/:id/comment", auth, async (req, res) => {
  try {
    const { text } = req.body
    const post = await Post.findById(req.params.id)
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const comment = {
      text,
      author: req.user.id,
      createdAt: new Date()
    }

    post.comments.push(comment)
    await post.save()
    await post.populate("comments.author", "name avatar")

    // Update user reputation
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { reputation: 2 }
    })

    res.status(201).json({
      message: "Comment added successfully",
      comment: post.comments[post.comments.length - 1]
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   GET USER STREAKS
========================= */
app.get("/streaks", auth, async (req, res) => {
  try {
    const streaks = await Streak.find({ user: req.user.id })
      .populate("animal", "name photo")
      .sort({ currentStreak: -1 })

    res.json(streaks)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   SEND FRIEND REQUEST
========================= */
app.post("/connect", auth, async (req, res) => {
  try {
    const { recipientId } = req.body

    if (req.user.id === recipientId) {
      return res.status(400).json({ message: "Cannot connect to yourself" })
    }

    const existingConnection = await Connection.findOne({
      $or: [
        { requester: req.user.id, recipient: recipientId },
        { requester: recipientId, recipient: req.user.id }
      ]
    })

    if (existingConnection) {
      return res.status(400).json({ message: "Connection already exists" })
    }

    const connection = new Connection({
      requester: req.user.id,
      recipient: recipientId
    })

    await connection.save()
    await connection.populate("requester recipient", "name avatar")

    res.status(201).json({
      message: "Friend request sent",
      connection
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   ACCEPT/REJECT CONNECTION
========================= */
app.put("/connect/:id", auth, async (req, res) => {
  try {
    const { status } = req.body
    
    const connection = await Connection.findById(req.params.id)
    if (!connection) {
      return res.status(404).json({ message: "Connection not found" })
    }

    if (connection.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    connection.status = status
    await connection.save()

    if (status === 'accepted') {
      await User.findByIdAndUpdate(connection.requester, {
        $push: { friends: connection.recipient }
      })
      await User.findByIdAndUpdate(connection.recipient, {
        $push: { friends: connection.requester }
      })
    }

    res.json({
      message: `Connection ${status}`,
      connection
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   MAKE DONATION
========================= */
app.post("/donate", auth, async (req, res) => {
  try {
    const { recipientId, amount, message, animalId } = req.body

    const donation = new Donation({
      donor: req.user.id,
      recipient: recipientId,
      amount,
      message,
      animal: animalId,
      status: 'completed'
    })

    await donation.save()
    await donation.populate("donor recipient", "name avatar")
    if (animalId) {
      await donation.populate("animal", "name")
    }

    // Update recipient stats
    await User.findByIdAndUpdate(recipientId, {
      $inc: { totalDonations: amount, reputation: Math.floor(amount / 10) }
    })

    res.status(201).json({
      message: "Donation successful! ",
      donation
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   GET LEADERBOARD
========================= */
app.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find()
      .select("name avatar reputation totalAnimalsAdded totalFeeds totalDonations")
      .sort({ reputation: -1 })
      .limit(20)

    const popularAnimals = await Animal.find()
      .select("name photo popularity totalFeeds")
      .sort({ popularity: -1 })
      .limit(20)

    res.json({
      topUsers,
      popularAnimals
    })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

/* =========================
   START SERVER
========================= */
app.listen(5000, () => {
  console.log("Server started on port 5000")
})