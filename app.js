const express = require('express');
const bodyparser = require('body-parser');  
const path = require('path');  
const app = express();
const rootdir = require('./util/path'); 
const errorpage = require('./controllers/error');   

//const exphandlebars = require('express-handlebars');  

const admindata = require('./routes/admin');  //import router   
const shoprouter  = require('./routes/shop');  
const sequalize = require('./util/database'); 
const Product = require('./models/products'); 
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-Items'); 
const Order = require('./models/order');
const OrderItem = require('./models/order-Items');             
app.use(express.static('public'));       

app.use(bodyparser.urlencoded({      
    extended: true  
}));
//app.engine('hbs',exphandlebars({layoutsDir:'views/layouts/',defaultLayout:'mainlayouts',extname:'hbs'}));  
//app.set('view engine','hbs');               
//app.set('view engine','pug');  
app.set('view engine','ejs');    
app.set('views', 'views');
app.use((req,res,next) => {
    User.findByPk(1).then(user => {
        req.user=user;  
       // console.log(req.user);    
        next();
    })
    .catch(err => console.log(err));
} );   

         



/*
db.execute('select * from products').then(result => {    
    console.log(result[0],result[1]);    
}).catch(err => {  
    console.log(err);       
});  */   



app.use(shoprouter);    // Use Router   
app.use('/admin',admindata);   // Use Router with Define Path 
app.use(errorpage.get404);
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'}); 
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User); 
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});    
Order.belongsTo(User);
User.hasMany(Order); 
Order.belongsToMany(Product,{through:OrderItem});
//Product.belongsToMany(Order,{through:OrderItem});      



               


//force:true override table 
sequalize
.sync()          
.then(result => {     
   // console.log(result);    
   return  User.findByPk(1);      
})
.then(user => {
   if(!user){ 
        return  User.create({name:'dhiraj',email:'dhiraj@dhiraj.com'});       
    }
    return user;  
})
.then(user => {  
    return true;    
  /// if(!user){
  //  return  user.createCart();     
  // }
  // return user;    
   // console.log(result);    
}).then(cart => {  
   // console.log(cart);     
})
.catch(err => console.log(err));           


app.listen(5000);               