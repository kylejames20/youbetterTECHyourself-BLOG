const apiRoutes = require('./api/index');
const homeRoutes = require('./home-routes');
const router = require('express').Router();

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
