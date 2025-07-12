const User = require("../models/User")
const bcrypt = require("bcrypt")

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

module.exports = { register };