angular.module('PRTravel.controllers', [])

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

.controller('PicturesCtrl', function($scope) {
  // FAKE CONTENT FOR THE NEWSFEED
  $scope.timeline = [{
    date: new Date(),
    title: "Gone but not forgotten",
    author:"Harambe",
    profilePicture:"harambe.jpg",
    text: "They killed me for a kid????",
    type: "location"

  },{
    date: new Date(),
    title: "Great app",
    author:"Harry Hernandez",
    profilePicture:"harry.jpg",
    text: "This is a cool app",
    type: "text"

  },{
    date: new Date(),
    title: "We should get an A!",
    author:"Abdiel Vega",
    profilePicture:"abdiel.jpg",
    text: "Awesome newsfeed",
    type: "video"

  },{
    date: new Date(),
    title: "El Yunque",
    author:"Christian Rios",
    profilePicture:"adam.jpg",
    text: "Acabo de visitar el yunque!!!",
    type: "picture"
  }]
   $scope.header = [{
    profilePicture: "geraldo.jpg"
   }]
})

.controller('CalendarDemoCtrl', function ($scope) {
        'use strict';
        $scope.calendar = {};
        $scope.changeMode = function (mode) {
            $scope.calendar.mode = mode;
        };

        $scope.loadEvents = function () {
            $scope.calendar.eventSource = createRandomEvents();
        };

        $scope.onEventSelected = function (event) {
            console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
        };

        $scope.onViewTitleChanged = function (title) {
            $scope.viewTitle = title;
        };

        $scope.today = function () {
            $scope.calendar.currentDate = new Date();
        };

        $scope.isToday = function () {
            var today = new Date(),
                currentCalendarDate = new Date($scope.calendar.currentDate);

            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return today.getTime() === currentCalendarDate.getTime();
        };

        $scope.onTimeSelected = function (selectedTime, events) {
            console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
        };

        function createRandomEvents() {
            var events = [];
            for (var i = 0; i < 50; i += 1) {
                var date = new Date();
                var eventType = Math.floor(Math.random() * 2);
                var startDay = Math.floor(Math.random() * 90) - 45;
                var endDay = Math.floor(Math.random() * 2) + startDay;
                var startTime;
                var endTime;
                if (eventType === 0) {
                    startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                    if (endDay === startDay) {
                        endDay += 1;
                    }
                    endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                    events.push({
                        title: 'All Day - ' + i,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: true
                    });
                } else {
                    var startMinute = Math.floor(Math.random() * 24 * 60);
                    var endMinute = Math.floor(Math.random() * 180) + startMinute;
                    startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                    endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                    events.push({
                        title: 'Event - ' + i,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: false
                    });
                }
            }
            return events;
        }
    });