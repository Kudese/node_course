const fs = require('fs').promises;
const uuid = require('uuid').v4;

/**
 * Create user.
 */
exports.createUser = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

/**
 * Get users list.
 */
exports.getUsers = async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile('./models/models.json'));

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

/**
 * Get user by id.
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const users = JSON.parse(await fs.readFile('./models/models.json'));

    const user = users.find((item) => item.id === id);

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

/**
 * Update user by id.
 */
exports.updateUserById = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};

/**
 * Delete user by id.
 */
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const users = JSON.parse(await fs.readFile('./models/models.json'));

    const updatedUsersList = users.filter((item) => item.id !== id);

    await fs.writeFile('./models/models.json', JSON.stringify(updatedUsersList));

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
};
