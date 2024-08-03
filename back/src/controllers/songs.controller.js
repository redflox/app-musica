const { uploadFile, deleteFile } = require("../config/s3");
const { Song } = require("../models");
const { Op } = require("sequelize").Op;

const uploadSong = async (req, res) => {
    let result;
    try {
    const folder = `${req.body.genero ? req.body.genero : "otros"}/${
      req.body.album ? req.body.album : "otros"
    }`;
    result = await uploadFile(req.files.song, folder);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error uploading file", error: error });
  }
  try {
    const song = await Song.create({
      ...req.body,
      s3Id: result.s3Id,
      s3Url: result.s3Url,
    });
    return res.status(201).json(song);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating song", error: error });
  }
};

const search = async (req, res) => {
  const { search } = req.body;
  try{
    const songs = await Song.findAll({
      where: {
        title: {
          [Op.like] : `%${search}%`
        }
      }
    });
    res.json(songs);

  }catch ( error ) {
    res.json(error);
  }
}

const deleteSong = async (req, res) => {
  const {song_id} = req.params;
  const song = await Song.findByPk(song_id);
  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }
  try {
    await deleteFile(song.s3Id);
    await song.destroy();
    return res.status(204).end();
  }catch (error ) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting song", error: error });
  }
}


module.exports = { uploadSong, search, deleteSong };
