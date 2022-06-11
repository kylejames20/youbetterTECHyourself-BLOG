const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userSeed = require('./userSeed.json');
const postSeed = require('./postSeed.json');
const commentSeed = require('./commentSeed.json')
const seedExamples = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeed);

    await Post.bulkCreate(postSeed);

    await Comment.bulkCreate(commentSeed);

    process.exit(0);
};

seedExamples();