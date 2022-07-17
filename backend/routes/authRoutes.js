const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
const authController = require('../controllers/authController')

console.log('inside authRoutes.js')
router.post('/signup', authController.encryptPassword, userController.signup, authController.createSession, (req, res) => {
    console.log('im inside auth Router!!')
    return res.status(200).json(res.locals.user_id)
})

router.post('/login', authController.verifyUser, authController.createSession,  (req, res) => {
    return res.status(200).json(res.locals.user_id)
})

router.post('/verify', authController.verifySession, (req, res) => {
    return res.status(200).json(res.locals.user_id)
})

router.post('/signout', authController.verifySession, authController.endSession, (req, res) => {
    return res.status(200)
})

module.exports = router;