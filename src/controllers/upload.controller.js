const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ResponseTemplate = require('../helper/response.helper');
const imagekit = require('../lib/imagekit');

async function Upload(req, res) {
  try {
    const { title, description } = JSON.parse(req.body.data);

    const uploadFile = await imagekit.upload({
      fileName: req.file.originalname,
      file: stringFile,
    });

    const newImage = await prisma.artwork.create({
      data: {
        title: title,
        description: description,
        imageUrl: uploadFile.url,
      },
    });

    res.status(201).json(ResponseTemplate(newImage, 'created', null, 201));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = Upload;
