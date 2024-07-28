const reviewService = require('../services/reviewService');

exports.addReview = async (req, res) => {
  try {
    const result = await reviewService.addReview(req.user.id, req.body);
    res.status(result.status === 'success' ? 201 : 400).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await reviewService.getReviews(Number(page), Number(limit), search);
    res.status(result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const result = await reviewService.getUserReviews(req.user.id, Number(page), Number(limit), search);
    res.status(result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const result = await reviewService.updateReview(req.user.id, req.params.id, req.body);
    res.status(result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const result = await reviewService.deleteReview(req.user.id, req.params.id);
    res.status(result.status === 'success' ? 204 : 400).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};
