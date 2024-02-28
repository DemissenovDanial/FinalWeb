const express = require('express');
const router = express.Router();
const User = require('../mongo/user');
const mongo = require('../mongo/mongo');
const bcrypt = require('bcrypt');

router.get('/admin/delete-user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        const redirectUrl = 'https://demissenov-danial-se-2206.onrender.com/admin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlhbCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTA4NDEyOCwiZXhwIjoxNzA5MDg3NzI4fQ.YnpcBbBVnWcaTXCxYc1ZXN20jDX2Qb05CiBzDUhObGA';
        res.redirect(redirectUrl);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/admin/add-user', async (req, res) => {
    try {
        const { username, password } = req.body;
        const isAdmin = req.body.isAdmin === 'on';
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            isAdmin
        });
        await newUser.save();
        const redirectUrl = 'https://demissenov-danial-se-2206.onrender.com/admin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlhbCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTA4NDEyOCwiZXhwIjoxNzA5MDg3NzI4fQ.YnpcBbBVnWcaTXCxYc1ZXN20jDX2Qb05CiBzDUhObGA';
        res.redirect(redirectUrl);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/admin/edit-user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('edit-user', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/admin/edit-user/:id', async (req, res) => {
    try {
        const { username, password, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = {
            username,
            password: hashedPassword,
            isAdmin
        };
        await User.findByIdAndUpdate(req.params.id, updatedUser);
        const redirectUrl = 'https://demissenov-danial-se-2206.onrender.com/admin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlhbCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTA4NDEyOCwiZXhwIjoxNzA5MDg3NzI4fQ.YnpcBbBVnWcaTXCxYc1ZXN20jDX2Qb05CiBzDUhObGA';
        res.redirect(redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
