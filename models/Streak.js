const mongoose = require("mongoose")

const streakSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    lastFeedDate: {
      type: Date
    },
    feedDates: [{
      type: Date
    }],
    totalFeeds: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

// Index for unique user-animal combination
streakSchema.index({ user: 1, animal: 1 }, { unique: true })

module.exports = mongoose.model("Streak", streakSchema)
