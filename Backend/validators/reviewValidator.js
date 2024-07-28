const { body, validationResult } = require('express-validator');

// Middleware for adding a book review
exports.addReviewValidator = [
  body('title')
    .notEmpty().withMessage('Book title is required'),

  body('author')
    .notEmpty().withMessage('Author is required'),

  body('reviewText')
    .notEmpty().withMessage('Review text is required'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .bail()
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware for updating a book review
exports.updateReviewValidator = [
  body('title')
    .optional()
    .notEmpty().withMessage('Book title cannot be empty'),

  body('author')
    .optional()
    .notEmpty().withMessage('Author cannot be empty'),

  body('reviewText')
    .optional()
    .notEmpty().withMessage('Review text cannot be empty'),

  body('rating')
    .optional()
    .bail()
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ validationErrors: errors.array() });
    }
    next();
  }
];
