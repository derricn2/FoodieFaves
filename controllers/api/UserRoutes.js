const express = require('express');
const router = express.Router();
const UserController = require('../controllers/api/UserController');

// POST route for user sign-up
router.post('/signup', UserController.signup);

// POST route for user login
router.post('/login', UserController.login);

// POST route for user logout
router.post('/logout', UserController.logout);

module.exports = router;