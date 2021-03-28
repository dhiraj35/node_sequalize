const Sequalize = require('sequelize');

const sequalize = require('../util/database');

const Cart = sequalize.define('cart',{
  id:{
   type: Sequalize.INTEGER,
   primaryKey:true,  
   autoIncrement:true,
   allowNull:false  
  } 
 /* product_title:{
    type: Sequalize.STRING,
  },
  product_qty:{
    type: Sequalize.INTEGER,  
  }
  /*product_prize:{
    type: Sequalize.DOUBLE,    
  }*/
});

module.exports = Cart;          