const express = require('express');

const userController = require('../controllers/userController');
const userMiddlewares = require('../middlewares/userMIddlewares');
const authMiddlewares = require('../middlewares/authMiddleware');
const { enums } = require('../constants');

const router = express.Router();

// Allow next routes only for logged in users
router.use(authMiddlewares.protect);

router.get('/me', userController.getMe);
router.patch('/update-me', userMiddlewares.uploadUserPhoto, userController.updateMe);

// Allow next routes only for users with specified roles ('admin', 'moderator')
router.use(authMiddlewares.allowFor(enums.USER_ROLES_ENUM.ADMIN, enums.USER_ROLES_ENUM.MODERATOR));

router
  .route('/')
  .post(userMiddlewares.checkUserData, userController.createUser)
  .get(userController.getUsers);

router.use('/:id', userMiddlewares.checkUserId);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userMiddlewares.checkUserData, userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
