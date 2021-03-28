const express = require('express');
//const path = require('path');  

const router = express.Router();
//const admindata = require('./admin');    
const shopcontroller = require('../controllers/shop');    

router.get('/',shopcontroller.getIndex);  
router.get('/products',shopcontroller.getproducts);     
router.get('/cart',shopcontroller.getCart);
router.post('/cart',shopcontroller.postCart);    
router.get('/checkout',shopcontroller.getCheckout);
router.get('/orders',shopcontroller.getOrders);
router.get('/prodcuts/:productid',shopcontroller.getproduct);
router.post('/cart_delete_item',shopcontroller.postDeleteCart);
router.post('/create-order',shopcontroller.postOrder);                            
module.exports = router;    