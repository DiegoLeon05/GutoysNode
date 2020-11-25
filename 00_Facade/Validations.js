const validator = require('validator');
const log = require('./log');
const className = 'Validator';

ValidateString = (attribute) =>{
    try {
        if (validator.isEmpty(attribute.text))
        {
            return "No se ha especifido el campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field + ".");
        }
        else if (attribute.text.length> attribute.maxLength)
        {
            return "El campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field) + " no debe contener más " + attribute.maxLength + " caracteres.";
        }
        else if (attribute.minLength > 0 && attribute.text.length < attribute.minLength)
        {
           return "El campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field) + " debe contener mínimo " + attribute.minLength + " caracteres.";
        }
        else
        {
          return '';
        }
    } catch (error) {
        log.Write({class:className, method: 'Validation.ValidateString', message:error});
    }
}

ValidateNumber = (attribute) =>{
    try {
        if (attribute.number == null)
        {
            return "El valor del campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field + " no debe ser nulo. ");
        }
        else if (attribute.number > attribute.max)
        {
            return "El valor del campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field + " no debe ser mayor a " + attribute.max + ". ");
        }
        else if (attribute.number < attribute.min)
        {
            return "El valor del campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field + " no debe ser menor a " + attribute.min + ". ");
        }
        else
        {
            return '';
        }
    } catch (error) {
        log.Write({class:className, method: 'Validation.ValidateNumber', message:error});
    }
}

ValidateDate = (attribute) =>{
    try {
        if (attribute.date == null)
        {
            return "La fecha del campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field + " no debe estar vacia. ");
        }
        else if (attribute.min != null && (attribute.date < attribute.min))
        {
            return "La fecha del campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field + " no debe ser menor a " + attribute.min + ". ");
        }
        else if (attribute.max != null && (attribute.date > attribute.max))
        {
            return "La fecha del campo " + (validator.isEmpty(attribute.field) ? "" : attribute.field + " no debe ser mayor a " + attribute.max + ". ");
        }
        else
        {
            return '';
        };
    } catch (error) {
        log.Write({class:className, method: 'Validation.ValidateDate', message:error});
    }
}

module.exports = {
    String : ValidateString,
    Number : ValidateNumber,
    Date : ValidateDate,
}