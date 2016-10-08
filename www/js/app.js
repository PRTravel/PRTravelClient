// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('PRTravel', ['ionic','ionic-datepicker', 'PRTravel.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tabs.html',
    controller: 'TabsCtrl'
  })

  .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginCtrl'
  })
  
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'home.html',
        controller: 'NewsfeedCtrl'
      }
    }
  })

  .state('tab.calendar', {
    url: '/calendar',
    views: {
      'tab-calendar': {
        templateUrl: 'calendar.html',
        controller: 'EventCtrl'
      }
    }
  })

  .state('tab.attractions', {
    url: '/attractions',
    views: {
      'tab-attractions': {
        templateUrl: 'attractions.html',
        controller: 'AttractionsCtrl'
      }
    }
  })




  
   .state('profile-wishlist', {
    views: {
      'wishlist': {
        templateUrl: 'profilepage/tab-wishlist.html',
        controller: 'WishListCtrl'
      }
    }
  })

    .state('profile-album', {
    views: {
      'album': {
        templateUrl: 'profilepage/tab-album.html'
      }
    }
  })

  .state('profile-calendar', {
    views: {
      'calendar': {
        templateUrl: 'profilepage/profile-calendar.html'
      }
    }
  })

  .state('tab.attractions-detail', {
      url: '/attractions/:attractionId',
      views: {
        'tab-attractions': {
          templateUrl: 'attraction-detail.html',
          controller: 'AttractionDetailCtrl'
        }
      }
    });


  $urlRouterProvider.otherwise('/login');
});
