const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    name: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    description: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;
