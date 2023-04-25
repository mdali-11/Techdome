const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
require('dotenv').config();


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            console.log(user);
            if (user.adminID) {
                bcrypt.compare(password, user.password, async (err, result) => {

                    if (result) {
                        const token = jwt.sign({ userID: user._id, adminID: user.adminID }, process.env.key);
                        res.status(200).send({
                            Message: "Admin Login Successful",
                            adminID: user.adminID,
                            userKey: user._id,
                            token
                        });
                    }
                    else {
                        res.status(401).send({ Message: "Wrong admin credential!" });
                    }
                });
            }
            else {
                bcrypt.compare(password, user.password, async (err, result) => {

                    if (result) {
                        const token = jwt.sign({ userID: user._id }, process.env.key);
                        res.status(200).send({
                            Message: "User Login Successful",
                            userKey: user._id,
                            token
                        });
                    }
                    else {
                        res.status(401).send({ Message: "Wrong user credential!" });
                    }
                });
            }
        }
        else {
            res.status(401).send({ Message: "Wrong credential!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).send({ Message: "Usen can not login!" });
    }
}


exports.signUp = async (req, res) => {

    const { username, email, password, mobileNo } = req.body;
    const isAlready = await UserModel.findOne({ "email": email });

    try {
        if (isAlready === null || isAlready.email !== email) {
            bcrypt.hash(password, 4, async (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(401).json(err).send("Something went wrong!");
                }
                else {
                    let user = new UserModel({ username, email, password: hash, mobileNo });
                    await user.save();
                    console.log(user);
                    res.status(200).send({ Message: "User Registered Successfully!" });
                }
            });
        }
        else {
            res.send({ Message: "User already registered!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).send({ Message: "User SignUp Failed!" });
    }
}


exports.userProfile = async (req, res) => {
    const id = req.params.id;
    console.log("Id:", id);

    try {
        const singleUser = await UserModel.findById({ "_id": id });
        res.status(200).send(singleUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ Message: "Can not get user profile!" });
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ Message: "Can not get all users!" });
    }
}


exports.updateUser = async (req, res) => {
    let id = req.params.id;
    let payload = req.body;
    try {
        await UserModel.findByIdAndUpdate({ "_id": id }, payload);
        res.status(200).send({ Message: "User updated successfully!" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ Message: "User can't be updated!" });
    }
}


exports.removeUser = async (req, res) => {
    let id = req.params.id;
    try {
        await UserModel.findByIdAndDelete({ "_id": id });
        res.status(200).send({ Message: "User deleted successfully!" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ Message: "User can't be removed!" });
    }
}