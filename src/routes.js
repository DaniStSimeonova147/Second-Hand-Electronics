const router = require('express').Router();
//add controller routes
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const electronicController = require('./controllers/electronicController');

router.use(homeController);
router.use('/users', userController);
router.use('/electronics', electronicController);

router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router;