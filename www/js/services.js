angular.module('PRTravel.services', ['ngResource'])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'u' && pw == '123') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('Attractions', function() {

	var attractions = [{
	  id: 0,
	  name: 'Flamenco Beach',
	  location: 'Culebra',
	  description: 'Flamenco Beach is a public beach on the Caribbean island of Culebra. It is known for its shallow turquoise waters, white sand, swimming areas, and diving sites. It stretches for a mile around a sheltered, horseshoe-shaped bay. Playa Flamenco is a popular beach destination for both Culebra and Puerto Rico. In March 2014, Flamenco beach was ranked 3rd best beach in the world with a TripAdvisor Travelers Choice Award.',
	  image: 'img/flamenco.jpg',
	  comments: [{
	  	cname: 'Adam',
	  	cimage: 'img/adam.jpg',
	  	ccomment: 'Awesome place!',
	  	cdate: '7 Oct 2016'
	  }, {
	  	cname: 'Ben',
	  	cimage: 'img/ben.png',
	  	ccomment: 'I was so clean.',
	  	cdate: '2 Oct 2016'
	  }, {
	  	cname: 'Max',
	  	cimage: 'img/max.png',
	  	ccomment: 'I want to go back!',
	  	cdate: '1 Oct 2016'
	  }]
	}, {
	  id: 1,
	  name: 'Las Cascadas Water Park',
	  location: 'Aguadilla',
	  description: 'Las Cascadas water park is currently known as the biggest water park in the caribbean. Recently renovated, it has several attractions to both children and adults. Its attractions include the "Crazy River" which simulates rapids river, and the Wave Pools which simulate the waves of a beach. For children there is the Kiddy Pool area, and for the lovers of speed and adventure there is the Speed Slide, "The Bomb", and the Water Tunnel. Other attractions available',
	  image: 'img/cascadas.jpg',
	  comments: [{
	  	cname: 'Mike',
	  	cimage: 'img/mike.png',
	  	ccomment: 'Great place for a family trip.',
	  	cdate: '7 Oct 2016'
	  }, {
	  	cname: 'Adam',
	  	cimage: 'img/Adam.jpg',
	  	ccomment: 'It was fun!',
	  	cdate: '23 Sep 2016'
	  }, {
	  	cname: 'Perry',
	  	cimage: 'img/perry.png',
	  	ccomment: 'Nice place!',
	  	cdate: '1 Sep 2016'
	  }]
	}, {
	  id: 2,
	  name: 'Toro Verde',
	  location: 'Orocovis',
	  description: 'ToroVerde is a new Ecological Adventure Park where you can spend the day enjoying some of the most breathtaking views of Puerto Rico while experiencing adventure with family and friends. If you are someone who loves the thrill of an adrenaline rush, Toroverde is a must visit for you.',
	  image: 'img/toroverde.jpg',
	  comments: [{
	  	cname: 'Ben',
	  	cimage: 'img/ben.png',
	  	ccomment: 'Harambe was not here :(',
	  	cdate: '2 Oct 2016'
	  }, {
	  	cname: 'Perry',
	  	cimage: 'img/perry.png',
	  	ccomment: 'Very fun!',
	  	cdate: '2 Sep 2016'
	  }, {
	  	cname: 'Max',
	  	cimage: 'img/max.png',
	  	ccomment: 'I want to go back!',
	  	cdate: '1 Sep 2016'
	  }]
	}, {
	  id: 3,
	  name: 'El Yunque National Forest',
	  location: 'Rio Grande',
	  description: 'The El Yunque National Forest is the only tropical rain forest in the national forest system.  At nearly 29,000 acres, it is one of the smallest in size, yet one of the most biologically diverse of the national forests hosting hundreds of animal and plant species, some of which are found only here.',
	  image: 'img/yunque.jpg',
	  comments: [{
	  	cname: 'Adam',
	  	cimage: 'img/adam.jpg',
	  	ccomment: 'Beautiful place!',
	  	cdate: '7 Sep 2016'
	  }, {
	  	cname: 'Max',
	  	cimage: 'img/max.png',
	  	ccomment: 'The trees were very tall!',
	  	cdate: '1 Sep 2016'
	  }, {
	  	cname: 'Mike',
	  	cimage: 'img/mike.png',
	  	ccomment: 'Very amazing!',
	  	cdate: '16 Aug 2016'
	  }]
	}, {
	  id: 4,
	  name: 'Caja de Muertos Island',
	  location: 'Ponce',
	  description: 'Caja de Muertos is an uninhabited island off the southern coast of Puerto Rico, in the municipality of Ponce. Hikers and beachgoers are often seen in the island, which can be reached by ferry from the La Guancha Boardwalk sector of Ponce Playa. Together with Cardona, Ratones, Morrillito, Isla del Frio, Gatas, and Isla de Jueyes, Caja de Muertos is one of seven islands ascribed to the municipality of Ponce.',
	  image: 'img/cajaDeMuertos.jpg',
	  comments: [{
	  	cname: 'Adam',
	  	cimage: 'img/adam.jpg',
	  	ccomment: 'I had an awesome time.',
	  	cdate: '7 Oct 2016'
	  }, {
	  	cname: 'Ben',
	  	cimage: 'img/ben.png',
	  	ccomment: 'Cool place!',
	  	cdate: '2 Oct 2016'
	  }, {
	  	cname: 'Max',
	  	cimage: 'img/max.png',
	  	ccomment: 'You guys have to go.',
	  	cdate: '1 Oct 2016'
	  }]
	}];

	return {
		all: function() {
			return attractions;
		},
		get: function(attractionId) {
	      for (var i = 0; i < attractions.length; i++) {
	        if (attractions[i].id === parseInt(attractionId)) {
	          return attractions[i];
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