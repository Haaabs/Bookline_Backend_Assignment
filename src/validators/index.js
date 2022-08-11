const { check, validationResult } = require('express-validator')

exports.validateSignUpRequest = [
    check('userID').notEmpty().withMessage('UserID is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 8, max: 15}). withMessage('Password length must be at least 8 ans at max 15'),
]

exports.validateLoginRequest = [
    check('userID').notEmpty().withMessage('userID is required'),
    check('password').notEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 8, max: 15}). withMessage('Password length must be at least 8 ans at max 15')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(404).json({ errors: errors.array()[0].msg });
    }
    next();
}