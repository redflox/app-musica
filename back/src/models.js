const { sequelize } = require("./config/db");
const { DataTypes } = require("sequelize");

const Song = sequelize.define(
  "Song",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImg: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    s3Id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    s3Url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "songs",
  }
);

const Artist = sequelize.define(
  "Artist",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No bio available",
    },
    coverImg: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  { timestamps: true, tableName: "artists" }
);

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "users" }
);

// RELACIONES
Artist.hasMany(Song, { as: "songs", foreignKey: "artistId" });
Song.belongsTo(Artist, { as: "artist" });

User.hasMany(Artist, { as: "artists", foreignKey: "userId" });
Artist.belongsTo(User, { as: "user" });

sequelize
  .sync({ alter: true }) // Utiliza alter: true para sincronización automática en desarrollo
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("Unable to synchronize the models:", error);
  });

module.exports = { Song, Artist, User };
