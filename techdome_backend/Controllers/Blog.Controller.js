const { BlogModel } = require("../models/Blog.model");

exports.CreateBlog = async (req, res) => {
    const newBlog = new BlogModel(req.body);
    try {
        await newBlog.save();
        res.status(200).send({ newBlog, Message: "Blog created successfully!" });
    } 
    catch (error) {
        res.status(500).json(error).send({ Message: "Blog can't be created!" });
    }
};


exports.getAllBlogs = async (req, res) => {
    try {
        let { page } = req.query;
        const limit = 5;

        if (!page) {
            page = 1;
        }

        console.log("limit:", limit);
        const blogs = await BlogModel.find().skip((page - 1) * limit).limit(limit);
        let totalBlogs = await BlogModel.find();

        if (!blogs) {
            return res.status(404).send({ message: "Blog not found!" });
        }

        const length = totalBlogs.length;
        const totalPage = Math.ceil(length / +limit);
        return res.status(200).send({ success: true, length, totalPage, blogs });
    }
    catch (error) {
        return res.status(404).send({ error: error.message });
    }
};


exports.deleteBlog = async (req, res) => {
    const id = req.params.id
    const blog = await BlogModel.findById({ _id: id });
    console.log("Deleted Blog", blog);

    await blog.remove();
    return res.status(200).send({
        success: true,
        message: "Blog deleted sucessfully!",
    });
};


exports.getById = async (req, res, next) => {
    const id = req.params.id
    const blog = await BlogModel.findById({ _id: id });
    console.log("Blog by id", blog);

    if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
    }

    return res.status(200).send({
        success: true,
        message: "Blog by id!",
        blog,
    });
};


exports.updateBlog = async (req, res) => {
    const payload = req.body;
    const id = req.params.id;

    try {
        await BlogModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ Message: "blog Updated!" });
    } catch (error) {
        console.log("Error:", error);
        res.status(400).send({ Message: "Blog can't be updated!" });
    }
}

// Insert many
exports.CreateManyBlogs = async (req, res) => {
    const payload = req.body;
    try {
        await BlogModel.insertMany(payload);
        res.status(200).send({ Message: "All blogs added successfully!" });
    }
    catch (err) {
        console.log("Error:", err);
        res.status(400).send({ Message: "All blogs can't be added!" });
    }
};

