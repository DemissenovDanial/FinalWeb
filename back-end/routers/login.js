const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../mongo/user');
const mongo = require('../mongo/mongo');
const jwt = require('jsonwebtoken');
let token;

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
            res.status(400).send('Invalid username or password');
            return;
        }
        const isAdmin = user.isAdmin;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            if (isAdmin == true) {
                token = jwt.sign({ username, isAdmin }, 'zxc', { expiresIn: '1h' });
                res.redirect(`/admin?token=${token}`);
            } else {
                token = jwt.sign({ username, isAdmin }, 'zxc', { expiresIn: '1h' });
                res.redirect(`/main?token=${token}`);
            }
        } else {
            res.status(400).send('Invalid username or password');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;