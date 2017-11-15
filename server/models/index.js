var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

var database = process.env.RDS_DB_NAME || 'test_db';
var username = process.env.RDS_USERNAME || 'root';
var password = process.env.RDS_PASSWORD || null;
var host = process.env.RDS_HOSTNAME || '127.0.0.1';
var port = process.env.RDS_PORT || 3306;
var config = {
  database: database,
  username: username,
  password: password,
  port: port,
  host: host,
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  //logging: false,
  operatorsAliases: false
}
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.users.belongsToMany(db.products, {through: db.product_likes, foreignKey: 'user_id'})
db.products.belongsToMany(db.users, {through: db.product_likes, foreignKey: 'product_id'})
db.users.hasMany(db.product_likes, { foreignKey: 'user_id' })
db.products.hasMany(db.product_likes, { foreignKey: 'product_id' })

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;