const {
  Types: { ObjectId },
} = require('mongoose');

const User = require('../models/userModel');
const { AppError, catchAsync, validators } = require('../utils');
const ImageService = require('../services/imageService');

/**
 * Check new user data.
 */
exports.checkUserData = catchAsync(async (req, res, next) => {
  // Check new user data.
  const { error, value } = validators.createUserValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  const { email } = value;

  // Send error if user with email already exists.
  // const userExists = await User.findOne({ email }).select('_id');
  const userExists = await User.exists({ email });

  if (userExists) return next(new AppError(409, 'User with this email already exists..'));

  req.body = value;

  next();
});

/**
 * Check user id.
 */
exports.checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // check if id is valid
  if (!ObjectId.isValid(id)) {
    return next(new AppError(400, 'Invalid user id..'));
  }

  // check if user with this id exists in DB
  const userExists = await User.exists({ _id: id });

  if (!userExists) return next(new AppError(404, 'User not found..'));

  next();
});

// const multerStorage = multer.diskStorage({
//   destination: (req, file, callBackFunc) => {
//     callBackFunc(null, 'static/img/users');
//   },
//   filename: (req, file, callBackFunc) => {
//     const ext = file.mimetype.split('/')[1];
//     callBackFunc(null, `${req.user.id}-${uuid()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, callBackFunc) => {
//   if (file.mimetype.startsWith('image')) {
//     callBackFunc(null, true);
//   } else {
//     callBackFunc(new AppError(400, 'Please upload images only..'), false);
//   }
// };

// exports.uploadUserPhoto = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// }).single('photo');

exports.uploadUserPhoto = ImageService.upload('avatar');

exports.checkPassword = catchAsync(async (req, res, next) => {
  /* req.body = {
    currentPassword
    newPassword
  }
  */

  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('password');

  if (!(await user.checkPassword(currentPassword, user.password))) {
    return next(new AppError(401, 'Current password is wrong..'));
  }

  user.password = newPassword;

  await user.save();

  next();
});
