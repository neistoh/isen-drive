const {ObjectId} = require("mongodb");
const Product = {

    listeProduct: [
        // Boucherie
        {_id: "1", name: "Poulet blanc", price : 6.4, description : "loremIpsum", categoryId: "1"},
        {_id: "2", name: "Steak haché boeuf x 2", price : 5.55, description : "loremIpsum", categoryId: "1"},
        {_id: "3", name: "Poitrine porc 600g", price : 5.60, description : "loremIpsum", categoryId: "1"},
        {_id: "4", name: "Côte agneau x 3", price : 5.25, description : "loremIpsum", categoryId: "1"},

        // Boulangerie
        {_id: "5", name: "Baguette", price : 0.9, description : "loremIpsum", categoryId: "2"},
        {_id: "6", name: "Pain multicéréales", price : 1.5, description : "loremIpsum", categoryId: "2"},
        {_id: "7", name: "Pain de mie", price : 1.04, description : "loremIpsum", categoryId: "2"},

        // produits laitiers
        {_id: "8", name: "Lait x 6", price : 5.15, description : "loremIpsum", categoryId: "3"},
        {_id: "9", name: "Yahourt x 12", price : 3.76, description : "loremIpsum", categoryId: "3"},
        {_id: "10", name: "Petit suisse x 12", price : 1.94, description : "loremIpsum", categoryId: "3"},
        {_id: "11", name: "Fromage blanc", price : 1.79, description : "loremIpsum", categoryId: "3"},
        {_id: "12", name: "Beurre", price : 2.39, description : "loremIpsum", categoryId: "3"},
        {_id: "13", name: "Crème fraîche", price : 0.07, description : "loremIpsum", categoryId: "3"},

        // fruits & légumes
        {_id: "14", name: "Mandarines 2kg", price : 3.39, description : "loremIpsum", categoryId: "4"},
        {_id: "15", name: "Pommes 1kg", price : 3.99, description : "loremIpsum", categoryId: "4"},
        {_id: "16", name: "Poires 4 pcs", price : 4.39, description : "loremIpsum", categoryId: "4"},
        {_id: "17", name: "Kiwi 6 pcs", price : 3.89, description : "loremIpsum", categoryId: "4"},
        {_id: "18", name: "Poireaux 500g", price : 2.89, description : "loremIpsum", categoryId: "4"},
        {_id: "19", name: "Chou rouge", price : 2.29, description : "loremIpsum", categoryId: "4"},
        {_id: "20", name: "Carottes 1.5kg", price : 2.99, description : "loremIpsum", categoryId: "4"},
        {_id: "21", name: "Pommes de terre 2.5kg", price : 5.49, description : "loremIpsum", categoryId: "4"},

        // bébé
        {_id: "22", name: "Lait 1er age", price : 18.85, description : "loremIpsum", categoryId: "5"},
        {_id: "23", name: "Petits pots x 2", price : 1.94, description : "loremIpsum", categoryId: "5"},
        {_id: "24", name: "Céréales en poudre", price : 2.95, description : "loremIpsum", categoryId: "5"},
        {_id: "25", name: "Couches x 70", price : 22.77, description : "loremIpsum", categoryId: "5"},

        // entretien
        {_id: "26", name: "Lessive", price : 11.40, description : "loremIpsum", categoryId: "6"},
        {_id: "27", name: "Eponges", price : 1.80, description : "loremIpsum", categoryId: "6"},
        {_id: "28", name: "Liquide vaisselle", price : 1.33, description : "loremIpsum", categoryId: "6"},
    ],

    getByCategory : function(categoryId, dbName, client) {
        const db = client.db(dbName);
        const categoryIdObjectId = new ObjectId(categoryId);
        const query = {categoryId: categoryIdObjectId };
        return db.collection("products").find(query).toArray();
    },

    getById : function(productId, dbName, client) {
        const db = client.db(dbName);
        const categoryIdObjectId = new ObjectId(productId);
        const query = {_id: categoryIdObjectId };
        return db.collection("products").find(query).toArray();
    },

    getAll : function() {
        return this.listeProduct;
   },

    updateBDD: function (productId ,name, price, description, categoryId, dbName, client){
        const db = client.db(dbName);
        const query = { _id: new ObjectId(productId) };
        const newvalues = { $set: {name: name, price: price, description: description, cotegoryId: categoryId } };
        return db.collection("products").updateOne(query, newvalues);
    },

    supprBDD: function (productId){
        this.listeProduct = this.listeProduct.filter(product => product._id !== productId);
    },

    ajoutBDD: function(name, price, description, categoryId){
        this.listeProduct.push({
            _id: `${this.listeProduct.length+1}`,
            name: name,
            price: price,
            description: description,
            categoryId: categoryId
        })
    }

}

module.exports = Product;
