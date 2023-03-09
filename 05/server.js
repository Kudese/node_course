const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// use environment variables (.env file)
dotenv.config({ path: './.env' });

const userRouter = require('./routes/userRoutes');

// initialize application
const app = express();

// use morgan logger in 'development' mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

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

// app.post('/api/v1/users', userController.createUser);
// app.get('/api/v1/users', userController.getUsers);
// app.get('/api/v1/users/:id', userController.getUserById);
app.use('/api/v1/users', userRouter);

/**
 * Handle "not found" requests
 */
app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Not Found!',
  });
});

/**
 * Global error handler (middleware with 4 params)
 */
app.use((err, req, res, next) => {
  const { status } = err;

  // if no status code, send 500 (internal server error)
  res.status(status || 500).json({
    msg: err.message,
  });
});

// Set application running PORT =================================
const port = process.env.PORT || 4000;

// Launch server
app.listen(port, () => {
  console.log(`Application up and running on port ${port}`);
});
