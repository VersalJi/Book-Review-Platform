const { body, validationResult } = require('express-validator');

// Middleware for user registration
exports.registerValidator = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .bail()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .bail()
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .bail()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ validationErrors: errors.array() });
    }
    next();
  }
];

// Middleware for user login
exports.loginValidator = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .bail()
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .bail()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
