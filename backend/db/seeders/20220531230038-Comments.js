'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        photoId: 2,
        comment: "Engaging. It keeps your mind occupied while you wait.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        photoId: 2,
        comment: "Nice use of sky blue in this colours.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        photoId: 1,
        comment: "I want to learn this kind of shape! Teach me.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        photoId: 1,
        comment: "Let me take a nap... great shot, anyway.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        photoId: 1,
        comment: "I like your colour palette :)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        photoId: 3,
        comment: "Such illustration, many shape, so nice",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        photoId: 3,
        comment: "Outstandingly revolutionary.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        photoId: 3,
        comment: "Strong colour palette.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        photoId: 3,
        comment: "Style, hero, notification, atmosphere, strong m8",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
      , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
