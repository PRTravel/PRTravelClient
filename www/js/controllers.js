angular.module('PRTravel.controllers', [])

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

.controller('TabsCtrl', function($scope, $window, $ionicModal){

  //Hide and show search bar.
  $scope.showMe = true;
  $scope.toggle = function() {
      $scope.showMe = !$scope.showMe;
  }

  //Logic of the search.
  $scope.search = function(){
    $window.alert('Searched for ' + document.getElementById('input_text').value);
  }

  $ionicModal.fromTemplateUrl('notifications.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalNotifications = modal;
  });

  $scope.notifications = function() {
    $scope.modalNotifications.show();
  };

  $scope.closeNotifications = function() {
    $scope.modalNotifications.hide();
  };
});