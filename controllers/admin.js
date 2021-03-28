
const Product = require('../models/products');
const Cart = require('../models/cart');
exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit_product', {
        doctittle: 'Add Product',
        path: '/admin/edit_product',
        editMode: false
    });
}

exports.postAddProducts = (req, res, next) => {
    const body = req.body;
    const title = body.title
    const imageUrl = body.imageUrl;
    const price = body.price;
    const description = body.description;
    req.user.createProduct({
        /*  Product.create({*/
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl
    }).then(result => {
        //console.log(result)
        res.redirect('/admin/products');
    })
        .catch(err => console.log(err));
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    //Product.findByPk(productId). 
    req.user.getProducts({ where: { id: productId } })
        .then(rows => {
            res.render('admin/edit_product', {
                doctittle: 'Edit Product',
                path: '/admin/edit_product',
                prods: rows[0],
                editMode: editMode
            });
        }).catch(err => console.log(err));
}

exports.editSaveProduct = (req, res, next) => {
    const updatedTitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProductId = req.body.productId;
    Product.findByPk(updatedProductId).then(product => {
        product.title = updatedTitle;
        product.imageUrl = updatedimageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save();
    })
        .then(result => {
            console.log('Update Product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    //Product.findAll().  
    req.user.getProducts().then(rows => {
        res.render('admin/products',
            {
                doctittle: 'Admin Product List',
                prods: rows,
                path: '/admin/products'
            });
    }).catch(err => console.log(err));
}
exports.getPostDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByPk(productId).then(product => {
        return product.destroy();
    })
        .then(result => {
            console.log('Product delete');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

