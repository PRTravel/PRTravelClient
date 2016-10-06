angular.module('PRTravel.services', [])

.factory('Attractions', function() {

	var attractions = [{
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
	}, {
	  id: 3,
	  name: 'El Yunque National Forest',
	  location: 'Rio Grande',
	  image: 'img/yunque.jpg'
	}, {
	  id: 4,
	  name: 'Caja de Muertos Island',
	  location: 'Ponce',
	  image: 'img/cajaDeMuertos.jpg'
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
});