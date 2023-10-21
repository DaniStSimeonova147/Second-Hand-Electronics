const router = require('express').Router();
const electronicManager = require('../managers/electronicManager');

const { getErrorMessage } = require('../utils/errorHelpers');

const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    const electronics = await electronicManager.getAll().lean();

    res.render('electronics/catalog', { electronics });
});

router.get('/create', isAuth, async (req, res) => {

    res.render('electronics/create');
});

router.post('/create', isAuth, async (req, res) => {
    const electronicData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await electronicManager.create(electronicData);

        res.redirect('/electronics/catalog');
    } catch (error) {
        res.render('electronics/create', { error: getErrorMessage(error) });
    }
});

router.get('/:electronicId/details', async (req, res) => {
    const electronicId = req.params.electronicId
    const electronic = await electronicManager.getOne(electronicId).lean();
    //if do not have user: user?
    const isOwner = req.user?._id == electronic.owner._id;
    const isBuyer = electronic.buyers?.some(id => id == req.user?._id);

    res.render('electronics/details', { electronic, isOwner, isBuyer });
});

router.get('/:electronicId/buy', isAuth, async (req, res) => {
    try {
        await electronicManager.buy(req.user._id, req.params.electronicId);

        res.redirect(`/electronics/${req.params.electronicId}/details`);
    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
});

router.get('/:electronicId/delete', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;
    try {
        await electronicManager.delete(electronicId);

        res.redirect('/electronics/catalog');
    } catch (err) {
        res.render(`/electronics/${electronicId}/details`, { error: 'Unsuccessful electronic delete!' });
    }
});

router.get('/:electronicId/edit', isAuth, async (req, res) => {
    const electronic = await electronicManager.getOne(req.params.electronicId).lean();
    res.render('electronics/edit', { electronic });
});

router.post('/:electronicId/edit', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;
    const electronicData = req.body;

    try {
        await electronicManager.edit(electronicId, electronicData);

        res.redirect(`/electronics/${electronicId}/details`);
    } catch (error) {
        res.render('electronics/edit', { error: getErrorMessage(error) });
    }
});

router.get('/search', async (req, res) => {
    const { name, type } = req.query;
    const electronics = await electronicManager.search(name, type);

    res.render('electronics/search', { electronics, name, type });
});

module.exports = router;