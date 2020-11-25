const mongoose = require('mongoose')
const validate = require('../../00_Facade/Validations');
const validator = require('validator');

const Producto = mongoose.model('producto', {
    productoId: {
        type: Number,
        required: true,
    },
    subCategoriaId: {
        type: Number,
        required: true,
    },
    productoNombre: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            let strError = validate.String({ text: value, field: 'Nombre', maxLength: 100, minLength: 5 });
            if (!validator.isEmpty(strError))
                throw new Error(strError)
        }
    },
    productoCodigo: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            let strError = validate.String({ text: value, field: 'Código', maxLength: 12, minLength: 12 });
            if (!validator.isEmpty(strError))
                throw new Error(strError)
        }
    },
    productoDescripcion: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            let strError = validate.String({ text: value, field: 'Descripción', maxLength: 500, minLength: 5 });
            if (!validator.isEmpty(strError))
                throw new Error(strError)
        }
    },
    productoCantidad: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            let strError = validate.Number({ number: value, field: 'Cantidad', max: 1000, min: 0 });
            if (!validator.isEmpty(strError))
                throw new Error(strError)
        }
    },
    productoValorVenta: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            let strError = validate.Number({ number: value, field: 'Valor Venta', max: 999999999.99, min: 0 });
            if (!validator.isEmpty(strError))
                throw new Error(strError)
        }
    },
    productoImagen: {
        type: String,
        required: true,
        trim: true,
    },
    productoMostrarWeb: {
        type: Boolean,
        required: true,
    },
})

module.exports = Producto