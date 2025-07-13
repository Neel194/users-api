const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // check if user already exist?
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error("Email already registered")
            error.statusCode = 409
            return next(error)
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success: true,
            messsage: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // check if user exist
        const user = await User.findOne({ email })
        if (!user) {
            const error = new Error("Invalid email or password")
            error.statusCode = 401
            return next(error)
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            const error = new Error("Invalid email or password")
            error.statusCode = 401
            return next(error)
        }

        //genreate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.status(200).json({
            success: true,
            message: "Login successfull",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully.Please remove token on client."
    })
}

const getProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

module.exports = { register, login, logout, getProfile };