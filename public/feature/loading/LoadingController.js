
app.controller( 'LoadingController', function( $scope, $rootScope, $location, Foursquare ) {

  if( !localStorage.getItem('token') ) return $location.path('/');

  $rootScope.user = null;
  $rootScope.checkins = {};

  // load user info
  $scope.loadUser = function( cb ){
    Foursquare.Users.get({
      userId: 'self'
    },function (data) {
      // console.log( 'user', data.response.user );
      $rootScope.user = data.response.user
      cb();
    });
  }

  $scope.totalCheckins = 99999;
  
  $scope.loadCheckinCount = function( cb ){
    Foursquare.Users.get({
      userId: 'self',
      action: 'checkins',
      offset: 0,
      limit: 1
    },function (data) {
      $scope.totalCheckins = Number( data.response.checkins.count );
      cb();
    });
  }

  var pageSize = 100; 
  $scope.loadCheckins = function( cb ){
    $scope.totalPages = Math.ceil( $scope.totalCheckins / pageSize );
    $scope.loadedPages = 0;
    for( var x=0; x<$scope.totalPages; x++ ){
      Foursquare.Users.get({
        userId: 'self',
        action: 'checkins',
        offset: x * pageSize,
        limit: pageSize
      },function (data) {
        angular.forEach( data.response.checkins.items, function( checkin ){
          $rootScope.checkins[ checkin.id ] = checkin;
        });
        cb();
      });
    }
  }

  $scope.checkDone = function(){
    $scope.loadedPages++;
    $scope.loadedCheckins = Object.keys( $rootScope.checkins ).length; //update ui
    if( $scope.loadedPages >= $scope.totalPages ){
      $location.path( "/map" );
    }
  }

  $scope.loadUser( function(){
    $scope.loadCheckinCount( function(){
      $scope.loadCheckins( $scope.checkDone );
    });
  });

});