const Sequalize = require('sequelize');

const sequalize = require('../util/database');

const OrderItem = sequalize.define('orderItem',{  
    id:{
        type:Sequalize.INTEGER,
        primaryKey:true,
        allowNull:false,  
        autoIncrement:true
    },
    quantity:{    
        type:Sequalize.INTEGER,     
    }
});  

module.exports = OrderItem;      