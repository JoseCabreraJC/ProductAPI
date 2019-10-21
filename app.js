const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    {id: 1,
        nombre: 'Yogurt'},
    {id: 2,
        nombre: 'Yerba'},
    {id: 3,
        nombre: 'Cafe'}
    ]
const port = 3000;

app.get('/',(req,res) => {
    res.send('Inicio de esta cosa');
})

app.get('/api/productos/',(req,res) => {
    res.send(productos);
});

app.get('/api/productos/:id',(req,res) => {
    const resultado = productos.find(producto => producto.id == parseInt(req.params.id));
    if (!resultado) return res.status(404).send('No es encuentra ese producto')
    res.send(resultado);
});

app.post('/api/productos/',(req,res)=>{
    let nombreProducto =req.body.nombre; 
    const producto = {id : productos.length+1, nombre:nombreProducto};
    productos.push(producto);
    res.send(producto);
})

app.put('/api/productos/:id',(req,res)=>{
    const producto = productos.find(producto => producto.id == parseInt(req.params.id));
    producto.nombre= req.body.nombre;
    res.send(producto);    
})

app.delete('/api/productos/:id',(req,res)=>{
    const producto = productos.find(producto => producto.id == parseInt(req.params.id));
    productos.splice(producto,1);
    res.send(producto);
})

app.listen(port,() => {
    console.log(`El servidor esta corriendo en http://localhost:${port}/`)
});
