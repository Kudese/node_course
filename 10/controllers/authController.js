const crypto = require('crypto');

const User = require('../models/userModel');
const { catchAsync, AppError, signToken, userNameHandler } = require('../utils');
const { enums } = require('../constants');

// Signup controller
exports.signup = catchAsync(async (req, res) => {
  const { name, birthyear, email, password } = req.body;

  const newUserData = {
    name: userNameHandler(name),
    birthyear,
    email,
    password,
    role: enums.USER_ROLES_ENUM.USER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});

// Login controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError(401, 'Not authorized..'));

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) return next(new AppError(401, 'Not authorized..'));

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    user,
    token,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // req.body = email
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new AppError(404, 'There is no user with this email..'));

  const otp = user.createPasswordResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const reserUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${otp}`;

  /*
    Send reset url to the user email
  */
  console.log('||=============>>>>>>>>>>>');
  console.log(reserUrl);
  console.log('<<<<<<<<<<<=============||');

  res.sendStatus(200);
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.otp).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError(400, 'Token is invalid..'));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    user,
  });
});
