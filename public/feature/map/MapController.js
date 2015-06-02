
app.controller( 'MapController', function( $scope, $rootScope, $location ) {

  if( !$rootScope.user ) return $location.path('/');

  // console.log( 'get self' );
  // $scope.getUser( 'self' );

  // console.log( 'i am the map controller' );
  // console.log( 'user', $rootScope.user );

  var map = L.mapbox.map( 'map', 'missinglink.map-ramgjj8y', {
    legendControl: false,
    attributionControl: false
  });

  // map.on('ready', function() {
  //   new L.Control.MiniMap(L.mapbox.tileLayer('missinglink.map-ramgjj8y')).addTo(map);
  // });

  // map.markerLayer.on('click', function(e) {

  //   var listing = e.layer.feature.properties;
  //   console.log( 'click');

  // });

  $scope.redrawClusterMap = function(){

    var markers = new L.MarkerClusterGroup();
    var group = new L.featureGroup();

    for( var id in $rootScope.checkins ){

      var checkin = $rootScope.checkins[ id ];

      var title = checkin.venue.name;
      var marker = L.marker( checkin.venue.location, {
          icon: L.mapbox.marker.icon({
            iconUrl: checkin.venue.categories[0].icon.prefix + '32' + checkin.venue.categories[0].icon.suffix
          }),
          // icon: L.mapbox.marker.icon({
          //   'marker-symbol': 'star',
          //   'marker-color': '0044FF'
          // }),
          title: title
      });
      marker.bindPopup(title);
      markers.addLayer(marker);

      new L.marker( checkin.venue.location ).addTo(group);
    }

    map.addLayer(markers);
    map.fitBounds(group.getBounds());
  }

  $scope.redrawMap = function(){

    var group = new L.featureGroup();

    for( var id in $rootScope.checkins ){

      var checkin = $rootScope.checkins[ id ];
      // console.log( 'add to map!', checkin );

      if( !checkin.venue ) continue;
      
      var html = "";
      var config = {
        icon: L.mapbox.marker.icon({
          'marker-size': 'medium',
          'marker-symbol': 'star',
          'marker-color': '#2981ca'
        })
      };

      if( checkin.photos && checkin.photos.count ){
        // https://irs1.4sqi.net/img/general/width960/2315725_Dw4Ey2sbDu6X2uZO9j0pBPCow48afL4JY5wbCyl4948.jpg
        html += "<div style=\"height:200px; width:280px; overflow:hidden;\">";
        html += "<img src=\"";
        html += checkin.photos.items[0].prefix;
        html += 'width280';
        html += checkin.photos.items[0].suffix;
        html += "\">";
        html += "</div>";

        config.icon = L.mapbox.marker.icon({
          'marker-size': 'medium',
          'marker-symbol': 'camera',
          'marker-color': '#2981ca'
        });
      }
      html += "<h4>" + checkin.venue.name + "</h4>";
      html += "<br />";
      html += "<p>" + checkin.venue.location.address + ", " + checkin.venue.location.country + "</p>";
      
      var marker = new L.marker( checkin.venue.location, config );
      marker.bindPopup( html );
      marker.addTo( group );

    }

    group.addTo( map );
    map.fitBounds( group.getBounds() );

  }

  $scope.redrawMap();
  // $rootScope.$watch( 'checkins', $scope.redrawMap );

});
