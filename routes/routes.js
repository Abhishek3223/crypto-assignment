const express = require('express');
const router = express.Router();
const Crypto = require('../models/crypto'); 

const calculateStandardDeviation = (prices) => {
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    return Math.sqrt(variance);
};

router.get('/stats', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Please provide a cryptocurrency (bitcoin, ethereum, matic-network)' });
    }

    try {
        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

        if (!latestData) {
            return res.status(404).json({ message: 'Cryptocurrency data not found' });
        }

        res.status(200).json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            '24hChange': latestData.change24h
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/deviation', async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Please provide a cryptocurrency (bitcoin, ethereum, matic-network)' });
    }

    try {
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
        const prices = records.map(record => record.price);

        if (prices.length === 0) {
            return res.status(404).json({ message: 'Not enough data to calculate standard deviation' });
        }

        const deviation = calculateStandardDeviation(prices);
        res.status(200).json({ deviation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
