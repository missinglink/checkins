
app.controller( 'LoginController', function( $scope, $rootScope, $location, CLIENT_ID ) {
  
  // var match = $location.path().match(/access_token=(.*)/)
  $scope.userId       = 'self'
  $scope.client_id    = CLIENT_ID
  $scope.redirect_uri = encodeURIComponent(location.origin+location.pathname)
  // $scope.access_token = match && match[1] || '';

});
