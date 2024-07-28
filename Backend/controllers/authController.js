const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const data = req.body;
    const user = await authService.register(req.body);
    res.status(user.status).json({message: user.message, user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    res.status(user.status).json({ message: user.message, user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.fetchDetails = async (req, res) => {
  try {
    const userId = req.user.id; // The userId is available from the middleware
    const result = await authService.fetchUserDetails(userId);

    if (result.status === 200) {
      res.status(200).json({ user: result.user });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id; 
  const updateData = req.body;

  const result = await authService.updateUser(userId, updateData);

  if (result.status === 200) {
    return res.status(200).json({
      message: result.message,
      user: result.user,
    });
  } else if (result.status === 404) {
    return res.status(404).json({
      message: result.message,
    });
  } else {
    return res.status(500).json({
      message: result.message,
      error: result.error,
    });
  }
};