angular.module('PRTravel.controllers', [])

.controller('AttractionsCtrl', function($scope, $window) {
  $scope.attractions = [{
    id: 0,
    name: 'Flamenco Beach',
    //description: 'One of the most beutiful beaches in the world!',
    location: 'Culebra',
    image: 'img/flamenco.jpg'
  }, {
    id: 1,
    name: 'Las Cascadas Water Park',
    //description: 'Water Park',
    location: 'Aguadilla',
    image: 'img/cascadas.jpg'
  }, {
    id: 2,
    name: 'Toro Verde',
    //description: 'ToroVerde is a new Ecological Adventure Park',
    location: 'Orocovis',
    image: 'img/toroverde.jpg'
  }, {
    id: 3,
    name: 'El Yunque National Forest',
    //description: 'El Yunque National Forest is the only tropical rain forest in the national forest system.',
    location: 'Rio Grande',
    image: 'img/yunque.jpg'
  }, {
    id: 4,
    name: 'Caja de Muertos Island',
    //description: 'Caja de Muertos, one of the islands of Puerto Rico just 4.8 miles off the central southern coast of the island and 1.5 hour drive from the capital city of San Juan.',
    location: 'Ponce',
    image: 'img/cajaDeMuertos.jpg'
  }];

  $scope.addToWishList = function(name) {
        var added = name + ' was added to your Wish List.';
        $window.alert(added);
  }
})
.controller('TabsCtrl', function($scope){
  $scope.showMe = true;
  $scope.toggle = function() {
      $scope.showMe = !$scope.showMe;
  }
});