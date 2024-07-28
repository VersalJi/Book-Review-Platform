const Review = require('../models/Review');

exports.addReview = async (userId, { bookTitle, author, reviewText, rating }) => {
  try {
    const review = new Review({ user: userId, bookTitle, author, reviewText, rating });
    await review.save();
    return { status: 'success', message: 'Review added successfully', data: review };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

exports.getReviews = async (page = 1, limit = 10, search = '') => {
  try {
    const query = search ? { bookTitle: { $regex: search, $options: 'i' } } : {};
    const total = await Review.countDocuments(query);
    const reviews = await Review.find(query)
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return {
      status: 'success',
      message: 'Reviews retrieved successfully',
      data: { reviews, total, totalPages: Math.ceil(total / limit) }
    };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

exports.getUserReviews = async (userId, page = 1, limit = 10, search = '') => {
  try {
    const query = { user: userId };

    // If there's a search term, add it to the query
    if (search) {
      query.bookTitle = new RegExp(search, 'i'); // Case-insensitive search for bookTitle
    }

    const total = await Review.countDocuments(query);
    const reviews = await Review.find(query)
      .populate('user', 'username')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      status: 'success',
      message: 'User reviews retrieved successfully',
      data: { reviews, total, totalPages: Math.ceil(total / limit) }
    };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};


exports.updateReview = async (userId, reviewId, updateData) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: userId },
      updateData,
      { new: true }
    );
    if (!review) {
      throw new Error('Review not found or user not authorized');
    }
    return { status: 'success', message: 'Review updated successfully', data: review };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

exports.deleteReview = async (userId, reviewId) => {
  try {
    const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
    if (!review) {
      throw new Error('Review not found or user not authorized');
    }
    return { status: 'success', message: 'Review deleted successfully' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};
