const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './process.env') });
const aboutMe = require('./aboutMe')
const connectToMongo = require("./db");
const Express = require("express");
const fetchCryptoData = require('./schedular'); // Correct import syntax

connectToMongo();
const cors = require('cors');
const app = Express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', "PUT"],
    allowedHeaders: ['Content-Type', 'auth-token'],
};

app.use(cors(corsOptions));
app.use(Express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json(aboutMe);
});


app.use('/api', require('./routes/routes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
