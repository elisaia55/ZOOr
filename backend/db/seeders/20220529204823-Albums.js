'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: "Savages",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Amazing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Beast",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Evil",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Family",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Cute",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Nature",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
