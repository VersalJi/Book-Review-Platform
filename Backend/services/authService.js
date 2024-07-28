const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'vf3XSdytre476fgDh8';

exports.register = async ({ username, email, password }) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 409, message: 'User already registered' };
    }

    // Register the new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate a token for the newly registered user
    // const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    // user.token = token;

    return { status: 200, message: 'User registered successfully', user };
  } catch (error) {
    console.error('Error during user registration:', error);
    return { status: 500, message: 'Internal server error' };
  }
};

exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    user.token = token;

    return { status: 200, message: 'Login successful', user, token };
  } catch (error) {
    console.error('Error during user login:', error);
    return { status: 500, message: 'Internal server error' };
  }
};

exports.fetchUserDetails = async (userId) => {
  try {
    // Fetch the user details from the database using the userId
    const user = await User.findById(userId).select('-password'); // Exclude the password field
    if (!user) {
      return { status: 404, message: 'User not found' };
    }
    return { status: 200, user };
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { status: 500, message: 'Internal server error' };
  }
};

exports.updateUser = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    Object.assign(user, updateData); // Merge updateData into the user document
    await user.save(); // Save the updated user document

    return {
      status: 200,
      message: 'User updated successfully',
      user: user,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: 'Error updating user',
      error: error,
    };
  }
};