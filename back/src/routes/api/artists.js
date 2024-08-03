const router = require("express").Router();

const { checkToken } = require("../../helpers/middlewares");
const { getAll, ownArtists, getById, getSongsByArtist, create, search } = require("../../controllers/artists.controller");

router.get("/" , getAll);
router.get("/own", checkToken ,ownArtists);
router.get("/:id", getById);
router.get("songs/:artist_id", getSongsByArtist);

router.post("/", checkToken, create);
router.post("/search", search);

module.exports = router;