const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ResponseTemplate = require('../helper/response.helper');

async function Upload(req, res) {
  try {
    const { title, description } = req.body;
    const { imageUrl } = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;

    const newImage = await prisma.artwork.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });

    res.status(201).json(ResponseTemplate(newImage, 'created', null, 201));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}
