angular.module('PRTravel.services', ['ngResource'])

.factory('ActiveUser', function(){
  var user = {};
  return {
    load: function(data){
      user = data;
    },
    get: function(){
      return user;
    }
  };
})

.factory('FileService', function() {
  var images;
  var IMAGE_STORAGE_KEY = 'images';
 
  function getImages() {
    var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
    if (img) {
      images = JSON.parse(img);
    } else {
      images = [];
    }
    return images;
  };
 
  function addImage(img) {
    images.push(img);
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
  };
 
  return {
    storeImage: addImage,
    images: getImages
  }
})

.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {
 
  function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
 
  function optionsForType(type) {
    var source;
    switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    return {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
  }
 
  function saveMedia(type) {
    return $q(function(resolve, reject) {
      var options = optionsForType(type);
 
      $cordovaCamera.getPicture(options).then(function(imageUrl) {
        var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
        var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
          .then(function(info) {
            FileService.storeImage(newName);
            resolve();
          }, function(e) {
            reject();
          });
      });
    })
  }
  return {
    handleMediaDialog: saveMedia
  }
})

.factory('Users', function(){
	
		return {
		all: function() {
			return users;
		},
		remove: function(user){
			users.splice(users.indexOf(user),1);
		},
		removeAlbum: function(user, album){
			user.albums.splice(user.albums.indexOf(album),1);
		},
		removePicture: function(album, image){
			album.images.splice(album.images.indexOf(image),1);
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
	    },
	    getAlbum: function(user, albumId) {
	      for (var i = 0; i < user.albums.length; i++) {
	        if (user.albums[i].id === parseInt(albumId)) {
	          return user.albums[i];
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

	var wishlists = [];

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

.factory('Picture', function(){
	return{
		add: function(image, comment) {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var date = new Date();
			var day = date.getDate();
			var month = months[date.getMonth()];
			var year = date.getFullYear();

			image.comments.splice(0,0, {
				cname: 'User',
				cimage: 'img/user.png',
				ccomment: comment,
				cdate: day + " " + month + " " + year
			});
		},

		 get: function(imageId) {
          for (var i = 0; i < images.length; i++) {
            if (images[i].id === parseInt(imageId)) {
              return images[i];
            }
          }
          return null;
        }
	};
})

.factory('Album', function() {

	var albums = [];

	return {
		all: function() {
			return albums;
		},
    load: function(data){
      albums = data;
    },
		get: function(albumId) {
	      for (var i = 0; i < albums.length; i++) {
	        if (albums[i].albumid === parseInt(albumId)) {
	          return albums[i];
	        }
	      }
	      return null;
	    }
	};
})

.factory('Newsfeed', function() {

var newsfeed = [];
    return {
        all: function() {
            return newsfeed;
        },
        load: function(data){
          newsfeed = data;
        },
        add: function(comment) {


            newsfeed.splice(0,0, {
                id: newsfeed.length,
                date: new Date(),
                title: "NEW POST",
                author: "User",
                profilePicture: "geraldo.jpg",
                text: comment,
                ccount: 0,
                likes: 0,
                comments: []

            });

        },
        addcomment: function(newsfeed, comment) {
                newsfeed.comments.splice(0,0, {

                cimage: "ben.png",
                cdate: new Date(),
                cname: "user",
                ccomment: comment
              });
        },
        commentcounter: function(newsfeedsId, ccount){
            ccount++;
            return ccount;
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

.factory('Notifications', function() {

	
	  return {
        all: function() {
            return notifications;
        },
        add: function(comment) {


            notifications.splice(0,0, {
                id: notifications.length,
                image: "geraldo.jpg",
                author: "User",
                text: comment

            });

        }
    };
})

.factory('EventFriend', function(){
  var calEvents = new Array ();
  return {
    load: function(data){

            for(var i=0; i<data.length; i++) {
                var calEvent = new Object();
                calEvent['title'] = data[i].title;
                calEvent['start'] = data[i].start;
                calEvent['end']   = data[i].end1;
                calEvents.push(calEvent);
            }
    },
    get: function(){
      return calEvents;
    }
  };
})

.factory('EventProfile', function(){
  var calEvents = new Array ();
  return {
    load: function(data){


            for(var i=0; i<data.length; i++) {
                var calEvent = new Object();
                calEvent['title'] = data[i].title;
                calEvent['start'] = data[i].start;
                calEvent['end']   = data[i].end1;
                calEvents.push(calEvent);
            }
          
    },
    get: function(){
    	
      return calEvents;
    }
    	
    

  };
});
