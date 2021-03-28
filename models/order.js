const Sequalize = require('sequelize');

const sequalize = require('../util/database');

const Order = sequalize.define('order',{  
  id:{
   type: Sequalize.INTEGER,
   primaryKey:true,  
   autoIncrement:true,
   allowNull:false  
  } 
});

module.exports = Order;            