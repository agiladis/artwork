const router = require('express').Router();
const storage = require('./src/lib/multer');
const Upload = require('./src/controllers/upload.controller');

router.post('/v1/upload', storage.Image.single('images'), Upload);

module.exports = router;
