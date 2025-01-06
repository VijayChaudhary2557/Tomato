const express = require('express');
const multer = require('multer');
const { addFood, listFood, removeFood } = require('../controllers/FoodController');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Ensure 'uploads' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });     // now to upload the image file in upload folder use the middleware in routen :   upload.single("filed_name")

const foodRouter = express.Router();


// ......................Routes.........................
foodRouter.post('/add', upload.single('image'), addFood);

foodRouter.get('/list', listFood);

foodRouter.post('/remove', removeFood);



module.exports = foodRouter;