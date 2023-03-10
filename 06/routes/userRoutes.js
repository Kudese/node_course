const express = require('express');

const userController = require('../controllers/userController');
const userMiddlewares = require('../middlewares/userMIddlewares');

const router = express.Router();

router.route('/')
  .post(userMiddlewares.checkUserData, userController.createUser)
  .get(userController.getUsers);

router.use('/:id', userMiddlewares.checkUserId);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userMiddlewares.checkUserData, userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
