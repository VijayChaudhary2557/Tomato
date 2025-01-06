const Food = require('../models/Food');
const { foodSchema } = require('../schema');
const fs = require('fs');


//  ...................Add Food............................


module.exports.addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "No file uploaded" });
    }

    req.body.image = req.file.filename;

    let { error } = foodSchema.validate(req.body);

    if (error) {
        fs.unlink(`uploads/${req.body.filename}`, () => {});
        return res.json({ success: false, message: `Error: ${error}` });
    } else {
        let filename = req.file.filename;

        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: filename,
        });

        try {
            await food.save();
            res.json({ success: true, message: "Food Added" });
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: `Error: ${error}` });
        }
    }
}

 

//  ...................Show Food List............................


module.exports.listFood = async(req, res) => {
    try {
        const foods = await Food.find({});
        return res.json({success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: `Error: ${error}`});
    }
}


//  ...................Remove Food List............................

module.exports.removeFood = async (req, res) => {
    try {
        const food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});

        await Food.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food removed"});
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}