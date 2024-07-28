const express = require('express');
const { register, login, fetchDetails, updateUser } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/fetch_detail', authenticate, fetchDetails);
router.put('/update', authenticate, updateUser);
module.exports = router;
