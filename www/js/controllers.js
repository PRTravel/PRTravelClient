angular.module('PRTravel.controllers', ['PRTravel.services', 'ui.calendar'
  ])

.controller('AttractionsCtrl', function($scope) {
  $scope.attractions = [{
    id: 0,
    name: 'Flamenco Beach',
    description: 'One of the most beutiful beaches in the world!',
    image: 'img/flamenco.jpg'
  }, {
    id: 1,
    name: 'Las Cascadas Water Park',
    description: 'Water Park',
    image: 'img/cascadas.jpg'
  }, {
    id: 2,
    name: 'Toro Verde',
    description: 'ToroVerde is a new Ecological Adventure Park',
    image: 'img/toroverde.jpg'
  }, {
    id: 3,
    name: 'El Yunque National Forest',
    description: 'El Yunque National Forest is the only tropical rain forest in the national forest system.',
    image: 'img/yunque.jpg'
  }, {
    id: 4,
    name: 'Caja de Muertos Island',
    description: 'Caja de Muertos, one of the islands of Puerto Rico just 4.8 miles off the central southern coast of the island and 1.5 hour drive from the capital city of San Juan.',
    image: 'img/cajaDeMuertos.jpg'
  }]
})


.controller('myCtrl', function($scope) {
        $scope.boxShow = false;
     $scope.openTextBox = function () {
     $scope.openTextBox = true;
 }
    })

.controller('DivCtrl2', function($scope) {
 $scope.toggleLikeUserPage = function()
        {
            
            if($scope.hasLikedUser){
                $scope.hasLikedUser = false;
        alert("UnLiked");
            } else{
                $scope.hasLikedUser = true;
        alert("Liked");
            }
            
        }
})

.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('NewsfeedCtrl', function($scope) {
  // FAKE CONTENT FOR THE NEWSFEED
  $scope.timeline = [{
    id: 0,
    date: new Date(),
    title: "Gone but not forgotten",
    author:"Harambe",
    profilePicture:"harambe.jpg",
    text: "They killed me for a kid????",

  },{
    id:1,
    date: new Date(),
    title: "Great app",
    author:"Harry Hernandez",
    profilePicture:"harry.jpg",
    text: "This is a cool app",

  },{
    id:2,
    date: new Date(),
    title: "We should get an A!",
    author:"Abdiel Vega",
    profilePicture:"abdiel.jpg",
    text: "Awesome newsfeed",

  },{
    id:3,
    date: new Date(),
    title: "El Yunque",
    author:"Christian Rios",
    profilePicture:"adam.jpg",
    text: "Acabo de visitar el yunque!!!",
  }]
  
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

})

