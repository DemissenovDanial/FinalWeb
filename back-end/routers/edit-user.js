const express = require('express');
const router = express.Router();
const User = require('../mongo/user');
const mongo = require('../mongo/mongo');
const bcrypt = require('bcrypt');

router.get('/admin/delete-user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
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
        res.redirect('/admin');
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
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;