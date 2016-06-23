// Create map, marker and infoWindow variables in the global scope
var map;
var marker;
var infoWindow;

// Create locations array to hold all of the data for each location
var locations = [
  {name: 'Linda Mar Beach', address: '5000 Pacific Coast Hwy, Pacifica, CA 94044', latitude: 37.5867531, longitude: -122.4919432},
  {name: 'Rockaway Beach', address: '100 Rockaway Beach Ave, Pacifica, CA 94044', latitude: 37.6059876, longitude: -122.4917772},
  {name: 'Ocean Beach', address: '28 Great Hwy, San Francisco, CA 94121', latitude: 37.774, longitude: -122.5125},
  {name: 'Mavericks', address: '300 W Point Ave, Half Moon Bay, CA 94019', latitude: 37.497882, longitude: -122.498801},
  {name: 'Fort Point', address: '983 Marine Dr, San Francisco, CA 94129', latitude: 37.8088047, longitude: -122.4721241},
  {name: 'Stinson Beach', address: '3605 Shoreline Hwy, Stinson Beach, CA 94970', latitude: 37.9004, longitude: -122.6444},
  {name: 'Steamer Lane', address: '701 W Cliff Dr, Santa Cruz, CA 95060', latitude: 36.9538399, longitude: -122.0241292},
  {name: 'Cowells Cove', address: '21 Municipal Wharf, Santa Cruz, CA 95060', latitude: 36.9624806, longitude: -122.0240314},
  {name: 'Bolinas', address: '3 Spring, Bolinas, CA 94924', latitude: 37.9093, longitude: -122.6863},
  {name: 'Montara', address: '8150 Cabrillo Highway, Montara Beach, CA 94037', latitude: 37.5469, longitude: -122.5149}
];

function initMap() {
  // Put the ViewModel inside the initMap function
  var ViewModel = function() {
    // Create the map displaying the San Francisco Bay Area
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.2552, lng: -122.383},
      zoom: 9
    });

    var self = this;
    // Set markers to an observable array of locations and loop through array to set up animated markers and infowindows
    self.markers = ko.observableArray(locations);

    self.markers().forEach(function(beach) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(beach.latitude, beach.longitude),
        name: beach.name,
        map: map,
        animation: google.maps.Animation.DROP
      });

      beach.marker = marker;

      beach.marker.addListener('click', toggleBounce);

      function toggleBounce() {
        if (beach.marker.getAnimation() !== null) {
          beach.marker.setAnimation(null);
        } else {
          beach.marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
            beach.marker.setAnimation(null);
          }, 3000);
        }
      }
      // Assign variables to be used for Ajax and Wikipedia displayed in the infowindow
      var beaches = beach.name;
      var locations = beach.address;
      infoWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(beach.marker, 'click', function() {
        var wiki = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + beach.name + "&limit=1&redirects=return&format=json";

        var wikiTimeout = setTimeout(function() {
          alert("failed to get wikipedia resources");
        }, 2000);

        var display;
          // Set Ajax for Wikipedia API to display information and links in the infowindows
        $.ajax ({
          url: wiki,
          dataType: "jsonp",
          success: function (response){
            var articles = response[1];
            if (articles.length > 0) {
              for (var i = 0; i < articles.length; i++) {
                wikiArticle = articles[i];
                var url = 'http://en.wikipedia.org/wiki/' + wikiArticle;
                display = '<div id="info">' + beaches + '<p>' + locations + '</p>' + '<p>' + response[2] + '</p>' + '<a href=" ' + url + '">' + url + '</a>' + '</div>';
                infoWindow.setContent(display);
              }
            } else {
              display = '<div id="info">' + beaches + '<p>' + locations + '</p>' + '<p>' + 'There are no Wikipedia articles at this time'+ '</p>' + '</div>';
              infoWindow.setContent(display);
            }
            clearTimeout(wikiTimeout);
          }
          // Error message to user if the connection fails
        }).error(function(e){
          display = '<div id="info">' + beaches + '<p>' + locations + '</p>' + '<p>' + 'Sorry, not able to connect to Wikipedia at this time'+ '</p>' + '</div>';
          infoWindow.setContent(display);
          });
        infoWindow.open(map, this);
      });
    });
    // Event listener to resize the map when the screen size changes
    google.maps.event.addDomListener(window, "resize", function() {
      var resizeMap = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(resizeMap);
    });
    // filterList helps user to find the beach they are searching for without typing entire name
    var filterList = function(userSearch, firstLetter) {
      userSearch = userSearch || "";
      if (firstLetter.length > userSearch.length) {
        return false;
      }
      return userSearch.substring(0, firstLetter.length) === firstLetter;
    };

    self.openMarker = function(marker) {
      google.maps.event.trigger(this.marker, 'click');
    };
    // Create filter observables to use for searching for specific beaches
    self.filter = ko.observable('');

    self.spotsFilter = ko.computed(function(beach) {
      var filter = self.filter().toLowerCase();
      if (!filter) {
        self.markers().forEach(function(beach) {
          beach.marker.setVisible(true);
        });
        return self.markers();
      } else {
        return ko.utils.arrayFilter(self.markers(), function(beach) {
          filterCheck = beach.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
            if (filterCheck) {
              beach.marker.setVisible(true);
              return filterCheck;
            } else {
              beach.marker.setVisible(false);
              return filterCheck;
            }
        });
      }
    }, self);
  };

ko.applyBindings(new ViewModel());
}