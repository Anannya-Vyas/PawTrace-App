const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    message: {
      type: String,
      maxlength: 200
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal"
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    paymentId: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Donation", donationSchema)
