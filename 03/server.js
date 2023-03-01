const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const uuid = require('uuid').v4;

// initialize application
const app = express();

// cors middleware
app.use(cors());

// parse request body
app.use(express.json());

// REST API
/**
 * /users POST - create user
 * /users GET - get users list
 * /users/<userID> GET - get user by id
 * /users/<userID> PATCH / PUT - update user by id
 * /users/<userID> DELETE - remove user by id
 */

/**
 * Create user.
 */
app.post('/api/v1/users', async (req, res) => {
  try {
    const { name, year } = req.body;

    const dataFromDB = await fs.readFile('./models.json');

    const users = JSON.parse(dataFromDB);
    const newUser = {
      id: uuid(),
      name,
      year,
    };

    users.push(newUser);

    await fs.writeFile('./models.json', JSON.stringify(users));

    res.status(200).json({
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
});

/**
 * Get users list.
 */
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile('./models.json'));

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
});

/**
 * Get user by id.
 */
app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const users = JSON.parse(await fs.readFile('./models.json'));

    const user = users.find((item) => item.id === id);

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
});

/**
 * Handle "not found" requests
 */
app.get('*', (req, res) => {
  res.status(404).json({
    msg: 'Not Found!',
  });
});

// Set application running PORT
const port = 3000;

// Launch server
app.listen(port, () => {
  console.log(`Application up and running on port ${port}`);
});
