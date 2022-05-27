'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(2000),
      allowNull: false
    }
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
  };
  return Comment;
};
