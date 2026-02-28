const mongoose = require("mongoose")

const animalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    photo: {
      type: String
    },
    avatar: {
      type: String // Specific avatar for this animal
    },
    favoriteFood: {
      type: String
    },
    personality: {
      type: String,
      maxlength: 300
    },
    totalFeeds: {
      type: Number,
      default: 0
    },
    popularity: {
      type: Number,
      default: 0
    },
    lastFed: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model("Animal", animalSchema)