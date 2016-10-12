angular.module('PRTravel.services', ['ngResource'])

.service('LoginService', function($q, Users) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 			var users = Users.all();
 			var found =false;

 			for(var i=0; i<users.length; i++)
 			{	


 				if(name == users[i].usr && pw == users[i].pws) 
 				{
 					found=true;
					deferred.resolve('Welcome ' + name + '!');
                	break;
				}
    		}
			
			if(!found) 
            	{
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

.factory('Users', function(){
	var users =[{
		id: 0,
		fname: 'Abdiel',
		lname: 'Vega',
		uimg: 'img/abdiel.jpg',
		usr: 'afvr94',
		pws: 'abdiel123',
		description: 'Samsung has temporarily halted production of its troubled Galaxy Note 7, reports Korean news agency Yonhap. The move follows decisions made on Sunday by multiple carriers, including AT&T and T-Mobile, to stop offering new units as replacements for those affected by the recall.',
		admin: false,
		email: 'abdiel017@gmail.com',
		creditCard: {
			type: 'Master Card',
			scode: 123,
			cnumber: 1234567891234567
		} //Add Notif

	},{
		id: 1,
		fname: 'Harry',
		lname: 'Hernandez',
		uimg: 'img/harry.jpg',
		usr: 'harry26',
		description: 'Samsung has temporarily halted production of its troubled Galaxy Note 7, reports Korean news agency Yonhap. The move follows decisions made on Sunday by multiple carriers, including AT&T and T-Mobile, to stop offering new units as replacements for those affected by the recall.',
		pws: 'harry123',
		admin: true,
		email: 'harry@upr.edu',
		creditCard: {
			type: 'Visa',
			scode: 321,
			cnumber: 9876543219876543
		} //Add Notif

	},{
		id: 2,
		fname: 'Geraldo',
		lname: 'Lopez',
		uimg: 'img/geraldo.jpg',
		usr: 'geraldo123',
		pws: 'geraldo123',
		description: 'Samsung has temporarily halted production of its troubled Galaxy Note 7, reports Korean news agency Yonhap. The move follows decisions made on Sunday by multiple carriers, including AT&T and T-Mobile, to stop offering new units as replacements for those affected by the recall.',
		admin: 'false',
		email: 'geraldo@gmail.com',
		creditCard: {
			type: 'Master Card',
			scode: 123,
			cnumber: 1234567891234567
		} //Add Notif

	}];
		return {
		all: function() {
			return users;
		},
		add: function(firstname, lastname, username, password, email) {
			users.push({
				id: users.length,
				fname: firstname,
				lname: lastname,
				uimg: '',
				usr: username,
				pws: password,
				description: '',
				admin: false,
				email: email,
				creditCard: {
					type: 'Master Card',
					scode: 123,
					cnumber: 1234
				}


			});
		},
		get: function(usr) {
	      for (var i = 0; i < users.length; i++) {
	        if ((users[i].usr).localeCompare(usr)==0) {
	          return users[i];
	        }
	      }
	      return null;
	    }
	};


})

.factory('ProfileInfo', function(Users){
	var profile_info = [];

	return {
		all: function(){
			return profile_info;
		},

		add: function(username) 
		{
			profile_info.splice(0, 1, Users.get(username));
		}
	};
})
.factory('Wishlist', function() {

	var wishlists = [{
	  id: 0,
	  name: 'Flamenco Beach',
	  location: 'Culebra',
	  image: 'img/flamenco.jpg'
	}, {
	  id: 1,
	  name: 'Las Cascadas Water Park',
	  location: 'Aguadilla',
	  image: 'img/cascadas.jpg'
	}, {
	  id: 2,
	  name: 'Toro Verde',
	  location: 'Orocovis',
	  image: 'img/toroverde.jpg'

	}];

	return {
		all: function() {
			return wishlists;
		},
		remove: function(wishlist){
			wishlists.splice(wishlists.indexOf(wishlist),1);
		},
		add: function(attraction) {
			wishlists.push(attraction);
		},
		get: function(wishlistId) {
	      for (var i = 0; i < wishlists.length; i++) {
	        if (wishlists[i].id === parseInt(wishlistId)) {
	          return wishlists[i];
	        }
	      }
	      return null;
	    }
	};
})


.factory('Album', function() {

	var albums = [{
	  id: 0,
	  name: 'El Yunque National Forest',
	  location: 'Rio Grande',
	  mainimage: 'img/yunque.jpg',
	  images: [ 'img/yunque4.jpg',
	  'img/yunque1.jpg',
	  'img/yunque2.jpg',
	  'img/yunque3.jpg',
	  'img/yunque5.jpg',
	  'img/yunque6.jpg'
		]}, 
	{
	  id: 1,
	  name: 'Caja de Muertos Island',
	  location: 'Ponce',
	  mainimage: 'img/cajaDeMuertos.jpg',
	  images: []

	  
	}];

	return {
		all: function() {
			return albums;
		},
		get: function(albumId) {
	      for (var i = 0; i < albums.length; i++) {
	        if (albums[i].id === parseInt(albumId)) {
	          return albums[i];
	        }
	      }
	      return null;
	    }
	};
})

.factory('Newsfeed', function() {


var newsfeed= [{
    id: 0,
    date: new Date(),
    title: "Gone but not forgotten",
    author:"Harambe",
    profilePicture:"harambe.jpg",
    text: "They killed me for a kid????",
    comments: [{
        cimage: "perry.png",
        cdate: new Date(),
        cname: "user",
        ccomment: "this is a great comment"

    }]

  },{
    id:1,
    date: new Date(),
    title: "Great app",
    author:"Harry Hernandez",
    profilePicture:"harry.jpg",
    text: "This is a cool app",
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
	  }],
	  services: [{
	  	sname: 'Ferry tickets: ',
	  	sprice: 20.00 //for each person
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
	  }],
	  services: [{
	  	sname: 'Entrance tickets: ',
	  	sprice: 14.99 //for each person
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
	  }],
	  services: [{
	  	sname: 'Entrance tickets: ',
	  	sprice: 10.00 //for each person
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
	  }],
	  services: [{
	  	sname: 'Entrance tickets: ',
	  	sprice: 5.99 //for each person
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
	  }],
	  services: [{
	  	sname: 'Boat tickets: ',
	  	sprice: 15.99 //for each person
	  }]
	}];

	return {
		all: function() {
			return attractions;
		},
		add: function(attractionId, comment) {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var date = new Date();
			var day = date.getDate();
			var month = months[date.getMonth()];
			var year = date.getFullYear();

			attractions[attractionId].comments.splice(0,0, {
				cname: 'User',
				cimage: 'img/user.png',
				ccomment: comment,
				cdate: day + " " + month + " " + year
			});
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