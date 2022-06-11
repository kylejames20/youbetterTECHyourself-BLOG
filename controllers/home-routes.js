const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const logIn = require('../utils/auth');

router.get('/', async (req, res) => {

    console.log(req.session.user_id);
    console.log("-----------------");

    try {
        const dbasePostData = await Post.findAll({ include: { model: User } }, { plain: true });
        const postNow = dbasePostData.map((post) =>
            post.get({ plain: true }));

        res.render('homepage', {
            postNow,
            loggingIn: req.session.loggingIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', logIn, async (req, res) => {
    try {
        const dbasePostData = await Post.findAll({ include: { model: User } } )


        const simplePost = dbasePostData.map((post) =>
            post.get({ plain: true }));

        console.log(simplePost);

        const postNow = simplePost.filter(post => post.user_id == req.session.user_id)

        res.render('dashboard', {
            postNow,
            loggingIn: req.session.loggingIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/create-post', logIn, async (req, res) => {
    try {
        res.render('create-post', {
            loggingIn: req.session.loggingIn
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit-post/:id', logIn, async (req, res) => {
    try {
        const onePostData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });

        const post = onePostData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggingIn: req.session.loggingIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/logout', (req, res) => {
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