const express = require('express');  
//const path = require('path');

const admincontroller = require('../controllers/admin');  

const router = express.Router();  

router.get('/edit_product',admincontroller.getAddProducts);   

router.get('/products',admincontroller.getProducts);     

router.post('/saveproduct',admincontroller.postAddProducts);  

router.get('/edit_product/:productId',admincontroller.getEditProducts); 
router.post('/editsaveproduct',admincontroller.editSaveProduct);
router.post('/delete_product',admincontroller.getPostDeleteProduct);

module.exports = router;         
//module.exports = product;     
//exports.router = router;  
//exports.product = product;         