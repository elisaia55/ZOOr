'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING,
    content: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {});
  Photo.associate = function (models) {
    // associations can be defined here
    Photo.hasMany(models.Comment, { foreignKey: "photoId", onDelete: 'CASCADE', hooks: true });
    Photo.belongsTo(models.User, { foreignKey: "userId" });
    Photo.belongsTo(models.Album, { foreignKey: "albumId" })


  };
  return Photo;
};
