const express = require('express');
const router = express.Router();
const User = require('../mongo/user');
const Jokes = require('../mongo/jokes');
const mongo = require('../mongo/mongo');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, 'zxc');
        if (!decoded.isAdmin) {
            return res.status(403).send('Access denied. Not an admin.');
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send('Invalid token.');
    }
};

router.get('/admin', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        const jokes = await Jokes.find(); 
        res.render('admin', { users, jokes }); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;