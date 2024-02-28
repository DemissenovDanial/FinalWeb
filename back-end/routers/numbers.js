const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, 'zxc');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send('Invalid token.');
    }
};

router.get('/numbers', verifyToken, async (req, res) => {
    try {
        res.render( 'numbers', { fact: "" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;