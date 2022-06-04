'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Photos', [
      {
        userId: 1,
        albumId: 1,
        photoUrl: "https://cdn.pixabay.com/photo/2019/10/13/20/28/gorilla-4547188_960_720.jpg",
        content: "Chuck",
        state: "California",
        city: "Oakland",
        zipCode: "94607",
        lat: "37.804363",
        lng: "-122.271111",

      },
      {
        userId: 1,
        albumId: 1,
        photoUrl: "https://cdn.pixabay.com/photo/2017/05/19/18/51/lion-2327225_960_720.jpg",
        content: "Simba",
        state: "Texas",
        city: "Dallas",
        zipCode: "75001",
        lat: "32.779167",
        lng: "-96.808891",

      },
      {
        userId: 1,
        albumId: 1,
        photoUrl: "https://cdn.pixabay.com/photo/2017/10/21/22/58/animal-2876068_960_720.jpg",
        content: "Baby Chuck",
        state: "Oregon",
        city: "Beaverton",
        zipCode: "97005",
        lat: "45.485168",
        lng: "-122.804489",


      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
