// import required modules
const path = require('path');
const express = require('express');
const session = require('express-session'); // express session for managing user sessions
const exphbs = require('express-handlebars'); // express handlebars for templating
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//import sequelize connection and create session store using the SequelizeStore
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// create an instance of the Handlebars templating engine, passing custom helpers
const hbs = exphbs.create({ helpers });

// configure session middleware
const sess = {
    secret: 'process.env.SESSION_SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// use session middleware with above configured options
app.use(session(sess));

// set the view engine to use Handlebars for rendering templates
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware for parsing request bodies and serve static files from the 'public' directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use routes defined in controllers
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
