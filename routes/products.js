const express = require('express');
const Product = require('../models/product.js');//get Product model
const router = express.Router(); // Create router to wire it up with app.js

router.get('/products', (req, res, next) =>{
  Product.find((err,products)=>{
    if(err) { next(err); return; }//Error handler

    //display views/products/index.ejs
    res.render('products/index', {
      products : products
    });
  });
});


router.post('/products', (req, res, next)=>{

  const newProd = new Product({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  });
  newProd.save(err=>{
    if(err) {next(err); return;}

    //redirect to http://localhost:3000/products
    res.redirect('/products');
  });
});

//GENERIC ROUTE (SHOW DETAILS)
router.get('/products/:id', (req,res,next)=>{
  //                   \
  const id = req.params.id;

  Product.findById( id , (err,result)=>{
    if(err){
      next();return;
    }

    res.render('products/show', {
      product : result
    });
  });

});

//SHOW EDIT FORM
router.get('/products/:id/edit', (req,res,next)=>{
  const id = req.params.id;
  Product.findById(id, (err,result)=>{
    if(err){
      next(); return;
    }
    res.render('products/edit',{
      product: result
    });
  });
});

//UPDATE PRODUCT (SUBMIT EDIT FORM)
router.post('/products/:id', (req,res,next)=>{
  const id = req.params.id;
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  };
  Product.findByIdAndUpdate(id, updatedProduct, (err,result)=>{
    if(err){
      next();return;
    }
    res.redirect('/products');
  });
});

//SHOW NEW FORM
router.get('/products/new', (req, res, next)=> {
  res.render('products/new');
});

//Delte FORM
router.post('/products/:id/delete', (req, res, next)=> {
  const id = req.params.id;
  Product.findByIdAndRemove(id, (err,result)=>{
    if(err){
      next();return;
    }
    res.redirect('/products');
  });
});

module.exports = router;//Export router to app.js
