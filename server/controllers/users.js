const Products = require('../models/').products;
const ProductLikes = require('../models/').product_likes;
const Users = require('../models/').users;
const _ = require('underscore');

exports.updateCreds = function(user, username, password, done){

}

exports.getUser = function(userId, done){
  Users.findOne({
    where:{
      id: userId
    }
  })
  .then((user)=>{
    done(null, user)
  }) 
  .catch((err)=>{
    done(err);
  })
}

exports.getUserByEmail = function(email, done){
  Users.findOne({
    where:{
      email: email
    }
  })
  .then((user)=>{
    done(null, user)
  }) 
  .catch((err)=>{
    done(err);
  }) 
}