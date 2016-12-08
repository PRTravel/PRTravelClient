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
          url: "http://9dc56201.ngrok.io/"
        }).then(function(response) {
          // Success
          console.log(response.data.active);
          if(response.data.active != -1){
            $scope.confirmation(response.data.uusername);
        } else{
          ActiveUser.load(response.data);
          $state.go('tab.home');
            }

        }, function(response) {

          // Error
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });

        });

    }

    $scope.confirmation = function(username){
      $scope.data = {};
      $scope.pin = {};
      $http({
        method:'GET',
        params: {username: username},
        url: "http://9dc56201.ngrok.io/checkPin"
      }).then(function(response){
        $scope.pin = response.data;

        }, function(response){

          });

        var confirmationCode = $ionicPopup.show({
      template: '<input placeholder="PIN" type="text" ng-model="data.pin">',
      title: 'PIN',
      scope: $scope,
      buttons: [
      { text: 'Cancel' },
      {
        text: 'Ok',
        type: 'button-positive',
        onTap: function(e) {
          console.log($scope.data.pin);
          console.log($scope.pin.active);
          if (!$scope.data.pin || $scope.pin.active != $scope.data.pin) {
            //don't allow the user to close unless he enters comment
            $scope.showPinError();
            e.preventDefault();
          } else {
            $http({
              method:'POST',
              params: {username: username},
              url: "http://9dc56201.ngrok.io/pinOK"
            }).then(function(response){
                $scope.showAlertCorrect();
            }, function(response){

            });
        }
      }
    }
  ]
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

    $scope.showAlertCorrect = function() {
     var alertPopupCorrect = $ionicPopup.alert({
      title: 'Verification Code',
       template: 'Your account has been sucessfully verified'
     });
    };





    $scope.showPinError = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Invalid!',
         template: 'PIN is incorrect'
       });
      };
})




/*//////////////////////////////////////////////////*/
/*               Registration Controller            */
/*//////////////////////////////////////////////////*/

.controller("RegistrationCtrl", function($scope, $http, $ionicPopup, Users) {
    $scope.data = {};

    $scope.submit = function() {

      $http({
        method:'POST',
        params: {firstname: $scope.data.firstname, lastname: $scope.data.lastname, email: $scope.data.email, username: $scope.data.username, password: $scope.data.password, creditcard: $scope.data.creditcard, cvc: $scope.data.cvc, billing: $scope.data.billing},
        url: "http://9dc56201.ngrok.io/register"
      }).then(function(response){
          $scope.confirmation($scope.data.username);

      }, function(response){
        //Error
        $scope.showAlertError();
      });
    }

    $scope.confirmation = function(username){
      $scope.data = {};
      $scope.pin = {};
      $http({
        method:'GET',
        params: {username: username},
        url: "http://9dc56201.ngrok.io/checkPin"
      }).then(function(response){
          $scope.pin = response.data;

          }, function(response){

            });

      var confirmationCode = $ionicPopup.show({
        template: '<input placeholder="PIN" type="text" ng-model="data.pin">',
        title: 'PIN',
        scope: $scope,
        buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          type: 'button-positive',
          onTap: function(e) {
            console.log($scope.data.pin);
            console.log($scope.pin.active);
            if (!$scope.data.pin || $scope.pin.active != $scope.data.pin) {
              //don't allow the user to close unless he enters comment
              $scope.showPinError();
              e.preventDefault();
            } else {
              $http({
                method:'POST',
                params: {username: username},
                url: "http://9dc56201.ngrok.io/pinOK"
              }).then(function(response){
                  $scope.showAlertCorrect();
              }, function(response){

              });
          }
        }
      }
    ]
    });
}


  $scope.showAlertCorrect = function() {
   var alertPopupCorrect = $ionicPopup.alert({
    title: 'Verification Code',
     template: 'Your account has been sucessfully verified'
   });
  };


  $scope.showAlertError = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Invalid!',
     template: 'Username or Email is already taken'
   });
  };


  $scope.showPinError = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Invalid!',
       template: 'PIN is incorrect'
     });
    };

})

/*//////////////////////////////////////////////////*/
/*               Side Menu Controller               */
/*//////////////////////////////////////////////////*/

.controller('SideMenuCtrl', function($scope, $http, $ionicModal, $state, $ionicPopup, ActiveUser, Album, EventProfile){
    $scope.profileinfo = ActiveUser.get();

    ///////////////////// Search Bar //////////////////////////////////////

    $scope.searchData = function(){
        console.log(document.getElementById('input_text').value);
        if(document.getElementById('input_text').value != ""){
          $http({
            method: 'GET',
            params: {find: document.getElementById('input_text').value},
            url: "http://9dc56201.ngrok.io/search"
          }).then(function(response) {
              $scope.data = response.data;
              document.getElementById('input_text').value = "";

          }, function(response) {
              //ERROR

          });

        }
    }
    ///////////////////////////////////////////////////

      $ionicModal.fromTemplateUrl('search.html', {
      scope: $scope
      }).then(function(modal) {
        $scope.modalSearch = modal;
      });

      $scope.search = function() {
        $scope.modalSearch.show();
        $scope.searchData();

      };

      $scope.closesearch= function() {
        $scope.modalSearch.hide();
      };

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

  $scope.profile = function(isActiveUser, friend) {

    var generalUserID;
    $scope.isActiveUser = isActiveUser;

    if(isActiveUser){
      $scope.profileinfo = ActiveUser.get();
      generalUserID = $scope.profileinfo.uid;
    } else{
      $scope.profileinfo = friend;
      generalUserID = friend.uid;

      $http({
        method: 'GET',
        params: {userID: ActiveUser.get().uid, friendID: friend.uid},
        url: "http://9dc56201.ngrok.io/isFollowed"
      }).then(function(response) {
        //Success
        $scope.follow = "Unfollow";
      }, function(response) {
        //Error
        $scope.follow = "Follow";
      });

      $scope.followOrUnfollow = function(){
        var activeUser = ActiveUser.get();
        var ntext = activeUser.ufirst + activeUser.ulast + " has followed you.";
        $http({
          method: 'POST',
          params: {userID: ActiveUser.get().uid, friendID: friend.uid, follow: $scope.follow, ntext: ntext},
          url: "http://9dc56201.ngrok.io/followOrUnfollow"
        }).then(function(response) {
          //Success
          $scope.follow = response.data;
        }, function(response) {
          //Error

        });
      }
    }


    // Load WishList
    $http({
      method: 'GET',
      params: {userID: generalUserID},
      url: "http://9dc56201.ngrok.io/getWishList"
    }).then(function(response) {
      // Success
      $scope.wishlists = response.data;

    }, function(response) {
      //Error
      console.log("WishListCtrl: ERROR");
      $scope.wishlists = null;
    });

    // Load Events

    $http({
      method: 'GET',
      params: {userID: generalUserID},
      url: "http://9dc56201.ngrok.io/getProfileCalendar"
    }).then(function(response) {
      // Success
      if (EventProfile.get().length == 0){
        EventProfile.load(response.data);
      } else{
        EventProfile.get().length = 0;
        EventProfile.load(response.data);
      }

    }, function(response) {
      //Error

    });

    // Load Albums

    $http({
      method: 'GET',
      params: {userID: generalUserID},
      url: "http://9dc56201.ngrok.io/getAlbums"
    }).then(function(response) {
      // Success
      Album.load(response.data);
      $scope.albums = Album.all();


    }, function(response) {
        // Error
    });

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
    url: "http://9dc56201.ngrok.io/getNotifications/"
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

.controller('SettingController',function($scope, $state, $ionicPopup, $ionicModal, $http, ActiveUser) {

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
    $scope.user = ActiveUser.get();


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
            if (!$scope.data.currentEmail || !$scope.data.newEmail || !$scope.data.verifyEmail || $scope.data.newEmail != $scope.data.verifyEmail || $scope.data.currentEmail != $scope.user.uemail) {
              //don't allow the user to close unless he enters comment
              $scope.showAlertError();
              e.preventDefault();
            } else {

              $http({
                method:'POST',
                params: {userID: $scope.user.uid, email: $scope.data.newEmail},
                url: "http://9dc56201.ngrok.io/changeEmail"
              }).then(function(response){

                  $scope.showAlertCorrect();
              }, function(response){
                //Error
                $scope.showAlertError();
              });
            }
          }
        }
      ]
    });
  };

  //Change Password tab

$scope.changePassword = function() {
    $scope.data = {};
    $scope.user = ActiveUser.get();


    var changepassword = $ionicPopup.show({
      template: '<input placeholder="Current Password" type="password" ng-model="data.currentPassword"> <br> <input placeholder="New Password" type="password" ng-model="data.newPassword"> <br> <input placeholder="Verifty Password" type="password" ng-model="data.verifyPassword">',
      title: 'Enter the password',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.currentPassword || !$scope.data.newPassword || !$scope.data.verifyPassword || $scope.data.newPassword != $scope.data.verifyPassword || $scope.data.currentPassword != $scope.user.upassword) {
              //don't allow the user to close unless he enters comment
              $scope.showAlertError();
              e.preventDefault();
            } else {


            }
          }
        }
      ]
    });
  };

//Change CC

  $scope.changeCC = function() {
    $scope.data = {};
    $scope.user = ActiveUser.get();


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

            if (!$scope.data.currentPassword || !creditcardNumber || !CVC || $scope.data.currentPassword != $scope.user.upassword) {
              //don't allow the user to close unless he enters comment
              $scope.showAlertError();
              e.preventDefault();
            } else {

              $http({
                method:'POST',
                params: {userID: $scope.user.uid, creditcard: $scope.data.creditcard, cvc: $scope.data.CVC},
                url: "http://9dc56201.ngrok.io/changeCreditCard"
              }).then(function(response){

                $scope.showAlertCorrect();
              }, function(response){
                //Error
                $scope.showAlertError();
              });
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

.controller("ProfileController", function($scope, $state, ActiveUser){

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

  $scope.removeFromWishlist = function(wishlist) {
    $http({
      method: 'POST',
      params: {userID: ActiveUser.get().uid, aid: wishlist.aid},
      url: "http://9dc56201.ngrok.io/removeFromWishlist"
    }).then(function(response){
        $scope.wishlists = response.data;
    }, function(response){
      console.log("ERROR");
    });
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

  // $http({
  //   method: 'GET',
  //   params: {userID: $scope.userCalendar.uid},
  //   url: "http://9dc56201.ngrok.io/getProfileCalendar"
  // }).then(function(response) {
  //   // Success
  //   if (EventProfile.get().length ==0){
  //   EventProfile.load(response.data);
  // }

  // }, function(response) {
  //   //Error

  // });


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

  // $http({
  //   method: 'GET',
  //   params: {userID: $scope.user.uid},
  //   url: "http://9dc56201.ngrok.io/getAlbums"
  // }).then(function(response) {
  //   // Success
  //   Album.load(response.data);
  //   $scope.albums = Album.all();


  // }, function(response) {
  //     // Error


  // });

  $scope.goToAlbum = function(album) {
    $state.go('album-pictures', {albumId: album.albumid});

  }

})

/*//////////////////////////////////////////////////*/
/*                Picture Controller                */
/*//////////////////////////////////////////////////*/

.controller('PictureController', function($scope, $http, $stateParams, $ionicModal, Album){

$http({
    method: 'GET',
    params: {albumID: $stateParams.albumId},
    url: "http://9dc56201.ngrok.io/getPictures"
  }).then(function(response) {
    // Success
    console.log($stateParams.albumId);

    $scope.images = response.data;


  }, function(response) {

    // Error


  });


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

.controller('NewsfeedCtrl', function($scope, $http, $ionicPopup, Newsfeed, ActiveUser) {

  $scope.user = ActiveUser.get()

  $http({
        method: 'GET',
        params: {user: $scope.user.uid},
        url: "http://9dc56201.ngrok.io/getNewsfeedInfo"
      }).then(function(response) {
        Newsfeed.load(response.data);
        $scope.newsfeed = Newsfeed.all();


      }, function(response) {
            // Error

      });


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
              $http({
                method:'POST',
                params: {userID: ActiveUser.get().uid, ctext: $scope.data.comment, pid: newsfeed.pid, cdate: new Date()},
                url: "http://9dc56201.ngrok.io/addPostComment"
              }).then(function(response){
                //Success
                $scope.newsfeed = response.data;

              }, function(response){
                //Error
              });
            }
          }
        }
      ]
    });
  };

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
                $http({
                  method: 'POST',
                  params: {userID: ActiveUser.get().uid, ptext: $scope.data.post, pdate: new Date()},
                  url: "http://9dc56201.ngrok.io/postIt"
                }).then(function(response) {
                  // Success
                  $scope.newsfeed = response.data;
                }, function(response) {
                  // Error
                });
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

// .controller('PostCtrl',function($scope, $ionicPopup, $http, Newsfeed, ActiveUser) {

//   $scope.showPostPopup = function() {
//     $scope.data = {};

//     var postPopup = $ionicPopup.show({
//       template: '<input type="text" ng-model="data.post">',
//       title: 'Enter your post.',
//       scope: $scope,
//       buttons: [
//         { text: 'Cancel' },
//         {
//           text: 'Post',
//           type: 'button-positive',
//           onTap: function(e) {
//             if (!$scope.data.post) {
//               //don't allow the user to close unless he enters post

//               e.preventDefault();
//             } else {
//                 $http({
//                   method: 'POST',
//                   params: {userID: ActiveUser.get().uid, ptext: $scope.data.post, pdate: new Date()},
//                   url: "http://9dc56201.ngrok.io/postIt"
//                 }).then(function(response) {
//                   // Success

//                 }, function(response) {
//                   // Error
//                 });
//             }
//           }
//         }
//       ]
//     });
//   };
// })

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

.controller('CalendarCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService, EventFriend, ActiveUser) {


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


 $http({
    method: 'GET',
    url: "http://9dc56201.ngrok.io/getCalendar",
    params: {userID: $scope.userCalendar.uid},
  }).then(function(response) {
    // Success
 if (EventFriend.get().length ==0){
    EventFriend.load(response.data);
}
  }, function(response) {
    //Error

  });

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

.controller('AttractionsCtrl', function($scope, $http, $state, $ionicPopup, $timeout, Attractions, ActiveUser, Wishlist) {



  $http({
    method: 'GET',
    url: "http://9dc56201.ngrok.io/getAttractions"
  }).then(function(response) {
    // Success
    $scope.attractions = response.data;


  }, function(response) {
    //Error

  });


  $scope.addToWishList = function(attraction) {

    $http({
      method: 'POST',
      params: {userID: ActiveUser.get().uid, aid: attraction.aid},
      url: "http://9dc56201.ngrok.io/addToWishList"
    }).then(function(response){
        var alertPopup = $ionicPopup.alert({
          title: attraction.aname + " was added to your wish list."
        });
        $timeout(function() {
         alertPopup.close(); //close the popup after 2 seconds.
        }, 2000);
    }, function(response){
        var alertPopup = $ionicPopup.alert({
          title: "You already have " + attraction.aname + " in your wish list."
        });
        $timeout(function() {
         alertPopup.close(); //close the popup after 2 seconds.
        }, 2000);
    });
  }

  $scope.goToAttraction = function(attraction) {
    $state.go('tab.attractions-detail', {attractionId: attraction.aid});
  }

})

/*//////////////////////////////////////////////////*/
/*          Attractions Detail Controller           */
/*//////////////////////////////////////////////////*/

.controller('AttractionDetailCtrl', function($scope, $http, $stateParams, $ionicPopup, Attractions, ActiveUser) {

  $http({
    method: 'GET',
    params: {attractionID: $stateParams.attractionId},
    url: "http://9dc56201.ngrok.io/getAttractionsDetail"
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
              $http({
                method:'POST',
                params: {userID: ActiveUser.get().uid, ctext: $scope.data.comment, aid: $stateParams.attractionId, cdate: new Date()},
                url: "http://9dc56201.ngrok.io/addAttractionComment"
              }).then(function(response){
                //Success
                $scope.attraction = response.data;

              }, function(response){
                //Error
              });

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

.controller('AdminCtrl', function($scope, $http, $ionicModal, ActiveUser) {
  $scope.activeUser = ActiveUser.get();
  if($scope.activeUser.adminstatus){
    $http({
      method: 'GET',
      url: "http://9dc56201.ngrok.io/getAdmin"
    }).then(function(response) {
      // Success
      $scope.users = response.data;

    }, function(response) {
      //Error

    });

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
