const Joi = require("joi");
const mongoose = require("mongoose");
const createError = require("http-errors");

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

// inputValidator:

function postValidator(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(10).required(),
  });
  const { error } = schema.validate(data);

  if (error) throw createError(400, error.message);
}

module.exports = { Post, postValidator };
