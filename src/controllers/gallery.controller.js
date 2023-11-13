const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');
const prisma = new PrismaClient();

async function GetAll(req, res) {
  try {
    const artworks = await prisma.artwork.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });

    res.status(200).json(ResponseTemplate(artworks, 'success', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { GetAll };
