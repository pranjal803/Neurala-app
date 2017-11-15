const Products = require('../models/').products;
const ProductLikes = require('../models/').productLikes;
exports.getTopProducts = function(done){    
  console.log("here");
  Products.findAll({
    include: [{
      model: ProductLikes,
    //   attributes: [[sequelize.fn('COUNT', sequelize.col('product_id')), 'productLikes']],
    //   where:{
    //     like: true
    //   }
    }]
  })
  .then((productList)=>{
    console.log(productList);
    done(null, productList)
  })
  .catch((err)=>{
    console.log(err);
    done(err);
  })
}