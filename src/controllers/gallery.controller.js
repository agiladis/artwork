const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');
const prisma = new PrismaClient();

async function GetAll(req, res) {
  try {
    const artworks = await prisma.artwork.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
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
    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'params must be number', null, 400));
    }

    const artwork = await prisma.artwork.findUnique({
      where: {
        id: Number(id),
        // deletedAt: null,
      },
    });

    if (!artwork) {
      return res
        .status(404)
        .json(ResponseTemplate(null, 'the artwork was not found', null, 404));
    }

    if (artwork.deletedAt != null) {
      return res
        .status(200)
        .json(
          ResponseTemplate(
            artwork.deletedAt,
            'the artwork has been deleted',
            null,
            200
          )
        );
    }

    res.status(200).json(ResponseTemplate(artwork, 'success', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

async function Update(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const artwork = await prisma.artwork.findUnique({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });

    if (!artwork) {
      return res
        .status(404)
        .json(
          ResponseTemplate(null, "the artwork doesn't exist", null, 404)
        );
    }

    const updatedArtwork = await prisma.artwork.update({
      where: { id: Number(id) },
      data: {
        title: title,
        description: description,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        updatedAt: true,
      },
    });

    res
      .status(200)
      .json(ResponseTemplate(updatedArtwork, 'success', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

// soft delete middleware
prisma.$use(async (params, next) => {
  if (params.model === 'Artwork' && params.action === 'delete') {
    params.action = 'update';
    params.args['data'] = { deletedAt: new Date() };
  }

  return next(params);
});

async function SoftDelete(req, res) {
  const { id } = req.params;

  try {
    const artwork = await prisma.artwork.findUnique({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    });

    if (!artwork) {
      return res
        .status(404)
        .json(
          ResponseTemplate(artwork, "the artwork doesn't exist", null, 404)
        );
    }

    const deletedArtwork = await prisma.artwork.delete({
      where: { id: Number(id) },
    });

    res
      .status(200)
      .json(ResponseTemplate(deletedArtwork, 'the artwork deleted', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { GetAll, GetById, Update, SoftDelete };
