const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {

        const newestUser = req.body;
        newestUser.password = await bcrypt.hash(req.body.password, 10);

        const dbaseUserData = await User.create(newestUser);

        req.session.save(() => {
            req.session.loggingIn = true;
            req.session.user_id = dbaseUserData.id;
            res.status(200).json(dbaseUserData);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const dbaseUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbaseUserData) {
            res
                .status(400)
                .json({ message: 'Sorry, that is the wrong password. Please try again.' });
            return;
        };

        const correctPW = await bcrypt.compare(
            req.body.password,
            dbaseUserData.password
        );

        if (!correctPW) {
            res
                .status(400)
                .json({ message: 'Sorry, that is the wrong password. Please try again.' });
            return;
        };

        req.session.save(() => {
            req.session.loggingIn = true;
            req.session.user_id = dbaseUserData.id;
            res
                .status(200)
                .json({ user: dbaseUserData, message: 'Login successful.' });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.post('/logout', (req, res) => {
    if (req.session.loggingIn) {

        req.session.destroy(() => {
            res.redirect('/');
            return;
        });
    } else {
        res.status(404).end();
    }

});

module.exports = router;