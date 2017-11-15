const Products = require('../models/').products;
const ProductLikes = require('../models/').product_likes;
const Users = require('../models/').users;

exports.getTopProducts = function(done){      
  Products.findAll({
    include: [{
      model: ProductLikes,
      group: 'product_id'
    }]
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
    console.log(col)
    console.log(newCol)
  })
}
