// const users = require("../data/users")  // access dummy data
const User = require('../models/User')

// get all the users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        res.status(200).json({ success: true, users });
    } catch (err) {
        next(err)  // send error to global error handler
    }
}

// create new users
const createUser = async (req, res, next) => {
    // for dummy data
    // const newUser = {   
    //     id: Date.now(),
    //     name
    // }
    // users.push(newUser);  // add newUser into users(dummy data)
    // res.status(201).json({ message: "User created", user: newUser })

    // from database
    try {
        const { name, email } = req.body;  // get name and email from body
        const user = await User.create({ name, email })

        res.status(201).json({ success: true, user })
    } catch (err) {
        next(err)
    }
}

// get user by ID

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
}

// upate user
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            return next(error)
        }
        res.json({ success: true, user });
    } catch (err) {
        next(err)
    }
}

// delete user
const deleteUser = async (req, res, next) => {
    // for dummy data
    // const index = users.findIndex(u => u.id == id)
    // if (index == -1) {
    //     return res.status(404).json({ message: "User not found" })
    // }
    // const deletedUser = users.splice(index, 1)
    // res.json({ message: "User deleted", user: deletedUser[0] })

    // from database
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            return next(error)
        }
        res.status(200).json({ success: true, message: "User deleted" })
    } catch (error) {
        next(err)
    }
}


module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };