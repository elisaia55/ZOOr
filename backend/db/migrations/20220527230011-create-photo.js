'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: { model: "Albums" }
      },
      photoUrl: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      content: {
        type: Sequelize.STRING(2000)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      zipCode: {

        type: Sequelize.INTEGER
      },
      lat: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 8)
      },
      lng: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 8)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Photos');
  }
};
