import express from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendResetOTP, sendVerifyOtp, verifyEmail, verifyResetOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
authRouter.post('/verify-account', userAuth, verifyEmail)
authRouter.post('/verify-reset-otp', userAuth, verifyResetOtp)
authRouter.get('/is-auth', userAuth, isAuthenticated)
authRouter.post('/send-reset-otp', sendResetOTP)
authRouter.post('/reset-password', resetPassword)


export default authRouter