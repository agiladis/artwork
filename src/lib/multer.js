const multer = require('multer');
const path = require('path');

function filename(req, file, callback) {
  const fileName = Date.now() + path.extname(file.originalname);
  callback(null, fileName);
}

const generateStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, res, callback) => {
      callback(null, destination);
    },
    filename,
  });
};

module.exports = {
  Image: multer({
    storage: generateStorage('./public/images'),
    fileFilter: (req, file, callback) => {
      const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

      if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        const err = new Error(
          `Only ${allowedMimeTypes.join(', ')} allowed to upload!`
        );
        callback(err, false);
      }
    },

    onError: (err, next) => {
      next(err);
    },
  }),
};
