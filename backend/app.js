const express = require('express');
const app = express();
const cors = require('cors');
const process = require('process');
require('dotenv').config();
const connectDB = require('./config/db');
const foodRouter = require('./routes/FoodRoute');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


// Connect Database
const PORT = process.env.PORT;
connectDB();


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// Set Uploads path

const path = require('path');
const userRouter = require('./routes/UserRoute');
const cartRouter = require('./routes/CartRoute');
const orderRoute = require('./routes/OrderRoute');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// ............API Paths...........

app.use("/api/food", foodRouter);

app.use('/api/user', userRouter);

app.use('/api/cart', cartRouter);

app.use('/api/order', orderRoute);

// .........................................

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
})