const express = require("express");
const { AuthValidator } = require("../middlewares/Auth.middleware");
const { getAllBlogs, CreateBlog, deleteBlog, getById, CreateManyBlogs, updateBlog } = require("../Controllers/Blog.Controller");
const BlogRouter = express.Router();

BlogRouter.get("/", getAllBlogs);

// validate users can do these operations only
BlogRouter.use(AuthValidator);

BlogRouter.post("/", CreateBlog);
BlogRouter.delete("/:id", deleteBlog);
BlogRouter.get("/:id", getById);
BlogRouter.patch("/:id", updateBlog);
BlogRouter.post("/addmany", CreateManyBlogs);

module.exports = { BlogRouter };
