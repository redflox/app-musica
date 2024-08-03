const { Artist, Song } = require("../models");
const Op = require("sequelize").Op;

const getAll = (req, res) => {
  Artist.findAll({
    include: {
      model: Song,
      as: "songs",
      separate: true,
      order: [["createdAt", "DESC"]],
    },
  })
    .then((artists) => res.status(200).json(artists))
    .catch((error) =>
      res.status(500).json({ message: "Error getting artists", error: error })
    );
};

const ownArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.json(artists);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting artists", error: error });
  }
};

const getById = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: {
        model: Song,
        as: "songs",
        separate: true,
        order: [["createdAt", "DESC"]],
      },
    });
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    return res.json(artist);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting artist", error: error });
  }
};

const getSongsByArtist = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const songs = Song.findAll({ artistId: artist_id });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error getting songs", error: error });
  }
};

const create = async (req, res) => {
    try {
        req.body.userId = req.user.id;
        const artist = await Artist.create(req.body);
        res.status(201).json(artist);
    }catch (error) {
        res.status(500).json({ message: "Error creating artist", error: error });
    }
}

const search = async (req, res) => {
    const { query } = req.body;
    try {
        const artist = Artists.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%`}},
                    { bio: { [Op.like]: `%${query}%`}}
                ]
            }
        })
        res.json(artist);
    }
    catch (error ) {
        res.status(500).json({ message: "Error searching artist", error: error });
    }
}

module.exports = { getAll, ownArtists, getById, getSongsByArtist, create, search };
