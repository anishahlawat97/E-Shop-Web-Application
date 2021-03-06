const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

const db ={};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require('./user.model')(mongoose);
db.address = require('./address.model')(mongoose);
db.order = require('./order.model')(mongoose);
db.product = require('./product.model')(mongoose);

module.exports = db;
