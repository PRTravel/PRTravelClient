angular.module('PRTravel.controllers', ['PRTravel.services', 'ui.calendar'])




.controller('WishListCtrl', function($scope, $window, Wishlist) {
  
  $scope.wishlists = Wishlist.all();



  $scope.removeFromWishlist = function(wishlist) {
        Wishlist.remove(wishlist);
  }
})

.controller('AlbumCtrl', function($scope, $window, Album) {
  $scope.albums = Album.all();
})



.controller('PictureController', function($scope,$stateParams, Album,$ionicModal){
  
  $scope.album = Album.get($stateParams.albumId);
  $scope.images = [];
 
    $scope.loadImages = function(album) {
        for(var i = 0; i < album.images.length; i++) {
            $scope.images.push({id: i, src: album.images[i]});
        }
    }

    $ionicModal.fromTemplateUrl('profilepage/picture.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalPicture = modal;
  });

  $scope.Picture = function(pic) {
    $scope.picture=pic;
    $scope.modalPicture.show();
  };

  $scope.closePicture = function() {
    $scope.modalPicture.hide();
  };
})

.controller('AttractionsCtrl', function($scope,$state, $ionicPopup, $timeout, Attractions, Wishlist) {
  
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

  $scope.goToAttraction = function(attraction) {
    $state.go('tab.attractions-detail', {attractionId: attraction.id});
  }
})

.controller('ServiceCtrl', function($scope, $ionicPopup) {

  $scope.total = 0;
  $scope.prevSelections = [];

  $scope.fillPrevSelections = function(services) {
    for (var i = 0; i < services.length; i++) {
      $scope.prevSelections.push(-1);
    }
  }

  $scope.updateOption = function (id, price){
  
   
    var selection = document.getElementById(id);
    var selectedOption = selection.options[selection.selectedIndex].text;
    var intSelectedOption = parseInt(selectedOption);
    if($scope.prevSelections[id] != -1 && $scope.total - ($scope.prevSelections[id] * price) >=0){
      $scope.total = $scope.total - ($scope.prevSelections[id] * price);
    }
    $scope.total = $scope.total + (intSelectedOption * price);
    $scope.prevSelections[id] = intSelectedOption;
    
  }

  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm Payment',
     template: 'Are you sure you want to buy this now?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $scope.total = 0;
       $scope.prevSelections.fill(-1);
       for (var i = 0; i < $scope.prevSelections.length; i++) {
         var selection = document.getElementById(i);
         selection.selectedIndex = 0;
       }
     } else {
       //Nothing for now...
     }
   });
 }

})

.controller('AttractionDetailCtrl', function($scope, $stateParams, Attractions) {
  $scope.attraction = Attractions.get($stateParams.attractionId);
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, ProfileInfo, $ionicModal) {
    $scope.data = {};
    
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            ProfileInfo.add($scope.data.username);
            $state.go('tab.home');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

  $ionicModal.fromTemplateUrl('signup.html', {
  scope: $scope
  }).then(function(modal) {
    $scope.modalSignup = modal;
  });

  $scope.signup = function() {
    $scope.modalSignup.show();
  };

  $scope.closeSignup = function() {
    $scope.modalSignup.hide();
  };

})

.controller("registrationCtrl", function($scope, Users, ProfileInfo) {
    $scope.data = {};

    $scope.submit = function() {
        Users.add($scope.data.firstname, $scope.data.lastname, $scope.data.username, $scope.data.password, $scope.data.email);
        $scope.modalSignup.hide();
 
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

   $ionicModal.fromTemplateUrl('settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSetting = modal;
  });

  $scope.setting = function() {
    $scope.modalSetting.show();

  };

  $scope.closesetting = function() {
    $scope.modalSetting.hide();
  };


})


.controller('SettingController',function($scope, $state, $stateParams, $ionicPopup) {

 
  $scope.logout = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Comfirm logout',
     template: 'Are you sure you want to logout?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $state.go('login');
        $scope.modalSetting.hide();
     } else {
       //Nothing for now...
     }
   });
 }

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

.controller("ProfileController", function($scope, $state, $stateParams, ProfileInfo){
    $scope.profileinfo = ProfileInfo.all();
    console.log($scope.profileinfo);

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


.controller('DivCtrl2', function($scope) {
 $scope.boxShow = false;
 $scope.toggleLikeUserPage = function()
        {
            var count=1;
            if($scope.hasLikedUser){
                $scope.hasLikedUser = false;
                count = count -1;

        
            } else{
                $scope.hasLikedUser = true;
        
            }
           
            
        }
})

.controller('ButtonCtrl',function($scope, $ionicPopup, $stateParams, Newsfeed) {

  $scope.showCommentPopup = function() {
    $scope.data = {};

    var commentPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.comment">',
      title: 'Enter your post.',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        { 
          text: 'Post',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.comment) {
              //don't allow the user to close unless he enters comment
              e.preventDefault();
            } else {
              Newsfeed.add($scope.data.comment);
            }
          }
        }
      ]
    });
  };
})


.controller('NewsfeedCtrl', function($scope, $ionicPopup, Newsfeed) {
   $scope.profilePicture= "geraldo.jpg";
  $scope.newsfeed = Newsfeed.all();
  $scope.showPopup = function(newsfeed) {
    $scope.data = {};

    var commentPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.comment">',
      title: 'Enter your comment.',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        { 
          text: 'Comment',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.comment) {
              //don't allow the user to close unless he enters comment
              e.preventDefault();
            } else {
              
              Newsfeed.addcomment(newsfeed.id, $scope.data.comment);
            }
          }
        }
      ]
    });
  };
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

