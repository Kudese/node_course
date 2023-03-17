const express = require('express');

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', authMiddleware.checkSignupData, authController.signup);
router.post('/login', authController.login);

module.exports = router;
