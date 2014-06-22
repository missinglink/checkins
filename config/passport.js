
var passport = require('passport'),
  accountService = require('../src/accountService'),
  Account = require('../src/Account');

passport.serializeUser(function(account, done) {
  // console.log( '!!!serializeUser', account );

  return done( null, account.id );
});

passport.deserializeUser(function(id, done) {
  // console.log( '!!!deserializeUser', id );

  accountService.load(id, function(err, account) {
    return done(err, account);
  });
});

module.exports.init = function(app) {

  app.configure(function() {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req, res, next) {
      if (req.user) {
        // Pass user/account vars to view
        res.locals.user = req.user;
        req.account = Account.inflate(req.user);
        res.locals.account = req.account;
      }
      next();
    });
  });

  return passport;
}