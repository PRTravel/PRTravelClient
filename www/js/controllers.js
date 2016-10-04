angular.module('PRTravel.controllers', [])

.controller('AttractionsCtrl', function($scope) {
  $scope.attractions = [{
    id: 0,
    name: 'Flamenco Beach',
    description: 'One of the most beutiful beaches in the world!',
    image: 'img/flamenco.jpg'
  }, {
    id: 1,
    name: 'Las Cascadas Water Park',
    description: 'Water Park',
    image: 'img/cascadas.jpg'
  }, {
    id: 2,
    name: 'Toro Verde',
    description: 'ToroVerde is a new Ecological Adventure Park',
    image: 'img/toroverde.jpg'
  }, {
    id: 3,
    name: 'El Yunque National Forest',
    description: 'El Yunque National Forest is the only tropical rain forest in the national forest system.',
    image: 'img/yunque.jpg'
  }, {
    id: 4,
    name: 'Caja de Muertos Island',
    description: 'Caja de Muertos, one of the islands of Puerto Rico just 4.8 miles off the central southern coast of the island and 1.5 hour drive from the capital city of San Juan.',
    image: 'img/cajaDeMuertos.jpg'
  }]
})

.controller('PicturesCtrl', function($scope) {
  // FAKE CONTENT FOR THE NEWSFEED
  $scope.timeline = [{
    date: new Date(),
    title: "Gone but not forgotten",
    author:"Harambe",
    profilePicture:"harambe.jpg",
    text: "They killed me for a kid????",
    type: "location"

  },{
    date: new Date(),
    title: "Great app",
    author:"Harry Hernandez",
    profilePicture:"harry.jpg",
    text: "This is a cool app",
    type: "text"

  },{
    date: new Date(),
    title: "We should get an A!",
    author:"Abdiel Vega",
    profilePicture:"abdiel.jpg",
    text: "Awesome newsfeed",
    type: "video"

  },{
    date: new Date(),
    title: "El Yunque",
    author:"Christian Rios",
    profilePicture:"adam.jpg",
    text: "Acabo de visitar el yunque!!!",
    type: "picture"
  }]
   $scope.header = [{
    profilePicture: "geraldo.jpg"
   }]
});