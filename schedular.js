const axios = require('axios'); 
const cron = require('node-cron'); 
const Crypto = require('./models/crypto'); 
require('dotenv').config(); 

const fetchCryptoData = async () => {
    try {
        console.log("Fetching crypto data...");

        const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bitcoin,ethereum,matic-network',
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true',
            },
            headers: {
                accept: 'application/json', 
                'x-cg-api-key': process.env.COINGECKO_API_KEY 
            }
        });


        const cryptos = ['bitcoin', 'ethereum', 'matic-network'];

        
        await Promise.all(cryptos.map(async (coin) => {
            const cryptoData = new Crypto({
                coin: coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change
            });

            await cryptoData.save(); 
        }));

        console.log("Crypto data fetched and saved successfully.");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = fetchCryptoData;
