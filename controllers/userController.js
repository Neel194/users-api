const users = require("../data/users")  // access dummy data

// get all the users
const getUsers = (req, res) => {
    res.json(users);
}

// create new users
const createUser = (req, res) => {
    const { name } = req.body;  // get name from body
    const newUser = {
        id: Date.now(),
        name
    }
    users.push(newUser);  // add newUser into users(dummy data)
    res.status(201).json({ message: "User created", user: newUser })
}

// upate user
const updateUser = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const user = users.find(u => u.id == id)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    user.name = name
    res.json({ message: "User updated", user })
}

// delete user
const deleteUser = (req, res) => {
    const { id } = req.params
    const index = users.findIndex(u => u.id == id)

    if (index == -1) {
        return res.status(404).json({ message: "User not found" })
    }

    const deletedUser = users.splice(index, 1)
    res.json({ message: "User deleted", user: deletedUser[0] })
}


module.exports = { getUsers, createUser, updateUser, deleteUser };