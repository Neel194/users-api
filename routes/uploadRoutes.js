const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

// upload route

router.post('/image', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({ success: false, message: 'No file uploaded' });
    }
    res.status(200).json({
        success: true,
        message: 'File upload successfully',
        file: {
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
            mimetype: req.file.mimetype,
        },
    });
});

module.exports = router;
