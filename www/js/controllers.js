angular.module('PRTravel.controllers', ['PRTravel.services', 'ui.calendar'])




.controller('WishListCtrl', function($scope, $window, Wishlist) {
  
  $scope.wishlists = Wishlist.all();



  $scope.removeFromWishlist = function(wishlist) {
        Wishlist.remove(wishlist);
  }
})

.controller('AttractionsCtrl', function($scope, $window, $ionicPopup, $timeout, Attractions, Wishlist) {
  
  $scope.attractions = Attractions.all();

  $scope.addToWishList = function(attraction) {
    var alertPopup = $ionicPopup.alert({
      title: attraction.name + " was added to your wish list."
    });
    Wishlist.add(attraction);
    $timeout(function() {
     alertPopup.close(); //close the popup after 2 seconds.
    }, 2000);
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
.controller('TabsCtrl', function($scope, $window, $ionicModal, $state, $stateParams){

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

   $ionicModal.fromTemplateUrl('profilepage/profilepage.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalProfile = modal;
  });

  $scope.profile = function() {
    $scope.modalProfile.show();
    $state.go('profile-wishlist');

  };

  $scope.closeprofile = function() {
    $scope.modalProfile.hide();
  };



})

.controller('PopupCtrl',function($scope, $ionicPopup, $stateParams, Attractions) {

  $scope.showCommentPopup = function() {
    $scope.data = {};

    var commentPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.comment">',
      title: 'Enter your comment.',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.comment) {
              //don't allow the user to close unless he enters comment
              e.preventDefault();
            } else {
              Attractions.add($stateParams.attractionId, $scope.data.comment);
            }
          }
        }
      ]
    });
  };
})

.controller("ProfileController", function($scope, $state, $stateParams){
    $scope.wishlist = function()
    {
      $state.go('profile-wishlist'); 
  }
  $scope.calendar=function(){
    $state.go('profile-calendar');
  }
    $scope.album=function(){
    $state.go('profile-album');
  }
})

.controller("AlbumController", function($scope) {
 
    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 20; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
        }
    }
 
})

// calendar controller
.controller('EventCtrl', function($scope, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService) {
  // search string
  $scope.searchKey = "";
  $scope.clearSearch = function() {
    $scope.searchKey = null;
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // date 
  var currentDate = new Date();
  $scope.searchStartDate = new Date(currentDate.getFullYear(),currentDate.getMonth()-1,currentDate.getDate());
  $scope.searchEndDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,currentDate.getDate());
  $scope.startDateSelected = function (startDate) {
    if(startDate > $scope.searchEndDate) {
      var msg = {title: 'Search period fraud', template: 'Do not be earlier than the end date of the search period start date.'};
      $ionicPopup.alert(msg);
      throw msg;
    }
    EventService.find($scope.searchKey,startDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
    return startDate;
  };
  $scope.endDateSelected = function (endDate) {
    if(endDate < $scope.searchStartDate) {
      var msg = {title: 'Search period fraud', template: 'Do not be earlier than the end date of the search period start date.'};
      $ionicPopup.alert(msg);
      endDate = $scope.searchEndDate;
      throw msg;
    }
    EventService.find($scope.searchKey,$scope.searchStartDate,endDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };


  

  // ui-Calendar
  $scope.eventSources = [];
  $scope.uiConfig = {
    calendar:{
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      height: 500,
      lang: 'ja',
      scrollTime: '10:00:00',
      buttonIcons: false, 
      weekNumbers: false,
      editable: false,
      eventLimit: true,
      events: EventService.getCalendarInfo()
    }
  };


});

