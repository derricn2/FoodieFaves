const User = require('../../models/User')
const UserControllers = {

    // function to handle user signup
    signup: async (req, res)=>{
        try {
            const { username, email, password } = req.body;
            // create new user in database
            const user = await User.create({ name: username, email, password });

            // save user ID to session to indicate user is logged in
            req.session.save(() => {
                req.session.userId = user.id;
                res.status(201).json({ message: 'Signup successful' });
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // function to handle user login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            // find user with given username in database
            const user = await User.findOne({ where: { name: username } });

            // if the user is not found or password is incorrect:
            if (!user || !user.checkPassword(password)) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // save user ID to session to indicate the user is logged in
          req.session.userId = user.id;
          res.status(200).json({ message: 'Login successful' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    // function to handle user logout
    logout: (req, res) => {
        try{
            // clear user ID from session to indicate the user is logged out
            req.session.destroy(() => {
                res.status(200).json({ message: 'Logout successful' });
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = UserControllers;