const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { Validator } = require("./middlewares/Validator.middleware");
const { userRouter } = require("./routes/User.route");
const { BlogRouter } = require("./routes/Blog.route");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get("/", (req,res) => {
    res.send({Message: "Welcome to Backend"});
});

app.use("/blogs", BlogRouter);

// Validation for all fields
app.use(Validator);

app.use("/users", userRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to the Database");
    }
    catch (err) {
        console.log(err);
        console.log("Connection Failed!");
    }
    console.log(`Server is running...`);
});