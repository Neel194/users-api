const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true }
);

userSchema.virtual('orderCount', {
    ref: 'Order', // model reference
    localField: '_id', // match this field in User model
    foreignField: 'user', // match this field in Order model
    count: true, // return only count instead of full document
});

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email, role: this.role }, // token payload
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// allow virtuals in JSON responsw
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
