const multer = require('multer');


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only Image file accepted'))
    }
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 3},
    fileFilter: fileFilter
});



module.exports = upload;
