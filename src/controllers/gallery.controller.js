const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');
const { param } = require('../routes/v1/route');
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

async function GetById(req, res) {
  const { id } = req.params;

  try {
    const artwork = await prisma.artwork.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!artwork) {
      return res
        .status(404)
        .json(
          ResponseTemplate(artwork, 'the artwork was not found', null, 404)
        );
    }

    res.status(200).json(ResponseTemplate(artwork, 'success', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { GetAll, GetById };
