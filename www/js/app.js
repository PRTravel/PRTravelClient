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
    cache: false,
    abstract: true,
    templateUrl: 'tabs.html',
    controller: 'SideMenuCtrl'
  })

  .state('login', {
      url: '/login',
      cache: false,
      templateUrl: 'login.html',
      controller: 'LoginCtrl'
  })

  .state('tab.home', {
    cache: false,
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
    cache: false,
    views: {
      'tab-calendar': {
        templateUrl: 'calendar.html',
        controller: 'CalendarCtrl'
      }
    }
  })

  .state('tab.attractions', {
    url: '/attractions',
    cache: false,
    views: {
      'tab-attractions': {
        templateUrl: 'attractions.html',
        controller: 'AttractionsCtrl'
      }
    }
  })
  .state('tab.more', {
    url: '/more',
    cache: false,
    views: {
      'tab-more': {
        templateUrl: 'more.html'
      }
    }
  })
  .state('profile-wishlist', {
     cache: false,
    views: {
      'wishlist': {
        templateUrl: 'profilepage/tab-wishlist.html',
        controller: 'WishListCtrl'
      }
    }
  })
  .state('profile-album', {
      cache: false,
      url:'/profilealbum',
    views: {
      'album': {
        templateUrl: 'profilepage/tab-album.html',
        controller: 'AlbumCtrl'
      }
    }
  })
  .state('profile-calendar', {
    cache: false,
    views: {
      'calendar': {
        templateUrl: 'profilepage/profile-calendar.html'

      }
    }
  })
  .state('album-pictures', {
      cache: false,
      url:'/profilealbum/:albumId',
      views: {
        'album': {
          templateUrl: 'profilepage/album-pictures.html',
          controller: 'PictureController'
        }
      }
    })

  .state('tab.attractions-detail', {
    cache: false,
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
