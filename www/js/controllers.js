angular.module('PRTravel.controllers', [])

.controller('AttractionsCtrl', function($scope, $window) {
  $scope.attractions = [{
    id: 0,
    name: 'Flamenco Beach',
    location: 'Culebra',
    image: 'img/flamenco.jpg'
  }, {
    id: 1,
    name: 'Las Cascadas Water Park',
    location: 'Aguadilla',
    image: 'img/cascadas.jpg'
  }, {
    id: 2,
    name: 'Toro Verde',
    location: 'Orocovis',
    image: 'img/toroverde.jpg'
  }, {
    id: 3,
    name: 'El Yunque National Forest',
    location: 'Rio Grande',
    image: 'img/yunque.jpg'
  }, {
    id: 4,
    name: 'Caja de Muertos Island',
    location: 'Ponce',
    image: 'img/cajaDeMuertos.jpg'
  }];

  $scope.addToWishList = function(name) {
        var added = name + ' was added to your Wish List.';
        $window.alert(added);
  }
})
.controller('TabsCtrl', function($scope, $window){

  //Hide and show search bar.
  $scope.showMe = true;
  $scope.toggle = function() {
      $scope.showMe = !$scope.showMe;
  }

  //Logic of the search.
  $scope.search = function(){
    $window.alert('Searched for ' + document.getElementById('input_text').value);
  }

});