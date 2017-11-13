var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post('/register.do', function(req, res, next) {  
  passport.authenticate('local-signup', function(err, user) {
    if (err) { res.json({ status: "ERROR" }) }
    if (!user) {
      res.json({ status: "SIGNUP_INVALID" })
    } else {
      req.logIn(user, function(err) {
        if (err) { res.json({ status: "ERROR" }) }
        res.json({ status: "SIGNUP_SUCCESS" });
      });
    }

  })(req, res, next);
});

router.post('/login.do', function(req, res, next) {

  passport.authenticate('local-signin', function(err, user, info) {
    if (err) { res.json({ status: "ERROR" }) }
    if (!user) {
      res.json({ status: "INVALID_CREDS" })
    } else {
      req.logIn(user, function(err) {
        if (err) { res.json({ status: "ERROR" }) }
        res.json({ status: "LOGIN_SUCCESS" });
      });
    }

  })(req, res, next);
});

router.post('/logout.do', function(req, res) {
  req.session.destroy(function(err) {
    res.json({ status: 'LOGOUT_SUCCESS' });
  });
});

module.exports = router;
