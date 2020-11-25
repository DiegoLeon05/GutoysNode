const express = require('express')
const router = new express.Router()
const Producto = require('../../01_Entidades/producto/producto')

router.get('/producto', async (req, res) => {
    try {
        let producto = await Producto.find();
        if (req.query !== {}) {
            if (req.query.categoriaId !== undefined)
                producto = producto.filter(x => x.categoriaId == req.query.categoriaId);

            if (req.query.productoNombre !== undefined)
                producto = producto.filter(x => x.productoNombre.toLowerCase().indexOf(req.query.productoNombre.toLowerCase()) >= 0);
        }
        res.send(producto)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

router.get('/producto/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const objproducto = await Producto.findById(_id)
        if (!objproducto) {
            return res.status(404).send()
        }
        res.send(objproducto)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/producto', async (req, res) => {
    const objproducto = new Producto(req.body)
    try {
        await objproducto.save()
        res.status(201).send(objproducto)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/producto/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['productoNombre', 'productoDescripcion', 'productoValorVenta', 'productoCantidad', 'productoImagen']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'No es posible la actualización.' })
    }

    try {
        const objproducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!objproducto) {
            return res.status(404).send()
        }

        res.send(objproducto)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/producto/:id', async (req, res) => {
    try {
        const objproducto = await Producto.findByIdAndDelete(req.params.id)

        if (!objproducto) {
            return res.status(404).send()
        }

        res.send(objproducto)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router