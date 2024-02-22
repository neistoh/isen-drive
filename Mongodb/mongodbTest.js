const { MongoClient } = require('mongodb');

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);


main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

async function main(){
    await client.connect();
    console.log(`Connected successfully to MongoDB server: ${url}`);
    console.log(`Fetching data into database: ${dbName}`);

    return await getCategories(dbName);
}

function getCategories(dbName){
    const db = client.db(dbName);

    db.collection("categories").countDocuments({});

     return db.collection("categories").aggregate([
                { $lookup:
                    {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'categoryId',
                        as: 'productDetail'
                    }
                },
                {
                    $addFields: {
                        size: {
                            $size: "$productDetail"
                        }
                    }
                },
                {
                    $project: {
                        "productDetail": false
                    }
                }
            ]).toArray(function(err, res) {
                if (err) throw err;
            });
}

