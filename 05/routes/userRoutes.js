const express = require('express');

const userController = require('../controllers/userController');
const userMiddlewares = require('../middlewares/userMIddlewares');

const router = express.Router();

// router.post('/', userController.createUser);
// router.get('/', userController.getUsers);

// router.get('/:id', userController.getUserById);
// router.patch('/:id', userController.updateUserById);
// router.delete('/:id', userController.deleteUserById);

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
