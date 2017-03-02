'use strict';

module.exports = function makeValidateMiddleware(schema) {
    return function validateMiddleware(req, res, next) {
        schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        }, (err, result) => {
            if (err) {
                return next(err);
            }
            req.data = result;
            next();
        });
    };
};