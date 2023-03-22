const express = require('express');

// const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');
const authMiddlewares = require('../middlewares/authMiddleware');
// const { enums } = require('../constants');

const router = express.Router();

// Allow next routes only for logged in users
router.use(authMiddlewares.protect);

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodosList);

module.exports = router;
