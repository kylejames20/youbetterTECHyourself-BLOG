const router = require('express').Router();
const { Comment, User } = require('../../models');
const logIn = require('../../utils/auth');

router.post('/:id', logIn, async (req, res) => {
    try {
        const dbaseUser = await User.findbypk(req.session.user_id);
        const user = dbaseUser.get({ plain: true });
        const user_name = user.username;
        const commentDB = await Comment.create({
            content: reportError.body.content,
            post_id: req.params.id,
            user_id: req.session.user_id,
            post_username: user_name
        });

        res.status(200).json(commentDB);    
    
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;