const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,   // store the _id of a User document
        ref: "User",  // tells mongoose that this refers to User model that we create.. /models/User.js
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)