
const Sequelize = require('sequelize');  

const sequelize = new Sequelize('db_grab_prod','dynamodb','P@ssw0rd@2021',{
    dialect:'mysql',
    host:'10.2.1.13'    
});      

module.exports = sequelize; 