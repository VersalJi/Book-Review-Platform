const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/auth', authRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
