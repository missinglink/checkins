
var http = require('http'),
    breakdown = require('breakdown'),
    config = {
      express:  require('./config/express')
      // passport: require('./config/passport')
    };

var app  = config.express.init();
    // auth = config.passport.init( app );

// Routes
app.configure(function() {
  app.get( '/', function( req, res ){ res.render( 'index' ); });
});

http.createServer(app).listen(3000);