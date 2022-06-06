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
        photoUrl: "https://cdn.pixabay.com/photo/2019/10/13/20/28/gorilla-4547188_960_720.jpg",
        content: "Chuck",
        state: "California",
        city: "Oakland",
        zipCode: "94607",


      },
      {
        userId: 1,
        photoUrl: "https://cdn.pixabay.com/photo/2017/05/19/18/51/lion-2327225_960_720.jpg",
        content: "Simba",
        state: "Texas",
        city: "Dallas",
        zipCode: "75001",


      },
      {
        userId: 1,
        photoUrl: "https://cdn.pixabay.com/photo/2017/10/21/22/58/animal-2876068_960_720.jpg",
        content: "Baby Chuck",
        state: "Oregon",
        city: "Beaverton",
        zipCode: "97005",



      },
      {
        userId: 2,
        photoUrl: "https://animalcorner.org/wp-content/uploads/2015/02/lemur-3-1024x679.jpg",
        content: "Bloop",
        state: "Atlantic City",
        city: "New Jersey",
        zipCode: "47005",

      },
      {
        userId: 2,
        photoUrl: "https://i.pinimg.com/originals/80/b1/a1/80b1a1693bd635645f66c6aeb9abc7a4.jpg",
        content: "Ice",
        state: "Alaska",
        city: "South Pole",
        zipCode: "32044",

      },
      {
        userId: 1,
        photoUrl: "http://3.bp.blogspot.com/-Omo0kuDELh0/TsnxQlfnQUI/AAAAAAAABL8/pIOhBdMtsU0/s1600/nick-brandt-wildlife-animal-black-and-white-portraits-elephant-drinking-amboseli-2007.jpg",
        content: "Majesitcal Beast",
        state: "Africa",
        city: "Lagos",
        zipCode: "23402",

      },
      {
        userId: 3,
        photoUrl: "https://i.ytimg.com/vi/WC3cXnNnCnc/maxresdefault.jpg",
        content: "Free like the Wind",
        state: "Maine",
        city: "South Pole",
        zipCode: "62044",

      },
      {
        userId: 2,
        photoUrl: "https://www.freedom2do.com/wp-content/uploads/2015/07/bear2-500x500.jpg",
        content: "INCREDIBLE",
        state: "Florida",
        city: "Miami",
        zipCode: "45244",

      },
      {
        userId: 1,
        photoUrl: "https://media.istockphoto.com/photos/giant-panda-picture-id1185211680?b=1&k=20&m=1185211680&s=170667a&w=0&h=fO4ILKqMBckrTVVOVi9pMoBhg1P6hRZVyY8OnXrvPDY=",
        content: "Wonderful Sight",
        state: "Oregon",
        city: "Corvallis",
        zipCode: "52044",

      },
      {
        userId: 2,
        photoUrl: "https://s2.favim.com/orig/140420/amazing-animals-beautiful-blue-Favim.com-1687451.jpg",
        content: "Absolutely Breathe Taking",
        state: "California",
        city: "Hayward",
        zipCode: "42034",

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
