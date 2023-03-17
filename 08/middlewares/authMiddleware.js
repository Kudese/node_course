const jwt = require('jsonwebtoken');

const { AppError, catchAsync, validators } = require('../utils');
const User = require('../models/userModel');

/**
 * Check signup user data.
 */
exports.checkSignupData = catchAsync(async (req, res, next) => {
  const { error, value } = validators.signupUserValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  const { email } = value;

  const userExists = await User.exists({ email });

  if (userExists) return next(new AppError(409, 'User with this email already exists..'));

  req.body = value;

  next();
});

/**
 * Middleware to allow only login users.
 */
exports.protect = catchAsync(async (req, res, next) => {
  // Extract token from authorization header
  const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

  if (!token) return next(new AppError(401, 'You are not logged in..'));

  // Use async version of token verification
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

  // Find user by id decoded from token
  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser) return next(new AppError(401, 'You are not logged in..'));

  req.user = currentUser;

  next();
});

/**
 * Roles guard. Restrict access to specific role(s).
 * Use it only after 'protect' middleware!
 * @param  {...string} roles
 */
exports.allowFor = (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) return next();

    next(new AppError(403, 'You are not allowed to perform this action..'));
  };
