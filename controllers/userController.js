// const users = require("../data/users")  // access dummy data
const User = require('../models/User')

// get all the users and specific user
const getUsers = async (req, res, next) => {
    try {
        const {
            search = "",
            role,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;

        const query = {};

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Filter by role
        if (role) {
            query.role = role;
        }

        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        // Execute query with sort, skip, limit
        const users = await User.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            users
        });

    } catch (err) {
        next(err);
    }
};


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