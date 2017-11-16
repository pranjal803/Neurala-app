const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const Products = require('../controllers/products')
const Users = require('../controllers/users')
const _ = require('underscore')
const async = require('async')

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
    if (err) {
      res.json({ status: "ERROR" })
    } else {
      res.json({ status: 'LOGOUT_SUCCESS' })
    }
  });
});

router.post('/profile.do', function(req, res) {
  if (!_.isUndefined(req.session)) {
    Users.getUser(req.session.passport.user, (err, user) => {
      if (err) {
        res.json({ status: 'ERROR' });
      }
      res.json({ status: 'OK', email: user.email });
    })
  } else {
    res.json({ status: 'ERROR' });
  }
});

router.post('/updateprofile.do', function(req, res) {
  if (!_.isUndefined(req.session)) {
    Users.getUser(req.session.passport.user, (err, user) => {
      if (err) {
        res.json({ status: 'ERROR' });
      }
      res.json({ status: 'OK', email: user.email });
    })
  } else {
    res.json({ status: 'ERROR' });
  }
});
router.post('/products.do', function(req, res) {
  if (!_.isUndefined(req.session) && !_.isUndefined(req.session.passport)) {    
    async.parallel([
        function(callback){
          Products.getTopProducts(function(err, productList) {
            if(err){
              callback(err);
            }else{
              callback(null, productList);
            }
          });
        },
        function(callback){
          Products.getUserProductLikes(req.session.passport.user, function(err, likesList){
            if(err){
              callback(err);
            }else{              
              callback(null, likesList);
            }
          })
        }
      ],
      function(err, results){
        var products = results[0];
        var likeList = results[1];
        _.each(products, function(product){          
          if(_.contains(likeList,product.id)){            
            product.dataValues.liked = true;
          }else{
            product.dataValues.liked = false;
          }
        })        
        res.json({ status: 'OK', products: products });
      }
    )
  }else{
      res.json({ status: 'ERROR', products: "" });
  }
});

router.post('/likeproduct.do', function(req, res) {
  var productId = req.body.productId;  
  if (_.isNumber(productId) && !_.isUndefined(req.session) && !_.isUndefined(req.session.passport)) {
    Products.likeProduct(productId, req.session.passport.user, function(err, row) {
      if (err) {
        res.json({ status: 'ERROR' });
      } else {
        res.json({ status: 'OK' });
      }
    })
  } else {
    res.json({ status: 'ERROR' });
  }
});

router.post('/checksession.do', function(req, res) {
  console.log(req.session);
  if (!_.isUndefined(req.session) && !_.isUndefined(req.session.passport)) {
    res.json({ status: 'OK', session: true });
  } else {
    res.json({ status: 'OK', session: false });
  }

});

router.get('*', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});


module.exports = router;