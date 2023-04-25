const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  chapter: String,
  img : String,
  desc : String,
  read : String,
  stars : Array
});

const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = {
  BlogModel
};