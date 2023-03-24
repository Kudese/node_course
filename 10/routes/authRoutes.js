const express = require('express');

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', authMiddleware.checkSignupData, authController.signup);
router.post('/login', authController.login);

// PASSWORD RESTORE
// post req.body => user email => send one time password (OTP) by email // return void
router.post('/forgot-password', authController.forgotPassword);

// patch req.params (OTP) + req.body (new password) => update user in DB
router.patch('/reset-password/:otp', authController.resetPassword);

module.exports = router;
