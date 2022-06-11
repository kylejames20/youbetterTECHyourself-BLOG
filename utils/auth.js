const logIn = (req, res, next) => {
    if (!req.session.loggingIn) {
        res.redirect('/login');
    } else {
        next()
    }
};

module.exports = logIn;