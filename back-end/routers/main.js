const express = require('express');
const router = express.Router();
const Jokes = require('../mongo/jokes');
router.use(express.static('uploads'));

const verifyToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    next();
};

router.get('/main', verifyToken, async (req, res) => {
    try {
        const jokes = await Jokes.find();
        res.render('main', { jokes: jokes }); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;