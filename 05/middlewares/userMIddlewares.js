const fs = require('fs').promises;

const { AppError, catchAsync, validators } = require('../utils');

/**
 * Check new user data.
 */
exports.checkUserData = (req, res, next) => {
  // Check new user data.
  const { error, value } = validators.createUserValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
};

/**
 * Check user id.
 */
exports.checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // check if user ID is invalid => send 'bad request' error
  if (id.length < 10) {
    // return res.status(400).json({
    //   msg: 'Invalid user id..',
    // });

    // const error = new Error('Invalid user id..');

    // error.status = 400;

    return next(new AppError(400, 'Invalid user id.......'));
  }

  // fetch user from DB
  const users = JSON.parse(await fs.readFile('./models/models.json'));

  const user = users.find((item) => item.id === id);

  // if user exists => validation passed
  if (user) return next();

  // if no user with that id, sent 'not found' request
  return next(new AppError(404, 'User with this id does not exist..'));
});
