module.exports = function(sequelize, Sequelize) {
  var ProductLikes = sequelize.define('product_likes', {
    like: {
      type: Sequelize.BOOLEAN
    }
  });

  return ProductLikes;
};