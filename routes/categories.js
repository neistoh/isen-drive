const express = require('express');
const router = express.Router();
const categories = require('../model/Category.js');
const products = require('../model/Product.js');
const {body, validationResult} = require('express-validator');
const dbManager = require('../model/dbManager')

router.get("/", async (req, res) => {
    res.render('categories', {title: "Rayons", categories: await categories.getAll(dbManager.getDBname(), dbManager.getClient())});
});

router.get("/new", (req, res) => {
    res.render('categoryForm', { title: "Création rayon"});
});

router.post("/new",
    body('name').isLength({min: 3, max:75}).escape(),
    (req, res) => {
    const errors = validationResult(req);
    categories.ajoutBDD(req.body.name);
    res.redirect("/");
});

router.get("/:id", async (req, res) => {
    resultCategory = await categories.getById(req.params.id, dbManager.getDBname(), dbManager.getClient());
    resultProduct = await products.getByCategory(req.params.id, dbManager.getDBname(), dbManager.getClient());
    console.log(resultProduct);
    res.render('category', {
        title: `Produits de ${resultCategory[0].name}`,
        products: resultProduct,
        categoryId: req.params.id});
});

router.get("/:id/update", (req, res) => {
    res.render('categoryModify', {
        title: `Produits de ${categories.getById(req.params.id).name}`,
        item: categories.getById(req.params.id)});
});

router.post("/:id/update",
    body('name').isLength({min: 3, max:75}).escape(),
    (req, res) => {
    categories.updateBDD(req.params.id,req.body.name);
    res.redirect("/");
});

router.get("/:id/delete", (req, res) => {
    categories.supprBDD(req.params.id);
    res.redirect("/");
});

module.exports = router;