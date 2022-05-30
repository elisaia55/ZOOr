// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const photosRouter = require('./photos')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/photos', photosRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
