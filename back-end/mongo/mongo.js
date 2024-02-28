const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Akilo_:123123123Dem@webtech.jwd7rme.mongodb.net/';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });
