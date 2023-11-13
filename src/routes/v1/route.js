const router = require('express').Router();
const storage = require('../../lib/multer');
const Upload = require('../../controllers/upload.controller');
const { GetAll } = require('../../controllers/gallery.controller');

router.post('/v1/upload', storage.Image.single('images'), Upload);
router.get('/v1/artworks', GetAll);

module.exports = router;
