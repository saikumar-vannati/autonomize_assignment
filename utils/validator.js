const Joi = require('joi')

const logger = require('../logger')

// Schema to validate UUID4 string
const uuidSchema = Joi.string().guid({
    version: [
        'uuidv4'
    ]
});


// Schema to validate Employee Object
const emloyeeSchema = Joi.object({
    employeeName: Joi.string()
        .required(),

    salaryAmount: Joi.number(),

    age: Joi.number()
        .integer()
        .required(),

    email: Joi.string()
        .email(),

    degreeDetails: Joi.array()
        .items(Joi.string()),
})

exports.validUUID = function validateUUID(id) {

    const { error } = uuidSchema.validate(id);
    if (error) {
        logger.error(error);
        return false;
    }
    return true;
}

exports.validEmployee = function validEmployee(employee) {

    const { error } = emloyeeSchema.validate(employee);
    if (error) {
        logger.error(error);
        return false;
    }
    return true;
}