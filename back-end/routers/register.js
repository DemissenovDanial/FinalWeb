const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../mongo/user');
const mongo = require('../mongo/mongo');
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username }).exec();
        if (existingUser) {
            res.status(400).send('Username already exists');
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.send('Registration successful');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
