angular.module('PRTravel.controllers', [])




.controller('WishListCtrl', function($scope) {
  $scope.attractions = [{
    id: 0,
    name: 'Flamenco Beach',
    description: 'One of the most beutiful beaches in the world!',
    image: 'img/flamenco.jpg'
  }];
})


.controller('AttractionsCtrl', function($scope, $window, Attractions) {
  
  $scope.attractions = Attractions.all();



  $scope.addToWishList = function(name) {
        var added = name + ' was added to your Wish List.';
        $window.alert(added);
  }
})

.controller('AttractionDetailCtrl', function($scope, $stateParams, Attractions) {
  $scope.attraction = Attractions.get($stateParams.attractionId);
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
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

