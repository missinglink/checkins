
// Application Bootstrap
var app = angular.module( 'checkins.app', [
  // 'restangular',
  // 'ngRoute','ngSanitize',
  'ngFoursquare'
]);

app.factory( 'HttpDebugProxy', function( $rootScope ) {
  return function( proxy ){
    return function( data, status, headers, config ){
      console.log( '[HTTP %s] > %s %s', status, config.method, config.url );
      // console.log( data );
      proxy.apply( proxy, arguments );
    }
  }
});