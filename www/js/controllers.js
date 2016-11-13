angular.module('PRTravel.controllers', ['PRTravel.services', 'ui.calendar'])

/*//////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                              */
/*                                         MAIN SECTION                                         */
/*                                                                                              */
/*//////////////////////////////////////////////////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////*/
/*                 Login Controller                 */
/*//////////////////////////////////////////////////*/

.controller('LoginCtrl', function($scope, $http, $ionicPopup, $state, $ionicModal, ActiveUser) {

    $scope.data = {};

    $scope.login = function() {

        $http({
          method: 'GET',
          params: {user: $scope.data.username, password: $scope.data.password},
          url: "http://localhost:9000/"
        }).then(function(response) {
          // Success
          ActiveUser.load(response.data);
          $state.go('tab.home');


        }, function(response) {

          // Error
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

.controller("RegistrationCtrl", function($scope, $http, Users) {
    $scope.data = {};

    $scope.submit = function() {

        $http.get("http://localhost:9000/register")
        .then(function(response) {

          // Success
          $scope.content = response.data;
          $scope.status = response.status;
          $scope.statusText = response.statusText;
          console.log("RegistrationCtrl: " + $scope.content + " " + $scope.status + " " + $scope.statusText);
          Users.add($scope.data.firstname, $scope.data.lastname, $scope.data.username, $scope.data.password, $scope.data.email);
          $scope.modalSignup.hide();

        }, function(response) {

          // Error
          $scope.content = response.data;
          $scope.status = response.status;
          $scope.statusText = response.statusText;
          console.log("RegistrationCtrl: " + $scope.content + " " + $scope.status + " " + $scope.statusText);

        });
    }

})

/*//////////////////////////////////////////////////*/
/*               Side Menu Controller               */
/*//////////////////////////////////////////////////*/

.controller('SideMenuCtrl', function($scope, $http, $ionicModal, $state, $ionicPopup, ActiveUser){
    $scope.profileinfo = ActiveUser.get();

  ///////////////////// Search Bar //////////////////////////////////////

  $scope.search = function() {

    if(document.getElementById('input_text').value != ""){

      $http.get("http://localhost:9000/search")
      .then(function(response) {

        // Success
        $scope.content = response.data;
        $scope.status = response.status;
        $scope.statusText = response.statusText;
        console.log("Search Bar: " + $scope.content + " " + $scope.status + " " + $scope.statusText);

        var searchPopup = $ionicPopup.alert({
          title: '<b>Search Bar</b>',
          template: 'Searched for ' + document.getElementById('input_text').value
        });

        searchPopup.then(function(res) {
          document.getElementById('input_text').value = "";
        });

      }, function(response) {

        // Error
        $scope.content = response.data;
        $scope.status = response.status;
        $scope.statusText = response.statusText;
        console.log("Search Bar: " + $scope.content + " " + $scope.status + " " + $scope.statusText);

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

  /////////////////////////Admin Acc Modal View ///////////////////////////////

 $ionicModal.fromTemplateUrl('admin.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalAdmin = modal;
  });

  $scope.admin = function() {
    $scope.modalAdmin.show();

  };

  $scope.closeadmin = function() {
    $scope.modalAdmin.hide();
  };

})

/*//////////////////////////////////////////////////*/
/*            Notifications Controller              */
/*//////////////////////////////////////////////////*/

.controller('NotificationsCtrl', function($scope, $http, Notifications, ActiveUser){
  $scope.userNotifications = ActiveUser.get();


  $http({
    method: 'GET',
    params: {userID: $scope.userNotifications.uid},
    url: "http://localhost:9000/getNotifications/"
  }).then(function(response) {
    // Success
    $scope.notifications = response.data;


  }, function(response) {
      //A-ADIR QUE SUCEDE SI NO TIENE NADA...

  });

})

/*//////////////////////////////////////////////////*/
/*               Setting Controller                 */
/*//////////////////////////////////////////////////*/

.controller('SettingController',function($scope, $state, $ionicPopup, $ionicModal) {

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

.controller("ProfileController", function($scope, $http, $state, ActiveUser){

  $http.get("http://localhost:9000/profile")
  .then(function(response) {

    // Success
    $scope.content = response.data;
    $scope.status = response.status;
    $scope.statusText = response.statusText;
    console.log("ProfileController: " + $scope.content + " " + $scope.status + " " + $scope.statusText);
    $scope.profileinfo = ActiveUser.get();

  }, function(response) {

    // Error
    $scope.content = response.data;
    $scope.status = response.status;
    $scope.statusText = response.statusText;
    console.log("ProfileController: " + $scope.content + " " + $scope.status + " " + $scope.statusText);

  });

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

.controller('WishListCtrl', function($scope, $http, ActiveUser, Wishlist) {

  $scope.user = ActiveUser.get();

  $http({
    method: 'GET',
    params: {userID: $scope.user.uid},
    url: "http://localhost:9000/getWishList"
  }).then(function(response) {
    // Success
    $scope.wishlists = response.data;


  }, function(response) {
    //Error
    console.log("WishListCtrl: ERROR");
  });

  $scope.removeFromWishlist = function(wishlist) {
    Wishlist.remove(wishlist);
  }

})


/*//////////////////////////////////////////////////*/
/*                Profile Calendar Controller       */
/*//////////////////////////////////////////////////*/
.controller('ProfileEventCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService, EventProfile, ActiveUser) {
  $scope.userCalendar = ActiveUser.get();

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
    console.log("hello");



  $http({
    method: 'GET',
    params: {userID: $scope.userCalendar.uid},
    url: "http://localhost:9000/getProfileCalendar"
  }).then(function(response) {
    console.log(response.data)
    // Success

    EventProfile.load(response.data);

  }, function(response) {
    //Error

  });


// var JSON = [
//    {
//       "title" : "Geraldo is going ice skating",
//       "start" : "2016-10-19 10:20:00",
//       "end" : "2016-10-19 11:00:00",
//       "allDay" : false
//    },{
//       "title" : "Geraldo is going to el Yunque",
//       "start" : "2016-10-13 10:20:00",
//       "end" : "2016-10-13 11:00:00",
//       "allDay" : false
//    },{
//       "title" : "Geraldo is going to Cueva Ventana",
//       "start" : "2016-10-14 10:20:00",
//       "end" : "2016-10-14 11:00:00",
//       "allDay" : false
//    }
// ];


  // ui-Calendar
  $scope.eventSources = [];
  $scope.uiConfig = {
   calendar:{
      customButtons:{
        myCustomButton: {
          text:'Add Event',
          click: function(){
            alert('Awesome Event');
          }
        }
      },
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      height: 270,
      lang: 'en-gb',
      scrollTime: '10:00:00',
      buttonIcons: false,
      weekNumbers: false,
      editable: false,
      selectable:true,
      eventLimit: true,
      events: EventProfile.get()
    }
  };


})

/*//////////////////////////////////////////////////*/
/*                Album Controller                  */
/*//////////////////////////////////////////////////*/

.controller('AlbumCtrl', function($scope, $state, $http, Album, ActiveUser) {

  $scope.user = ActiveUser.get();

  $http({
    method: 'GET',
    params: {userID: $scope.user.uid},
    url: "http://localhost:9000/getAlbums"
  }).then(function(response) {
    // Success
    Album.load(response.data);
    $scope.albums = Album.all();


  }, function(response) {
      // Error


  });

  $scope.goToAlbum = function(album) {
    $state.go('album-pictures', {albumId: album.albumid});

  }

  // $http.get("http://localhost:9000/getAlbums")
  // .then(function(response) {
  //
  //   // Success
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("AlbumCtrl: " + $scope.content + " " + $scope.status + " " + $scope.statusText);
  //   $scope.albums = Album.all();
  //
  // }, function(response) {
  //
  //   // Error
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("AlbumCtrl: " + $scope.content + " " + $scope.status + " " + $scope.statusText);
  //
  // });

})

/*//////////////////////////////////////////////////*/
/*                Picture Controller                */
/*//////////////////////////////////////////////////*/

.controller('PictureController', function($scope, $http, $stateParams, $ionicModal, Album){

$http({
    method: 'GET',
    params: {albumID: $stateParams.albumId},
    url: "http://localhost:9000/getPictures"
  }).then(function(response) {
    // Success
    console.log($stateParams.albumId);

    $scope.images = response.data;


  }, function(response) {

    // Error


  });




  // $http.get("http://localhost:9000/getPictures")
  // .then(function(response) {
  //
  //   // Success
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("PictureController: " + $scope.content + " " + $scope.status + " " + $scope.statusText);
  //
  // }, function(response) {
  //
  //   // Error
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("PictureController: " + $scope.content + " " + $scope.status + " " + $scope.statusText);
  //
  // });




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
              image.piccomments++;
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
      image.piclikes--;
    } else{
      $scope.hasLikedUser =true;
      image.hasLikedUser = true;
      image.piclikes++;
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

.controller('NewsfeedCtrl', function($scope, $http, $ionicPopup, Newsfeed, ProfileInfo, ActiveUser) {

  $http.get("http://localhost:9000/getProfileInfo")
  .then(function(response) {

    // Success
    $scope.content = response.data;
    $scope.status = response.status;
    $scope.statusText = response.statusText;
    console.log("NewsfeedCtrl (ProfileInfo): " + $scope.content + " " + $scope.status + " " + $scope.statusText);
    $scope.profile = ProfileInfo.all();

  }, function(response) {

    // Error
    $scope.content = response.data;
    $scope.status = response.status;
    $scope.statusText = response.statusText;
    console.log("NewsfeedCtrl (ProfileInfo): " + $scope.content + " " + $scope.status + " " + $scope.statusText);

  });

  $scope.user = ActiveUser.get()

  $http({
        method: 'GET',
        params: {user: $scope.user.uid},
        url: "http://localhost:9000/getNewsfeedInfo"
      }).then(function(response) {
        Newsfeed.load(response.data);
        $scope.newsfeed = Newsfeed.all();


      }, function(response) {
            // Error

      });



  // $http.get("http://localhost:9000/getNewsfeedInfo")
  // .then(function(response) {
  //
  //   // Success
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("NewsfeedCtrl (NewsfeedInfo): " + $scope.content + " " + $scope.status + " " + $scope.statusText);
  //   $scope.newsfeed = Newsfeed.all();
  //
  // }, function(response) {
  //
  //   // Error
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("NewsfeedCtrl (NewsfeedInfo): " + $scope.content + " " + $scope.status + " " + $scope.statusText);
  //
  // });

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
      newsfeed.plikes--;
    } else{
      $scope.hasLikedUser = true;
      newsfeed.plikes++;
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

.controller('CalendarCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService, EventFriend) {




  // $http.get("http://localhost:9000/getCalendar")
  // .then(function(response) {

  //   // Success
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("CalendarCtrl: " + $scope.content + " " + $scope.status + " " + $scope.statusText);

  // }, function(response) {

  //   // Error
  //   $scope.content = response.data;
  //   $scope.status = response.status;
  //   $scope.statusText = response.statusText;
  //   console.log("CalendarCtrl: " + $scope.content + " " + $scope.status + " " + $scope.statusText);

  // });

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
 

 $http({
    method: 'GET',
    url: "http://localhost:9000/getCalendar"
  }).then(function(response) {
    // Success

    EventFriend.load(response.data);

  }, function(response) {
    //Error

  });

//   var JSON = [
//    {
//       "title" : "Harry is going ice skating",
//       "start" : "2016-10-11 10:20:00",
//       "end" : "2016-10-11 11:00:00",
//       "allDay" : false
//    },{
//       "title" : "Abdiel is going to el Yunque",
//       "start" : "2016-10-13 10:20:00",
//       "end" : "2016-10-13 11:00:00",
//       "allDay" : false
//    },{
//       "title" : "Geraldo is going to Cueva Ventana",
//       "start" : "2016-11-13 10:20:00",
//       "end" : "2016-11-13 11:00:00",
//       "allDay" : false
//    },{
//       "title" : "Perry is going to Lago Dos Bocas",
//       "start" : "2016-12-15 10:20:00",
//       "end" : "2016-12-15 11:00:00",
//       "allDay" : false
//    },{
//       "title" : "Harambe is going to Heaven",
//       "start" : "2016-10-19 10:20:00",
//       "end" : "2016-10-19 11:00:00",
//       "allDay" : false
//    }
// ];

  // ui-Calendar
  $scope.eventSources = [];
  $scope.uiConfig = {
    calendar:{
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      height: 450,
      lang: 'en-gb',
      scrollTime: '10:00:00',
      buttonIcons: false,
      weekNumbers: false,
      editable: false,
      selectable:true,
      eventLimit: true,
      events: EventFriend.get()
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



  $http({
    method: 'GET',
    url: "http://localhost:9000/getAttractions"
  }).then(function(response) {
    // Success
    $scope.attractions = response.data;


  }, function(response) {
    //Error

  });

  // $http.get("http://localhost:9000/getAttractions")
  // .then(function(response) {
  //     $scope.content = response.data;
  //     $scope.status = response.status;
  //     $scope.statusText = response.statusText;
  //     console.log("AttractionsCtrl: " + $scope.content + " " + $scope.status + " " + $scope.statusText);
  //     $scope.attractions = Attractions.all();
  // });

  $scope.addToWishList = function(attraction) {
    var alertPopup = $ionicPopup.alert({
      title: attraction.aname + " was added to your wish list."
    });
    Wishlist.add(attraction);
    $timeout(function() {
     alertPopup.close(); //close the popup after 2 seconds.
    }, 2000);
  }

  $scope.goToAttraction = function(attraction) {
    $state.go('tab.attractions-detail', {attractionId: attraction.aid});
  }

})

/*//////////////////////////////////////////////////*/
/*          Attractions Detail Controller           */
/*//////////////////////////////////////////////////*/

.controller('AttractionDetailCtrl', function($scope, $http, $stateParams, $ionicPopup, Attractions) {

  $http({
    method: 'GET',
    params: {attractionID: $stateParams.attractionId},
    url: "http://localhost:9000/getAttractionsDetail"
  }).then(function(response) {
    // Success
    $scope.attraction = response.data;
    console.log($scope.attraction);


  }, function(response) {
    //Error

  });

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
    console.log(services);
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

.controller('AdminCtrl', function($scope, $ionicModal, Users) {
  $scope.users = Users.all();

  $scope.removeFromUsers = function(user) {
    Users.remove(user);
  }

  $scope.removeFromAlbums = function(user, album){
    Users.removeAlbum(user, album);
  }

  $scope.removeFromPictures = function(album, image){
    Users.removePicture(album, image);
  }

  $scope.userdetails = function(user){

    if(!user.show){
      user.show = true;
    }
    else{
      user.show=false;
    }
  }
});
