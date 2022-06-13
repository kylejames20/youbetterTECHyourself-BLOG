const router = require('express').Router();
const session = require('express-session');
const { Post, User, Comment } = require('../../models');
const logIn = require('../../utils/auth');

router.get('/:id', logIn, async (req, res) => {
    try {
        const onePostData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });
        const post = onePostData.get({ plain: true });
        res.render('one-post', { post, loggingIn: req.session.loggingIn, },);

    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', logIn, async (req, res) => {
    try {
        const dbaseUser = await User.findByPk(req.session.user_id);
        const user = dbaseUser.get({ plain: true });
        const user_name = user.username;

        const postedData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
            user_username: user_name
        });

        res.status(200).json(postedData);

    }   catch (err) {
        console.error("Error" + err)
        res.status(400).json(err);
    }
});

router.put('/:id', logIn, async (req, res) => {
    try {
        const postedData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            },
            {
                where: {
                    id: req.params.id,
                },
            });

        if (!postedData) {
            res.status(404).json({ message: 'There is no post with said id!' });
            return;
        }
        res.status(200).json(postedData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', logIn, async (req, res) => {
    try {
        const postedData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postedData) {
            res.status(404).json({ message: 'There is no post with said id!' });
            return;
        }
        res.status(200).json(postedData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;