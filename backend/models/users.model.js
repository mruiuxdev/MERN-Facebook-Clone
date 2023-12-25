const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    picture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStcMBdszv05cHquHzuTUQ1podq5JFd1vckt8REJXDgKA&s",
    },
    cover: {
      type: String,
      default:
        "https://www.indianshelf.us/views/themes/template-2022/assets/images/banner.jpg",
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enums: ["Male", "Female"],
    },
    bYear: {
      type: String,
      required: true,
    },
    bMonth: {
      type: String,
      required: true,
    },
    bDay: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: String,
      anotherName: String,
      job: String,
      workPlace: String,
      highSchool: String,
      college: String,
      currentCity: String,
      homeTown: String,
      relationship: {
        type: String,
        enums: ["Single", "Married", "Divorced", "In a relationship"],
      },
      instagram: String,
    },
    savedPosts: [
      {
        posts: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
