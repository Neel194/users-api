const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // .png
        const name = path
            .basename(file.originalname, ext)
            .replace(/\s+/g, '-') // replace spaces with -
            .toLowerCase();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
});

// filterning file (image only)

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } // mimetype means media type
    else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// size limit

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 },
});

module.exports = upload;
