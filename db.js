const mongoose = require('mongoose');

// MongoDB URI (use environment variable for the password)
const mongoURI = `${process.env.URI}`;

// Disable strict query warnings (optional)
mongoose.set('strictQuery', false);

// Function to connect to MongoDB
const connectToMongo = async () => {
    try {
        // Use async/await for mongoose connection
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000 
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        // Log the error if connection fails
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit process on failure
    }
};

module.exports = connectToMongo;
