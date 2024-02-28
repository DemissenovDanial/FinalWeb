const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:numberFunc/:number/:type?/:page?', async (req, res) => {
    try {
        const { numberFunc, number, type, page } = req.params;
        let apiUrl = `http://numbersapi.com/${number}`;
        if (type) {
            apiUrl += `/${type}`;
        }
        if (page) {
            apiUrl += `/${page}`;
        }
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            res.json({ fact: response.data });
        } else {
            res.status(response.status).send('Failed to fetch fact from API');
        }
    } catch (error) {
        console.error('Error fetching number fact:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;