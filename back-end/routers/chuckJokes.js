const express = require('express');
const router = express.Router();
const axios = require('axios');
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

router.get('/chuckJokes', verifyToken, async (req, res) => {
    try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        if (response.status === 200) {
            res.render('chuckJokes', { joke: response.data })
        } else {
            res.status(response.status).send('Failed to fetch joke from API');
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
