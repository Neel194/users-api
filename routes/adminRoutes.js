const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")

// only accessible to admin

router.get("/data", authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin access granted",
        user: req.user
    })
})

module.exports = router