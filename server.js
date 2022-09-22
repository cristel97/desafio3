const express = require('express');
const app = express();

const Contenedor = require('./index');
const productos = new Contenedor ("productos.txt");

// Productos
const producto1 = {
    title: "La Roche Posay Effaclar Duo Cream",
    price: "70",
    thumbnail: "https://www.laroche-posay.es/effaclar/effaclar-duo-plus"
}

const producto2 = {
    title: "La Roche Posay Effaclar Gel exfoliante",
    price: "100",
    thumbnail: "https://www.laroche-posay.es/effaclar/effaclar-gel-purificante-micro-exfoliante"
}

const producto3 = {
    title: "La Roche Posay Effaclar Ultra concetrated Serum",
    price: "177",
    thumbnail: "https://www.laroche-posay.es/effaclar/effaclar-ultra-concentrated-serum"
}

//ENVIO DE PRODUCTOS AL TXT
const usarContenedor = async () => {
    await productos.save(producto1)
    await productos.save(producto2)
    await productos.save(producto3)
}

usarContenedor()


const getProduct = async ()=>{
    let listProduct = JSON.stringify(await productos.getAll());
    return listProduct;
}
const getProductRandom = async () =>{
    let length = await productos.getLength()
    let random = Math.floor(Math.random() * length)
    let productRandom = await productos.getAll();
    console.log(length, random, productRandom)
    return JSON.stringify(productRandom[random]);
}


app.get('/', (req, res) => {
    res.send(`Root`);
})

app.get('/productos',async (req, res) => {
    res.send(`Lista de productos: ${await getProduct()}`);
})

app.get('/productoRandom',async (req, res) => {
    res.send(`El producto es: ${await getProductRandom()}`);
})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error! ${error}`));