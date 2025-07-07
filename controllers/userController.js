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

module.exports = { getUsers, createUser };   // exports the getUsers and createUser