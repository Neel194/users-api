// const users = require("../data/users")  // access dummy data
const User = require('../models/User')

// get all the users
const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users);
}

// create new users
const createUser = async (req, res) => {
    const { name } = req.body;  // get name from body
    // for dummy data
    // const newUser = {   
    //     id: Date.now(),
    //     name
    // }
    // users.push(newUser);  // add newUser into users(dummy data)
    // res.status(201).json({ message: "User created", user: newUser })


    // from database
    const user = await User.create({ name })
    res.status(201).json(user)
}

// upate user
const updateUser = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    //for dummy data
    // const user = users.find(u => u.id == id)
    // if (!user) {
    //     return res.status(404).json({ message: "User not found" })
    // }
    // user.name = name

    // from database
    const user = await User.findByIdAndUpdate(id, { name }, { new: true })
    if (!user) return res.status(204).json({ message: "User not found" })
    res.json({ message: "User updated", user })
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
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User deleted", user })
}


module.exports = { getUsers, createUser, updateUser, deleteUser };