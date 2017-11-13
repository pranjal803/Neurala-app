module.exports = function(sequelize, Sequelize) {
 
    var Products = sequelize.define('products', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(50),
            notEmpty: true,
            allowNull: false,
            unique: true          
        },
        description: {
            type: Sequelize.STRING
        }
    });
 
    return Products;
}