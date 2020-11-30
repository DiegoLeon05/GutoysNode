require('../../00_Facade/mongoose')
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const productoService = require('../views/page/producto/producto');
const port = process.env.PORT || 3000
// const port = process.env.PORT || 1987
const app = express();
//Define paths for express config
const directoryWeb = path.join(__dirname, '../');
const viewsPath = path.join(__dirname, '../views/page');
const partialsPath = path.join(__dirname, '../views/partials');


const productoRouter = require('../../02_Service/producto/producto')
const categoriaRouter = require('../../02_Service/producto/categoria')
const subcategoriaRouter = require('../../02_Service/producto/subcategoria')

app.use(productoRouter)
app.use(categoriaRouter)
app.use(subcategoriaRouter)

hbs.registerPartials(partialsPath);
//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
//Setup static directory to serve
app.use(express.static(directoryWeb));


app.use(express.json())

//Setup pages/views
app.get('', (req, res) => {
    productoService.Productos(req.query.search, (error, lstCategoria) => {
        res.render('producto/producto', {
            title: '',
            description: 'This is the principal page of my site',
            lstCategoria: lstCategoria,
            MuestraInicio: (req.query.search == undefined || req.query.search == '')
        });
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me!!',
        description: 'Diego, can you help me please?',
    });
});
app.get('/help', (req, res) => {
    res.send('Help me!!');
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help not found",
        message: 'Help Without response from the server'
    })
});
app.get('*', (req, res) => {
    res.render('404', {
        title: "Page not found",
        message: 'Without response from the server'
    })
});

hbs.registerHelper("FormatoNumero", function (value) {
    return '$ ' + parseFloat(value, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
});

app.listen(port, () => {
});