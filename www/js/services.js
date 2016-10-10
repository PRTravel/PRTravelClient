angular.module('PRTravel.services', ['ngResource'])


.factory('Newsfeed', function() {

var newsfeed= [{
    id: 0,
    date: new Date(),
    title: "Gone but not forgotten",
    author:"Harambe",
    profilePicture:"harambe.jpg",
    text: "They killed me for a kid????",
    ccount: 2,
    comments: [{
        cimage: "perry.png",
        cdate: new Date(),
        cname: "user",
        ccomment: "this is a great comment"
},{
        cimage: "perry.png",
        cdate: new Date(),
        cname: "user",
        ccomment: "this is my second comment"

    }]

  },{
    id:1,
    date: new Date(),
    title: "Great app",
    author:"Harry Hernandez",
    profilePicture:"harry.jpg",
    text: "This is a cool app",
    ccount: 1,
    comments: [{
        cimage: "harambe.jpg",
        cdate: new Date(),
        cname: "user",
        ccomment: "Awesome"

    }]

  },{
    id:2,
    date: new Date(),
    title: "We should get an A!",
    author:"Abdiel Vega",
    profilePicture:"abdiel.jpg",
    text: "Awesome newsfeed",
    ccount: 1,
    comments: [{
        cimage: "harambe.jpg",
        cdate: new Date(),
        cname: "user",
        ccomment: "Awesome"

    }]

  },{
    id:3,
    date: new Date(),
    title: "El Yunque",
    author:"Christian Rios",
    profilePicture:"adam.jpg",
    text: "Acabo de visitar el yunque!!!",
    ccount: 1,
    comments: [{
        cimage: "harambe.jpg",
        cdate: new Date(),
        cname: "user",
        ccomment: "Awesome"

    }]
  }];

    return {
        all: function() {
            return newsfeed;
        },
        add: function(comment) {
            
        
            newsfeed.splice(0,0, {
                id: newsfeed.length,
                date: new Date(),
                title: "NEW POST",
                author: "User",
                profilePicture: "geraldo.jpg",
                text: comment,
                
                
            });

        },
        addcomment: function(newsfeedsId, comment) {
                newsfeed[newsfeedsId].comments.splice(0,0, {

                cimage: "ben.png",
                cdate: new Date(),
                cname: "user",
                ccomment: comment
              });
        },
        get: function(newsfeedsId) {
          for (var i = 0; i < newsfeed.length; i++) {
            if (newsfeed[i].id === parseInt(newsfeedsId)) {
              return newsfeed[i];
            }
          }
          return null;
        }
    };
})


// event
.factory('EventService', function($q, $resource) {
    var events = $resource('./data/events.json').query();

    return {
        // String and start date, to find the event information in the end date
        find: function(string_s, start_s, end_s, distance_s, latitude_s, longitude_s) {
            var deferred = $q.defer();
            var results = events.filter(function(element) {
        // Distance check
            var currentLatLng = new google.maps.LatLng(latitude_s,longitude_s);
        var objectLatLng = new google.maps.LatLng(element.location.geo.latitude,element.location.geo.longitude);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLatLng,objectLatLng);
        var distanceCheck = distance <= distance_s;

                // String check
                var fullString = element.name + " " + element.description;
        if(!string_s) string_s = "";
                var stringCheck = fullString.toLowerCase().indexOf(string_s.toLowerCase()) > -1;

                // Start date, end date check
                var startDate = new Date(element.startDate);
                var endDate = new Date(element.endDate);
                var start = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()).getTime();
                var end = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()).getTime();
                var startEndCheck = (end - start_s.getTime()) * (end_s.getTime() - start) > 0;

                return stringCheck && startEndCheck && distanceCheck;
            });
            deferred.resolve(results);
            return deferred.promise;
        },

    findAll: function() {
            var deferred = $q.defer();
            deferred.resolve(events);
            return deferred.promise;
        },

        // eventId Returns the event information
        findById: function(eventId) {
            var deferred = $q.defer();
            var event = events[eventId - 1];
            deferred.resolve(event);
            return deferred.promise;
        },

        // fullcalendar To convert the event information to use

        getCalendarInfo: function() {
            var calEvents = new Array();
            for(var i=0; i<events.length; i++) {
                var calEvent = new Object();
                calEvent['title'] = events[i].name;
                calEvent['start'] = events[i].startDate;
                calEvent['end'] = events[i].endDate;
                calEvent['url'] = "#/tabs/calendar/" + events[i].id;
                calEvents.push(calEvent);
            }
            return calEvents;
        },

       
    }
});