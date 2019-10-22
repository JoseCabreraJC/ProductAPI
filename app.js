const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    {id: 1,
        nombreProducto: 'Yogurt',
        categoria: 1},
    {id: 2,
        nombreProducto: 'Galletitas',
        categoria: 2},
    {id: 3,
        nombreProducto: 'Leche',
        categoria: 1}
    ]
const port = 3000;

const categorias = [
    {id: 1, nombreCategoria: "Lacteos"},
    {id: 2, nombreCategoria: "Harinas"},
]
//Inicio de la App
app.get('/',(req,res) => {
    res.send('Inicio de esta cosa');
})

app.get('/api/productos/',(req,res) => {
    productosConCategorias = productos.map((producto) => {
    const categoria = categorias.find(categoria => categoria.id==producto.categoria);
    let resultado = {
        id:producto.id,
        nombreProducto:producto.nombreProducto,
        categoria:categoria.nombreCategoria
    };
    return resultado;
    })
    res.send(productosConCategorias);
});

app.get('/api/categorias/',(req,res) => {
    res.send(categorias);
});

app.get('/api/productos/:id',(req,res) => {
    const producto = productos.find(producto => producto.id == parseInt(req.params.id));
    if (!producto) return res.status(404).send('No es encuentra ese producto');
    const categoria = categorias.find(categoria => categoria.id==producto.categoria);   
    let resultado = {
        id:producto.id,
        nombreProducto:producto.nombreProducto,
        categoria:categoria.nombreCategoria
    };
    res.send(resultado);
});

app.post('/api/productos/',(req,res)=>{
    let nombreProducto =req.body.nombre;
    let nombreCategoria = req.body.categoria;
    const categoria = categorias.find(categoria => categoria.nombreCategoria == nombreCategoria);
    if (!categoria) return res.status(404).send('Ingreso una categoria que no existe');
    const producto = {id : productos.length+1, nombreProducto:nombreProducto, categoria:categoria.id};
    console.log(producto);
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
