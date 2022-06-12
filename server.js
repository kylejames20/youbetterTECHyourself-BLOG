const exphbs = require('express-handlebars');
const express = require('express');
const helpers = require('./utils/helpers');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3002;
const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {

        maxAge: 600000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        cookie: { secure: !true }
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}/`));
});

module.exports = app;