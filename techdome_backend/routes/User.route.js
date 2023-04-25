const express = require("express");
const { AuthValidator } = require("../middlewares/Auth.middleware");
const { login, userProfile, getAllUsers, updateUser, removeUser, signUp } = require("../Controllers/User.Controller");
require('dotenv').config();

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

// validation for users to get their profile only
userRouter.use(AuthValidator);

userRouter.get("/", getAllUsers);
userRouter.get("/id", userProfile);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", removeUser);

module.exports = { userRouter };