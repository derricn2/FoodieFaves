const express = require('express');
const router = express.Router();
const UserController = require('./UserControllers');

// POST route for user sign-up
router.post('/signup', UserController.signup);

// POST route for user login
router.post('/login', UserController.login);

// POST route for user logout
router.get('/logout', UserController.logout);
router.get("/",(req,res)=>res.send("signup"))
module.exports = router;