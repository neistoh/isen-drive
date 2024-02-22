const { ObjectId} = require('mongodb');

const Category = {

    nombreListe: 6,

    listeCategories: [
        {_id: "1", name: "Boucherie"},
        {_id: "2", name: "Boulangerie"},
        {_id: "3", name: "Produits laitiers"},
        {_id: "4", name: "Fruits & Légumes"},
        {_id: "5", name: "Bébé"},
        {_id: "6", name: "Entretien"},
    ],

    getById : function(categoryId, dbName, client){
        const db = client.db(dbName);
        const categoryIdObjectId = new ObjectId(categoryId);
        const query = {_id: categoryIdObjectId };
        return db.collection("categories").find(query).toArray();
    },

    getAll : function(dbName, client){
        const db = client.db(dbName);

        return db.collection("categories").aggregate([
            { $lookup:{from: 'products',
                        localField: '_id',
                        foreignField: 'categoryId',
                        as: 'productDetail'}},
            { $addFields: { size: { $size: "$productDetail" }}},
            { $project: { "productDetail": false }}
        ]).toArray(function(err, res) {
            if (err) throw err;
        });
    },

    updateBDD: function(id, name){
        this.listeCategories.filter(product => product._id === id).map((category) => {
            category.name = name;
        });
    },

    supprBDD: function(id){
        this.listeCategories = this.listeCategories.filter(product => product._id !== id);
    },

    ajoutBDD: function(name){
        this.listeCategories.push({
            _id: `${this.nombreListe+1}`,
            name: name,
        });
        this.nombreListe ++;
    }

}

module.exports = Category;
