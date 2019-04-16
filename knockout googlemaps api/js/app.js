// GLOBAL VARIABLES //
var viewModel;
var map;
var initalZoom = 18;
var initialLatLong = {
    lat:  -15.769603,
    lng:  -47.890719
};
var filteredInput = ko.observable("");

//FourSquare API Variables
var foursquareClientId = "";
var foursquareClientSecret = "";
var foursquareUrl = "https://api.foursquare.com/v2/venues/search"; // + 



// MODEL //

// COLLECTIONS //
// Array of Locations
var cheatMealLocations = [
    {
      title: "Mc Donalds",
      show: ko.observable(true),
      location: {
        lat: -15.769092,
        lng: -47.88892
      }
    },
    {
      title: "Subway",
      show: ko.observable(true),
      location: {
        lat: -15.769186,
        lng: -47.890574
      }
    },
    {
      title: "Chiquinho Sorvetes",
      show: ko.observable(true),
      location: {
        lat: -15.769233, 
        lng: -47.890757
      }
    },
    {
      title: "Buguer King",
      show: ko.observable(true),
      location: {
        lat:  -15.769704,
    		lng:  -47.891956
      }
    },
    {
      title: "Cold Stone Creamery",
      show: ko.observable(true),
      location: {
        lat: -15.769876,
        lng: -47.891914
      }
    }
];


// VIEW MODEL //
var viewModel = function() {
    var self = this;

    this.searchFilter = ko.computed(function(){
       filterLocation(cheatMealLocations);
    });

    this.showLocation = function(locations) {
      console.log(locations);
      google.maps.event.trigger(locations.marker, "click");
    };
};


// FUNCTIONS //

// Callback function for google api inicialization
function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: initialLatLong,
        zoom: initalZoom
      });
    var infoWindow = new google.maps.InfoWindow();
  
    cheatMealLocations.forEach(function(location){
      new markerFunction(location, infoWindow);
    });
}


// Filter function that filters the places
var filterLocation = function(datalist) {
    var filter = filteredInput().toLowerCase(); 

    datalist.forEach(function(data){
      if (data.title.toLowerCase().indexOf(filter) > -1) {
        data.show(true); 
        if (data.marker) {
          data.marker.setVisible(true); 
        }
      } else {
        data.show(false); 
        if (data.marker) {
          data.marker.setVisible(false);
        }
      }
    });
};

// Function that Sets the InfoWindow and provides animation to the marker
function setInfoWindow(marker, infoWindow) {
  if (infoWindow.marker != marker) {
    infoWindow.marker = marker;
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 2500);
    infoWindow.open(map, marker);
  }
};

// Function that provides the markers information and display
var markerFunction = function(data, infoWindow) {
        var contentString;
        var marker = new google.maps.Marker(
        {
          position: data.location,
          map: map,
          title: data.title,
          animation: google.maps.Animation.DROP
        });

        data.marker = marker;

        marker.addListener("click", function() {
          setInfoWindow(marker, infoWindow);
          infoWindow.setContent(contentString);
        });

        $.ajax({
          url: foursquareUrl,
          dataType: "json",
          data: {
            client_id: foursquareClientId,
            client_secret: foursquareClientSecret,
            query: marker.title, 
            near: "Brasília",
            v: 20190412 
          },
          success: function(foursquareData) {
            console.log(foursquareData);
            var venue = foursquareData.response.venues[0];
            var address = venue.location.formattedAddress[0];
            var category = venue.categories[0].name;
            var foursquareId = "https://foursquare.com/v/" + venue.id;
            contentString =
              "<div class='name'>" +
              "Name: " +
              "<span class='info'>" +
              marker.title +
              "</span></div>" +
              "<div class='category'>" +
              "Catergory: " +
              "<span class='info'>" +
              category +
              "</span></div>" +
              "<div class='address'>" +
              "Location: " +
              "<span class='info'>" +
              address +
              "</span></div>" +
              "<div class='information'>" +
              "More info: " +
              "<a href='" +
              foursquareId +
              "'>" +
              "Click here" +
              "</a></div>";

            marker.contentString;
          },
          error: function() {
            contentString =
              "<div class='name'>Could not get any data abou his location. Please try again.</div>";
          }
    })
};


// KNOCKOUT BINDINGS //
viewModel = new viewModel();

ko.applyBindings(viewModel);
