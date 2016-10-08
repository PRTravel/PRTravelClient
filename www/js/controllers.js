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
              Newsfeed.add($stateParams.newsfeedsId, $scope.data.comment);
            }
          }
        }
      ]
    });
  };
})




.controller('post', function($scope, $window){
  //Logic of the search.
  $scope.search = function(){
    $window.alert('Posted ' + document.getElementById('input_text').value);
  }
})

.controller('NewsfeedCtrl', function($scope, Newsfeed) {
   $scope.profilePicture= "geraldo.jpg";
  $scope.newsfeed = Newsfeed.all();

  
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

