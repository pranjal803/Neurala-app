const Products = require('../models/').products;
const ProductLikes = require('../models/').product_likes;
const Users = require('../models/').users;
const sequelize = require('../models').sequelize;
const _ = require('underscore');

exports.getTopProducts = function(done){      
  Products.findAll({
    attributes: { 
        include: [[sequelize.fn("COUNT", sequelize.col("product_likes.product_id")), "productLikes"]] 
    },
    include: [{
        model: ProductLikes, attributes: []
    }],
    group: ['product_id']
    // include: [{
    //   model: ProductLikes,
    //   attributes: ['product_id', [sequelize.fn('COUNT', 'product_id'), 'productLikes']],
    // }]
  })
  .then((productList)=>{
    //console.log(productList);
    done(null, productList)
  })
  .catch((err)=>{
    console.log(err);
    done(err);
  })
}

exports.likeProduct = function(productId, userId, done){
  ProductLikes.findOrCreate({
    where:{
      product_id: productId,
      user_id: userId
    }
  })
  .then((col, newCol)=>{    
    done(null, col);
  })
  .catch((err)=>{
    done(err);
  })
}

exports.getUserProductLikes = function(userId, done){
  ProductLikes.findAll({
    where: {
      user_id: userId
    }
  })
  .then((likes)=>{    
    var retArr = [];
    _.each(likes, function(like){
      retArr.push(like.product_id);
    })
    done(null, retArr);
  })
  .catch((err)=>{    
    done(err);
  })
}
