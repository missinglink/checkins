
var express = require('express');

module.exports.init = function() {

  var app = express();
  app.configure(function() {
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({
      secret: 'keyboard cat'
    }));
  });

  // Templating
  app.set('views', __dirname + '/../view');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });

  return app;
}