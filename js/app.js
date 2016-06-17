var surfSpots = [
  {
    name : 'Linda Mar Beach',
    latitude : '37.5867531',
    longitude : '-122.4919432',
    mark : ''
  },

  {
    name : 'Rockaway Beach',
    latitude : '37.6059876',
    longitude : '-122.4917772',
    mark : ''
  },

  {
    name : 'Ocean Beach',
    latitude : '37.774',
    longitude : '-122.5125',
    mark : ''
  },

  {
    name : 'Mavericks',
    latitude : '37.497882',
    longitude : '-122.498801',
    mark : ''
  },

  {
    name : 'Fort Point',
    latitude : '37.8088047',
    longitude : '-122.4721241',
    mark : ''
  },

  {
    name : 'Stinson Beach',
    latitude : '37.9004',
    longitude : '-122.6444',
    mark : ''
  },

  {
    name : 'Steamer Lane',
    latitude : '36.9538399',
    longitude : '-122.0241292',
    mark : ''
  },

  {
    name : 'Cowells Cove',
    latitude : '36.9624806',
    longitude : '-122.0240314',
    mark : ''
  },

  {
    name : 'Bolinas',
    latitude : '37.9093',
    longitude : '-122.6863',
    mark : ''
  },

  {
    name : 'Montara',
    latitude : '37.5469',
    longitude : '-122.5149',
    mark : ''
  }
]

var Spot = function(data) {
  this.name = ko.observable(data.name);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.mark = '';
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

  // function loadData() {

  //   var $body = $('body');
  //   var $wikiElem = $('#wikipedia-links');

  //   // clear out old data before new request
  //   $wikiElem.text("");

  //   // Wikipedia AJAX request here
  //   var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.name +
  //     '&format=json&callback=wikiCallback';

  //   var wikiRequestTimeout = setTimeout(function() {
  //     $wikiElem.text("failed to get wikipedia resources");
  //   }, 4000);

  //   $.ajax({
  //     url: wikiUrl,
  //     dataType: "jsonp",
  //     // jsonp: "callback",
  //     success: function( response ) {
  //       var articleList = response[1];

  //       for (var i = 0; i < articleList.length; i++) {
  //         articleStr = articleList[i];
  //         var url = 'http://en.wikipedia.org/wiki' + articleStr;
  //         $wikiElem.append('<li><a href="' + url + '">' +
  //           articleStr + '</a></li>');
  //       };

  //       clearTimeout(wikiRequestTimeout);
  //     }
  //   });

  //   return false;
  // };

  // $('#form-container').submit(loadData);

};

  var map;
  var marker;
  // var infoWindow = new google.maps.InfoWindow();

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.563, lng: -122.3255},
      zoom: 8
    });
  }


ko.applyBindings(new ViewModel());


