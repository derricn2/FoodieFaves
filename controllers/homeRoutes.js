const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { loggedIn: req.session.logged_in });
});

router.get('/add', (req, res) => {
  res.render('form', { loggedIn: req.session.logged_in });
});

// login get route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// signup get route
router.get('/signup', async (req, res) => {
    res.render('signup');
})

module.exports = router;
