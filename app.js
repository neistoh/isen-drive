const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config()
const port = process.env.PORT;
const path = require("path");
const process = require('node:process');

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

const indexRoute = require("./routes/index.js");
const indexCategory = require("./routes/categories.js");
const indexProduct = require("./routes/products.js");

const dbManagment = require("./model/dbManager.js")

app.use('/', indexRoute);
app.use('/categories', indexCategory);
app.use('/products', indexProduct);

async function startClient(){
    await dbManagment.getClient().connect();
    return "Connected";
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    startClient().then(console.log);
});

process.on("SIGTERM", async ()=>{
    await dbManagment.getClient().close().then(console.log);
});

