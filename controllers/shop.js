const Product = require('../models/products');
const Cart = require('../models/cart');


exports.getproducts = (req, res, next) => {
    Product.findAll().then(result => {
        res.render('shop/product_list',
            {
                doctittle: 'All Products',
                prods: result,
                path: '/products'
            });
    })
        .catch(err => console.log(err));
}

exports.getproduct = (req, res, next) => {
    const prodid = req.params.productid;
    Product.findAll({
        where: {
            id: prodid
        }
    }).then(result => {
        res.render('shop/product_details',
            {
                doctittle: 'Product Details',
                prods: result[0],
                path: '/products_details'
            });
    }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll().then(result => {
        res.render('shop/index',
            {
                doctittle: 'Shop',
                prods: result,
                path: '/'
            })
    })
        .catch(err => console.log(err));

}

exports.getCart = (req, res, next) => {
    req.user.getCart().then(cart => {
        console.log(cart);
        return cart.getProducts();
    }).then(cartdata => {
        res.render('shop/cart',
            {
                doctittle: 'Your Cart',
                path: '/cart',
                products: cartdata
            });
    }).catch(err => console.log(err));


    /* Cart.getCart().then((cartdata) => {
         res.render('shop/cart',
             {
                 doctittle: 'Your Cart',
                 path: '/cart',
                 products: cartdata[0]
             });
     }).catch(err => console.log(err));*/
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: productId } });
    }).then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
            // return fetchedCart.addProduct(product,{ through : { quantity : newQuantity  }})  
        }
        return Product.findByPk(productId);
        //  .catch(err => console.log(err));  
    })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            })
        }).then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    /*  Product.findById(productId).then(([productrows]) => {
          Cart.getCartById(productId).then(([cartrows]) => {
              Cart.addProduct(productId, productrows[0], cartrows).then(() => {
                  res.redirect('/cart');
              });
  
          })
      }).catch(err => console.log(err));*/
}
exports.postDeleteCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user.getCart().then(cart => {
        return cart.getProducts({ where: { id: productId } });
    })
        .then(products => {
            product = products[0];
            return product.cartItem.destroy();
        }).then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}



exports.getOrders = (req, res, next) => {
    req.user.getOrders({include :['products']})
        .then(order => {
            res.render('shop/orders',
                {
                    doctittle: 'Your Orders',
                    path: '/orders',
                    orders: order
                });  
        })
        .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        doctittle: 'Your Checkout',
        path: '/checkout'
    });
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        }).then(products => {
            return req.user.createOrder().then(order => {
                order.addProduct(products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity }
                    return product;
                }))

            }).catch(err => console.log(err))
        })
        .then(orders => {
            return fetchedCart.setProducts(null);
        })
        .then(orders => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));

}
