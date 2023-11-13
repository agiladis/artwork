const router = require('express').Router();
const storage = require('../../lib/multer');
const Upload = require('../../controllers/upload.controller');
const {
  GetAll,
  GetById,
  Update,
  SoftDelete,
} = require('../../controllers/gallery.controller');

router.post('/v1/upload', storage.Image.single('images'), Upload);
router.get('/v1/artworks', GetAll);
router.get('/v1/artworks/:id', GetById);
router.put('/v1/artworks/:id', Update);
router.delete('/v1/artworks/:id', SoftDelete);

module.exports = router;
