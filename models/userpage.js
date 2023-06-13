const mongoose = require("mongoose");
const User = require("./user.model");

const { Schema } = mongoose;
const userPageSchema = new Schema({
  username: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  alamat_url: {
    type: String,
    required: true,
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

const userpage = mongoose.model("userpage", userPageSchema);

module.exports = userpage;
