const router = require('express').Router();
const storage = require('../../lib/multer');
const Upload = require('../../controllers/upload.controller');

router.post('/v1/upload', storage.Image.single('images'), Upload);

module.exports = router;
