const router = require("express").Router();
const fileUpload = require("express-fileupload");
const { uploadSong, search, deleteSong } = require("../../controllers/songs.controller");
const { checkToken } = require("../../helpers/middlewares");

router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./src/tmp/"
}))
router.post("/upload", checkToken, uploadSong);
router.post("/search", search);
router.delete("/:song_id", checkToken, deleteSong);

module.exports = router;
