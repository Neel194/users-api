const Order = require("../models/Order")
const User = require("../models/User")

// get all the orders

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email role") //Replace user ID with full user data (name, email, role only)
        res.status(200).json({
            success: true,
            total: orders.length,
            orders
        })
    } catch (err) {
        next(err)
    }
}

// create order
const createOrder = async (req, res, next) => {
    try {
        const { product, price, userId } = req.body

        // check if user exist 
        const userExists = await User.findById(userId)

        if (!userExists) {
            const error = new Error("User not found")
            error.statusCode = 404
            return next(error)
        }

        // create a new order with refrence to the user
        const order = await Order.create({
            product,
            price,
            user: userId
        })
        res.status(201).json({
            success: true,
            message: "Order created",
            order
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    createOrder,
    getOrders
}