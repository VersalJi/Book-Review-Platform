const express = require('express');
const { addReview, getReviews, updateReview, deleteReview, getUserReviews } = require('../controllers/reviewController');
const { addReviewValidator, updateReviewValidator } = require('../validators/reviewValidator');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addReview);
router.get('/', getReviews);
router.get('/my', authenticate, getUserReviews);
router.put('/update/:id', authenticate, updateReviewValidator, updateReview);
router.delete('/delete/:id', authenticate, deleteReview);

module.exports = router;
