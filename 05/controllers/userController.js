const fs = require('fs').promises;
const uuid = require('uuid').v4;

const { catchAsync } = require('../utils');

/**
 * Create user.
 */
exports.createUser = catchAsync(async (req, res) => {
  const { name, year } = req.body;

  const dataFromDB = await fs.readFile('./models/models.json');

  const users = JSON.parse(dataFromDB);
  const newUser = {
    id: uuid(),
    name,
    year,
  };

  users.push(newUser);

  await fs.writeFile('./models/models.json', JSON.stringify(users));

  res.status(201).json({
    user: newUser,
  });
});

/**
 * Get users list.
 */
exports.getUsers = catchAsync(async (req, res) => {
  const users = JSON.parse(await fs.readFile('./models/models.json'));

  res.status(200).json({
    users,
  });
});

/**
 * Get user by id.
 */
exports.getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const users = JSON.parse(await fs.readFile('./models/models.json'));

  const user = users.find((item) => item.id === id);

  res.status(200).json({
    user,
  });
});

/**
 * Update user by id.
 */
exports.updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;

  const users = JSON.parse(await fs.readFile('./models/models.json'));

  const user = users.find((item) => item.id === id);

  if (name) user.name = name;
  if (year) user.year = year;

  const userIdx = users.findIndex((item) => item.id === id);

  users[userIdx] = user;

  await fs.writeFile('./models/models.json', JSON.stringify(users));

  res.status(200).json({
    user,
  });
});

/**
 * Delete user by id.
 */
exports.deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const users = JSON.parse(await fs.readFile('./models/models.json'));

  const updatedUsersList = users.filter((item) => item.id !== id);

  await fs.writeFile('./models/models.json', JSON.stringify(updatedUsersList));

  res.sendStatus(204);
});
