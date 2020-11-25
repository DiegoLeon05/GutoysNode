const express = require('express')
const router = new express.Router()
const SubCategoria = require('../../01_Entidades/producto/subcategoria')

router.post('/subCategoria', async (req, res) => {
    const objsubCategoria = new SubCategoria(req.body)
    try {
        await objsubCategoria.save()
        res.status(201).send(objsubCategoria)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/subCategoria', async (req, res) => {
    try {
        let subCategoria = await SubCategoria.find(req.query)
        if (req.query !== {}) {
            if (req.query.categoriaId !== undefined)
                subCategoria = subCategoria.filter(x => x.categoriaId == req.query.categoriaId);
        }
        res.send(subCategoria)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/subCategoria/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const objsubCategoria = await SubCategoria.findById(_id)
        if (!objsubCategoria) {
            return res.status(404).send()
        }
        res.send(objsubCategoria)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/subCategoria/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['subCategoriaNombre']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'No es posible la actualización.' })
    }

    try {
        const objsubCategoria = await SubCategoria.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!objsubCategoria) {
            return res.status(404).send()
        }

        res.send(objsubCategoria)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/subCategoria/:id', async (req, res) => {
    try {
        const objsubCategoria = await SubCategoria.findByIdAndDelete(req.params.id)

        if (!objsubCategoria) {
            return res.status(404).send()
        }

        res.send(objsubCategoria)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router