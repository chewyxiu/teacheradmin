const { body, validationResult } = require('express-validator');
const statusCodes = require("../enum/statuscodes");
const http = statusCodes.statusCode;

const registerStudentRules = () => {
    return [
        body('teacher').isString(),
        body('students').isArray()
    ]
};

const suspendStudentRules = () => {
    return [
        body('student').isString().isEmail(),
    ]
};

const retrieveForNotificationsRules = () => {
    return [
        body('teacher').isString().isEmail(),
        body('notification').isString(),
    ]
};


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(http.BAD_REQUEST).json({
        errors: extractedErrors,
    })
};

module.exports = {
    registerStudentRules,
    suspendStudentRules,
    retrieveForNotificationsRules,
    validate,
};
