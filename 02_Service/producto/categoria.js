const { urlencoded } = require('express')
const express = require('express')
const router = new express.Router()
const Categoria = require('../../01_Entidades/producto/categoria')

router.post('/categoria', async (req, res) => {
    const objcategoria = new Categoria(req.body)
    try {
        await objcategoria.save()
        res.status(201).send(objcategoria)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/categoria', async (req, res) => {
    try {
        const categoria = await Categoria.find({})
        res.send(categoria)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/categoria/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const objcategoria = await Categoria.findById(_id)
        if (!objcategoria) {
            return res.status(404).send()
        }
        res.send(objcategoria)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/categoria/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['categoriaNombre']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'No es posible la actualización.' })
    }

    try {
        const objcategoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!objcategoria) {
            return res.status(404).send()
        }

        res.send(objcategoria)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/categoria/:id', async (req, res) => {
    try {
        const objcategoria = await Categoria.findByIdAndDelete(req.params.id)

        if (!objcategoria) {
            return res.status(404).send()
        }

        res.send(objcategoria)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router