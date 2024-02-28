const express = require('express');
const router = express.Router();
const Jokes = require('../mongo/jokes');
const mongo = require('../mongo/mongo');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);

router.post('/admin/add-joke', (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err) {
                console.error('Error uploading image:', err);
                res.status(400).send(err);
                return;
            }
            const { 'name.ru': nameRu, 'name.en': nameEn, 'description.ru': descriptionRu, 'description.en': descriptionEn } = req.body;
            const imagePaths = [
                req.files['image1'][0].path,
                req.files['image2'][0].path,
                req.files['image3'][0].path
            ];
            const newJoke = new Jokes({
                name: {
                    en: nameEn,
                    ru: nameRu
                },
                description: {
                    en: descriptionEn,
                    ru: descriptionRu
                },
                images: imagePaths
            });
            await newJoke.save();       
            console.log('New joke saved successfully:', newJoke);     
            const redirectUrl = 'https://demissenov-danial-se-2206.onrender.com/admin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlhbCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTA4NDEyOCwiZXhwIjoxNzA5MDg3NzI4fQ.YnpcBbBVnWcaTXCxYc1ZXN20jDX2Qb05CiBzDUhObGA';
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

router.get('/admin/edit-joke/:id', async (req, res) => {
    try {
        const joke = await Jokes.findById(req.params.id);
        res.render('edit-mainContent', { joke });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/admin/edit-joke/:id', async (req, res) => {
    try {
        const { 'name.ru': nameRu, 'name.en': nameEn, 'description.ru': descriptionRu, 'description.en': descriptionEn } = req.body;
        const updatedJoke = {
            name: {
                en: nameEn,
                ru: nameRu
            },
            description: {
                en: descriptionEn,
                ru: descriptionRu
            }
        };
        await Jokes.findByIdAndUpdate(req.params.id, updatedJoke);
        const redirectUrl = 'https://demissenov-danial-se-2206.onrender.com/admin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlhbCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTA4NDEyOCwiZXhwIjoxNzA5MDg3NzI4fQ.YnpcBbBVnWcaTXCxYc1ZXN20jDX2Qb05CiBzDUhObGA';
        res.redirect(redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/admin/delete-joke/:id', async (req, res) => {
    try {
        await Jokes.findByIdAndDelete(req.params.id);
        const redirectUrl = 'https://demissenov-danial-se-2206.onrender.com/admin?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmlhbCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTA4NDEyOCwiZXhwIjoxNzA5MDg3NzI4fQ.YnpcBbBVnWcaTXCxYc1ZXN20jDX2Qb05CiBzDUhObGA';
        res.redirect(redirectUrl);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/jokes', async (req, res) => {
    try {
        const jokes = await Jokes.find();
        res.json(jokes);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
