const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      maxlength: 2000
    },
    media: [{
      type: String, // URL to photo/video
      mediaType: {
        type: String,
        enum: ['photo', 'video'],
        required: true
      }
    }],
    taggedAnimals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal"
    }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    comments: [{
      text: {
        type: String,
        required: true,
        maxlength: 500
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    isReel: {
      type: Boolean,
      default: false
    },
    location: {
      type: String
    }
  },
  { timestamps: true }
)

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

module.exports = mongoose.model("Post", postSchema)
