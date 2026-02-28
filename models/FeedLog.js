const mongoose = require("mongoose")

const feedLogSchema = new mongoose.Schema(
  {
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true
    },
    fedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    note: {
      type: String
    },
    photo: {
      type: String
    },
    fedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("FeedLog", feedLogSchema)