
var Foursquare = require('../lib/gateway/Foursquare');
var Status = require('../lib/Status');

module.exports.init = function(app) {

  // Routes
  app.configure(function() {

    app.get( '/stream/foursquare', function( req, res ){

      if( !req.account ||
          !req.account.linked ||
          !req.account.linked.foursquare ||
          !req.account.linked.foursquare.accessToken ){
        return res.json({
          code: '401',
          error: 'Not logged in or not associated to foursquare'
        });
      }

      var gateway = new Foursquare({ token: req.account.linked.foursquare.accessToken });

      // send to foursquare land
      gateway.getUserStream( {}, function( err, resp, body ){

        if( err ){ return res.json({ code: '400', error: err }); }

        // debug
        // console.log( 'STREAM!', err, body );

        return res.json({ code: '200', body: body });
      });

    });

  });

}