const mongoose = require('mongoose')
const validate = require('../../00_Facade/Validations');
const validator = require('validator');

const categoria = mongoose.model('categoria', {
    categoriaId: {
        type: Number,
        required: true,
    },
    categoriaNombre: {
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
})

module.exports = categoria