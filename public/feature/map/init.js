
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/map', {
      controller: 'MapController',
      templateUrl: '/feature/map/default.html'
    });
});