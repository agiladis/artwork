require('dotenv').config();
const ImageKit = require('imagekit');

const { PUBLIC_KEY_IMAGEKIT, PRIVATE_KEY_IMAGEKIT, URL_ENDPOINT_IMAGEKIT } =
  process.env;

module.exports = new ImageKit({
  publicKey: PUBLIC_KEY_IMAGEKIT,
  privateKey: PRIVATE_KEY_IMAGEKIT,
  urlEndpoint: URL_ENDPOINT_IMAGEKIT,
});
