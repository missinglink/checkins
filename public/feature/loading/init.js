
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/loading', {
      controller: 'LoadingController',
      templateUrl: '/feature/loading/default.html'
    });
});