
app.constant('CLIENT_ID','ENBRAB0GJI1OQ1RQWA50VXBPCMEBESP4HFWYL4IRTDWGODN5');

app.config(function ($routeProvider,FoursquareProvider) {
  $routeProvider
    .otherwise({
      resolve : {
        token: function ($location) {
          var match = $location.path().match(/access_token=(.*)/);
          if( match && match[1] ){
            FoursquareProvider.token = match[1];
            localStorage.setItem('token', match[1] );
            return $location.path( "/loading" );
          }
          if( localStorage.getItem('token') ){
            FoursquareProvider.token = localStorage.getItem('token');
            return $location.path( "/loading" );
          }
        }
      }
      ,templateUrl: '/feature/auth/login.html'
      ,controller:'LoginController'
    })
});