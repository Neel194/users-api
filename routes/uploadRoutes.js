const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router()

// multer config with disk storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${Date.now()}${ext}`)
    }
})

const upload = multer({ storage })

// upload route

router.post("/image", upload.single("file"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "File upload successfully",
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
    })
})

module.exports = router