const express = require('express');
const router = express.Router();
const categories = require('../model/Category.js');
const products = require('../model/Product.js');
const {body} = require('express-validator');
const dbManager = require('../model/dbManager')

router.get("/new", (req, res) => {
    res.render('productForm', { title: "Création produit", categories: categories.getAll()});
});

router.post("/new",
    body('name').isLength({min: 3, max:75}).escape(),
    body('price').isNumeric(),
    body('description').isLength({min: 3, max:999}).escape(),
    (req, res) => {
    products.ajoutBDD(req.body.name, req.body.price, req.body.description, req.body.category);
    console.log(products.getAll());
    res.redirect("/");
});


router.get("/:id",  async (req, res) => {
    resultProduct = await products.getById(req.params.id,dbManager.getDBname(),dbManager.getClient());
    res.render('product', {
        title: `Produit : ${ resultProduct[0].name}`,
        product:  resultProduct[0],
        categoryId: req.params.id});
});

router.get("/:id/update", async (req, res) => {
    resultProduct = await products.getById(req.params.id,dbManager.getDBname(),dbManager.getClient());
    res.render('productModify', {
        title: `Produit : ${resultProduct[0].name}`,
        item: resultProduct[0],
        categories: await categories.getAll(dbManager.getDBname(), dbManager.getClient())});
});

router.post("/:id/update",
    body('name').isLength({min: 3, max:75}).escape(),
    body('price').isNumeric(),
    body('description').isLength({min: 3, max:999}).escape(),
    async (req, res ) => {
        result = await products.updateBDD(req.params.id,req.body.name,req.body.price,req.body.description,req.body.category, dbManager.getDBname(), dbManager.getClient());
        console.log(result);
        res.redirect("/")
});

router.get("/:id/delete", (req, res ) => {
    products.supprBDD(req.params.id);
    res.redirect("/")
});

module.exports = router;