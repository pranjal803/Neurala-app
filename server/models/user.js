module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('users', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false,
            unique: true,            
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false            
        },            
        remember_token: {
            type: Sequelize.STRING  
        } 
    });
 
    return User;
 
}