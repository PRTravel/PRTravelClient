angular.module('PRTravel.controllers', ['PRTravel.services', 'ui.calendar'])

/*//////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                              */
/*                                         MAIN SECTION                                         */
/*                                                                                              */
/*//////////////////////////////////////////////////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////*/
/*                 Login Controller                 */
/*//////////////////////////////////////////////////*/

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $ionicModal, ProfileInfo, LoginService) {

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

/*//////////////////////////////////////////////////*/
/*               Registration Controller            */
/*//////////////////////////////////////////////////*/

.controller("RegistrationCtrl", function($scope, Users, ProfileInfo) {
    $scope.data = {};

    $scope.submit = function() {
        Users.add($scope.data.firstname, $scope.data.lastname, $scope.data.username, $scope.data.password, $scope.data.email);
        $scope.modalSignup.hide();
 
    }
 
})

/*//////////////////////////////////////////////////*/
/*               Side Menu Controller               */
/*//////////////////////////////////////////////////*/

.controller('SideMenuCtrl', function($scope, $ionicModal, $state, $ionicPopup){

  ///////////////////// Search Bar //////////////////////////////////////

  $scope.search = function() {
    if(document.getElementById('input_text').value != ""){
      var searchPopup = $ionicPopup.alert({
       title: '<b>Search Bar</b>',
       template: 'Searched for ' + document.getElementById('input_text').value
      });

      searchPopup.then(function(res) {
       document.getElementById('input_text').value = "";
      });
    }
  }

  ///////////////////// Profile Link /////////////////////////////////////

  $scope.profileLink = function() {

    $scope.modalProfile.show();
    $state.go('profile-wishlist');

  }

  ///////////////////// Profile Modal View ///////////////////////////////

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

  ///////////////////// Notifications Modal View ////////////////////////////

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

  ///////////////////// Settings Modal View ///////////////////////////////

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

/*//////////////////////////////////////////////////*/
/*            Notifications Controller              */
/*//////////////////////////////////////////////////*/

.controller('NotificationsCtrl', function($scope, Notifications){
  $scope.notifications = Notifications.all();
})

/*//////////////////////////////////////////////////*/
/*               Setting Controller                 */
/*//////////////////////////////////////////////////*/

.controller('SettingController',function($scope, $state, $stateParams, $ionicPopup, $ionicModal) {

  //Some Notitification Tab

  $ionicModal.fromTemplateUrl('settingNotification.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalNotificationSetting = modal;
  });

  $scope.notificationSetting = function() {
    $scope.modalNotificationSetting.show();
  };

  $scope.closeNotificationSetting = function() {
    $scope.modalNotificationSetting.hide();
  };

    //Change email tab

    $scope.changeEmail = function() {
    $scope.data = {};

   

    var changeemail = $ionicPopup.show({
      template: '<input placeholder="Current Email" type="text" ng-model="data.currentEmail"> <br> <input placeholder="New Email" type="text" ng-model="data.newEmail"> <br> <input placeholder="Verifty Email" type="text" ng-model="data.verifyEmail">',
      title: 'Change Email',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.currentEmail || !$scope.data.newEmail || !$scope.data.verifyEmail || $scope.data.newEmail != $scope.data.verifyEmail) {
              //don't allow the user to close unless he enters comment
              $scope.showAlertError();
              e.preventDefault();
            } else {
             
              $scope.showAlertCorrect();
            }
          }
        }
      ]
    });
  };

  //Change Password tab

$scope.changePassword = function() {
    $scope.data = {};

   

    var changepassword = $ionicPopup.show({
      template: '<input placeholder="Current Password" type="password" ng-model="data.currentPassword"> <br> <input placeholder="New Password" type="password" ng-model="data.newPassowrd"> <br> <input placeholder="Verifty Password" type="password" ng-model="data.verifyPassowrd">',
      title: 'Enter the password',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.currentPassword || !$scope.data.newPassowrd || !$scope.data.verifyPassowrd || $scope.data.newPassowrd != $scope.data.verifyPassowrd) {
              //don't allow the user to close unless he enters comment
              $scope.showAlertError();
              e.preventDefault();
            } else {
             
              $scope.showAlertCorrect();
            }
          }
        }
      ]
    });
  };

//Change CC

  $scope.changeCC = function() {
    $scope.data = {};

   

    var changeCC = $ionicPopup.show({
      template: '<input placeholder="Password" type="password" ng-model="data.currentPassword"> <br> <input placeholder="Credit Card" type="text" ng-model="data.creditcard"> <br> <input placeholder="CVC" type="password" ng-model="data.CVC">',
      title: 'Change Credit Card',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          type: 'button-positive',
          onTap: function(e) {
            var creditcardNumber = /^\d+$/.test($scope.data.creditcard);
            var CVC = /^\d+$/.test($scope.data.CVC);

            if (!$scope.data.currentPassword || !creditcardNumber || !CVC) {
              //don't allow the user to close unless he enters comment
              $scope.showAlertError();
              e.preventDefault();
            } else {
             
              $scope.showAlertCorrect();
            }
          }
        }
      ]
    });
  };

  $scope.logout = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm logout',
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
  };
  
//SOME ALERTS

  $scope.showAlertCorrect = function() {
   var alertPopupCorrect = $ionicPopup.alert({
    title: 'Changed!',
     template: 'Correct'
   });
  };


  $scope.showAlertError = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'ERROR!',
     template: 'Error something went wrong'
   });
  };

})

/*//////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                              */
/*                                         PROFILE SECTION                                      */
/*                                                                                              */
/*//////////////////////////////////////////////////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////*/
/*               Profile Controller                 */
/*//////////////////////////////////////////////////*/

.controller("ProfileController", function($scope, $state, ProfileInfo){

  $scope.profileinfo = ProfileInfo.all();

  $scope.wishlist = function(){
    $state.go('profile-wishlist'); 
  }

  $scope.calendar = function(){
    $state.go('profile-calendar');
  }

  $scope.album = function(){
    $state.go('profile-album');
  }

})

/*//////////////////////////////////////////////////*/
/*                Wishlist Controller               */
/*//////////////////////////////////////////////////*/

.controller('WishListCtrl', function($scope, Wishlist) {
  
  $scope.wishlists = Wishlist.all();

  $scope.removeFromWishlist = function(wishlist) {
    Wishlist.remove(wishlist);
  }

})

/*//////////////////////////////////////////////////*/
/*                Album Controller                  */
/*//////////////////////////////////////////////////*/

.controller('AlbumCtrl', function($scope, Album) {
  
  $scope.albums = Album.all();

})

/*//////////////////////////////////////////////////*/
/*                Picture Controller                */
/*//////////////////////////////////////////////////*/

.controller('PictureController', function($scope,$stateParams, Album, $ionicModal){
  
  $scope.album = Album.get($stateParams.albumId);
  $scope.images = [];
 
    $scope.loadImages = function(album) {
        for(var i = 0; i < album.images.length; i++) {
            $scope.images.push(
              { id: i, 
                src: album.images[i],
                likes: 0,
                ccomment: 1,
                hasLikedUser: false,
                comments: [{
                cimage: "img/harry.jpg",
                cname: "user",
                ccomment: "They shouldn't have killed you.",
                cdate: '2 Oct 2016'
                }]
              });
        }
    };



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

/*//////////////////////////////////////////////////*/
/*           Specific Picture Controller            */
/*//////////////////////////////////////////////////*/

.controller('SpecificPic', function($scope, $ionicPopup, Picture){
    $scope.showCommentPopup = function(image) {
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
              image.ccomment++;
              Picture.add(image, $scope.data.comment);

            }
          }
        }
      ]
    });
  };
  $scope.boxShow =false;
  $scope.toggleLikeUserPage = function(image){
    if($scope.hasLikedUser && image.hasLikedUser){
       image.hasLikedUser = false;
      $scope.hasLikedUser = false;
      image.likes--;
    } else{
      $scope.hasLikedUser =true;
      image.hasLikedUser = true;
      image.likes++;
    }   
  };

})

/*//////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                              */
/*                                       HOME SECTION                                           */
/*                                                                                              */
/*//////////////////////////////////////////////////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////*/
/*               Newsfeed Controller                */
/*//////////////////////////////////////////////////*/

.controller('NewsfeedCtrl', function($scope, $ionicPopup, Newsfeed, ProfileInfo) {

  $scope.profile = ProfileInfo.all();
  $scope.newsfeed = Newsfeed.all();

  $scope.commentsPopup = function(newsfeed) {
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
              newsfeed.ccount++;
              Newsfeed.addcomment(Newsfeed.get(newsfeed.id), $scope.data.comment);
            }
          }
        }
      ]
    });
  };
})

/*//////////////////////////////////////////////////*/
/*               Post Controller                    */
/*//////////////////////////////////////////////////*/

.controller('PostCtrl',function($scope, $ionicPopup, Newsfeed) {

  $scope.showPostPopup = function() {
    $scope.data = {};

    var postPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.post">',
      title: 'Enter your post.',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        { 
          text: 'Post',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.post) {
              //don't allow the user to close unless he enters post

              e.preventDefault();
            } else {
              Newsfeed.add($scope.data.post);
            }
          }
        }
      ]
    });
  };
})

/*//////////////////////////////////////////////////*/
/*               Likes Controller                   */
/*//////////////////////////////////////////////////*/

.controller('LikesCtrl', function($scope) {
  $scope.boxShow = false;
  $scope.toggleLikeUserPage = function(newsfeed){
    if($scope.hasLikedUser){
      $scope.hasLikedUser = false;
      newsfeed.likes--;
    } else{
      $scope.hasLikedUser = true;
      newsfeed.likes++;
    }   
  }
})

/*//////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                              */
/*                                       CALENDAR SECTION                                       */
/*                                                                                              */
/*//////////////////////////////////////////////////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////*/
/*               Calendar Controller                */
/*//////////////////////////////////////////////////*/

.controller('CalendarCtrl', function($scope, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService) {
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
      lang: 'en-gb',
      scrollTime: '10:00:00',
      buttonIcons: false, 
      weekNumbers: false,
      editable: false,
      eventLimit: true,
      events: EventService.getCalendarInfo()
    }
  };

})

/*//////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                              */
/*                                       ATTRACTIONS SECTION                                    */
/*                                                                                              */
/*//////////////////////////////////////////////////////////////////////////////////////////////*/


/*//////////////////////////////////////////////////*/
/*              Attractions Controller              */
/*//////////////////////////////////////////////////*/

.controller('AttractionsCtrl', function($scope, $http, $state, $ionicPopup, $timeout, Attractions, Wishlist) {
  
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

  $http.get("http://localhost:9000/attractions/getAttractions")
  .then(function(response) {
      $scope.data = response.statusText;
      console.log("AttractionsCtrl: " + $scope.data);
  });

})

/*//////////////////////////////////////////////////*/
/*          Attractions Detail Controller           */
/*//////////////////////////////////////////////////*/

.controller('AttractionDetailCtrl', function($scope, $stateParams, $ionicPopup, Attractions) {
  $scope.attraction = Attractions.get($stateParams.attractionId);

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

/*//////////////////////////////////////////////////*/
/*               Service Controller                 */
/*//////////////////////////////////////////////////*/

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

});