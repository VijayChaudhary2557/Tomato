const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

module.exports = () => {
    mongoose.connect(URI).then(() => {
        console.log('MongoDB connected successfully!');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });
}
