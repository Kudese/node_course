const { catchAsync } = require('../utils');
const User = require('../models/userModel');

/**
 * Create user.
 */
exports.createUser = catchAsync(async (req, res) => {
  const { name, email, birthyear, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    birthyear,
    password,
    role,
  });

  // Always REMOVE passwords from response!!!!!!!!!!!!1
  newUser.password = undefined;

  res.status(201).json({
    user: newUser,
  });
});

/**
 * Get users list.
 */
exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find().sort({ createdAt: 1 }).lean();

  res.status(200).json({
    users,
  });
});

/**
 * Get user by id.
 */
exports.getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('+password');

  // example how to save changes in model
  // user.name = 'INVALID USER';
  // await user.save();

  // Always REMOVE passwords from response!!!!!!!!!!!!1
  user.password = undefined;

  res.status(200).json({
    user,
  });
});

/**
 * Update user by id.
 */
exports.updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, birthyear } = req.body;

  // const updatedUser = await User.findByIdAndUpdate(id, { name, birthyear }).select('name birthyear');
  const updatedUser = await User.findByIdAndUpdate(id, { name, birthyear }, { new: true });

  res.status(200).json({
    user: updatedUser,
  });
});

/**
 * Delete user by id.
 */
exports.deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  // You should use Delete method instead of Remove
  // https://stackoverflow.com/questions/54081114/what-is-the-difference-between-findbyidandremove-and-findbyidanddelete-in-mongoo
  await User.findByIdAndDelete(id);

  res.sendStatus(204);
});
