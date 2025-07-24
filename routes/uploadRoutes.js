const express = require('express');
const router = express.Router();
const upload = require('../middlewares/cloudinaryUpload');

// upload route

router.post('/image', upload.single('image'), (req, res) => {
    if (!req.file || !req.file.path) {
        return res
            .status(400)
            .json({ success: false, message: 'Upload failed' });
    }
    res.status(200).json({
        success: true,
        message: 'Image uploaded to cloudinary',
        imageUrl: req.file.path,
    });
});

module.exports = router;
