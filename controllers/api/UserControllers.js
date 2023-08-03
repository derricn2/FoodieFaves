const User = require('../../models/User')
const UserControllers = {

    signup: async (req, res) => {
        console.log(req.body)
        try {
            const userData = await User.create(req.body);

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.redirect("/")
            });
        } catch (err) {
            res.redirect("/signup")
        }
    },
    
    login: async (req, res) => {
        try {
            const userData = await User.findOne({ where: { email: req.body.email } });

            if (!userData) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
            }

            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect email or password, please try again' });
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.redirect("/")
            });

        } catch (err) {
            res.status(400).json(err);
        }
    },

    logout: async (req, res) => {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.redirect("/")
            });
        } else {
            res.redirect("/")
        }
    }
}
module.exports = UserControllers;
