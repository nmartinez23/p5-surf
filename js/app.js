var surfSpots = [
  {
    name : 'Linda Mar Beach',
    latitude : '37.5867531',
    longitude : '-122.4919432'
  },

  {
    name : 'Rockaway Beach',
    latitude : '37.6059876',
    longitude : '-122.4917772'
  },

  {
    name : 'Ocean Beach',
    latitude : '37.774',
    longitude : '-122.5125'
  },

  {
    name : 'Mavericks',
    latitude : '37.497882',
    longitude : '-122.498801'
  },

  {
    name : 'Fort Point',
    latitude : '37.8088047',
    longitude : '-122.4721241'
  },

  {
    name : 'Stinson Beach',
    latitude : '37.9004',
    longitude : '-122.6444'
  },

  {
    name : 'Steamer Lane',
    latitude : '36.9538399',
    longitude : '-122.0241292'
  },

  {
    name : 'Cowells Cove',
    latitude : '36.9624806',
    longitude : '-122.0240314'
  },

  {
    name : 'Bolinas',
    latitude : '37.9093',
    longitude : '-122.6863'
  },

  {
    name : 'Montara',
    latitude : '37.5469',
    longitude : '-122.5149'
  }
]

var Spot = function(data) {
  this.name = ko.observable(data.name);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
};

var ViewModel = function() {
  var self = this;

  this.spotList = ko.observableArray([]);

  surfSpots.forEach(function(beach) {
    self.spotList.push( new Spot(beach) );
  });

  this.currentSpot = ko.observable( this.spotList()[0] );

  this.setSpot = function(clickedSpot) {
    self.currentSpot(clickedSpot);
  };
};

ko.applyBindings(new ViewModel());

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    zoom: 8
  });
}