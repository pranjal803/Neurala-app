const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const Products = require('../controllers/products')

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
        res.json({ status: "LOGIN_SUCCESS" })
      });
    }

  })(req, res, next);
});

router.post('/logout.do', function(req, res) {  
  req.session.destroy(function(err) {
    if(err){
      res.json({ status: "ERROR" })
    }else{
      res.json({ status: 'LOGOUT_SUCCESS' })
    }
  });
});

router.post('/profile.do', function(req, res) {  
  console.log(req.session);

  res.json({ status: 'OK' });
  
});

router.post('/products.do', function(req, res) {  
  Products.getTopProducts(function(err, productList){
    res.json({ status: 'OK', products: productList});
  })
});

router.post('/likeproduct.do', function(req, res) {  
  console.log(req.session);
  if()
  res.json({ status: 'OK' });
  
});

router.post('/unlikeProduct.do', function(req, res) {  
  console.log(req.session);

  res.json({ status: 'OK' });
  
});




router.get('*', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });      
});


module.exports = router;
