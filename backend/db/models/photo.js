'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    photoUrl: DataTypes.TEXT,
    content: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {});
  Photo.associate = function (models) {
    // associations can be defined here
    Photo.hasMany(models.Comment, { foreignKey: "userId", onDelete: 'CASCADE', hooks: true });
    Photo.belongsTo(models.User, { foreignKey: "userId" });
    Photo.belongsTo(models.Album, { foreignKey: "albumId" })
    Photo.hasMany(models.Like, { foreignKey: 'photoId', onDelete: 'CASCADE', hooks: true })


  };
  return Photo;
};
