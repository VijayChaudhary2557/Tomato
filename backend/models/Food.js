const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        require: true
    },
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;