const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  profession: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  avatar: {
    type: String
  },
  favoriteAnimals: [{
    type: String
  }],
  reputation: {
    type: Number,
    default: 0
  },
  totalAnimalsAdded: {
    type: Number,
    default: 0
  },
  totalFeeds: {
    type: Number,
    default: 0
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  animals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal"
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)