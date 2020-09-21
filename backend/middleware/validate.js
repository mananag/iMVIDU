const validateA = (req, next, schema) => {
    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true
    }

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        next(`Validation error: ${error}`);
    } 
    else {
        req.body = value;
        next();
    }
}

module.exports = validateA