// const users = require("../data/users")  // access dummy data
const User = require('../models/User')

// get all the users
const getUsers = async (req, res) => {
    const users = await User.find()
    res.json({ success: true, users });
}

// create new users
const createUser = async (req, res) => {
    const { name, email } = req.body;  // get name from body
    // for dummy data
    // const newUser = {   
    //     id: Date.now(),
    //     name
    // }
    // users.push(newUser);  // add newUser into users(dummy data)
    // res.status(201).json({ message: "User created", user: newUser })


    // from database
    try {
        const user = await User.create({ name, email })
        res.status(201).json({ success: true, user })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

// get user by ID

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
};


// upate user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params

    // for dummy data
    // const index = users.findIndex(u => u.id == id)
    // if (index == -1) {
    //     return res.status(404).json({ message: "User not found" })
    // }
    // const deletedUser = users.splice(index, 1)
    // res.json({ message: "User deleted", user: deletedUser[0] })

    // from database

    const user = await User.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    res.json({ success: true, message: "User deleted" });
}


module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };