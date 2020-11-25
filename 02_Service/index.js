const express = require('express')
require('../00_Facade/mongoose')
const productoRouter = require('../02_Service/producto/producto')
const categoriaRouter = require('../02_Service/producto/categoria')
const subcategoriaRouter = require('../02_Service/producto/subcategoria')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(productoRouter)
app.use(categoriaRouter)
app.use(subcategoriaRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})