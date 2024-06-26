const Category = require("../models/category.model")
const uploadOnCloudinary = require("../utils/cloudinaryUpload");
const { getSocket } = require('../utils/socket');


const addCategory = async (req, res) => {
    try {
        if (!req.body.categoryTitle || !req.body.description || !req.file) {
            return res.status(404).json({ message: "please enter valid data.." })
        }
        console.log(req.body);
        const data = await uploadOnCloudinary(req.file.path);
        console.log(data);
        const category = await Category.create({ categoryTitle: req.body.categoryTitle, description: req.body.description, image: data.url })
        const io = getSocket();
        io.emit('addCategory', category );

        return res.status(200).json({
            message: "successfully add category",
            category
        })
    }
    catch (e) {
        res.status(404).json({ message: error.message });
    }
}

const fetchAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.status(200).json(allCategory)
    } catch (err) {
        console.log(err);
         res.status(404).json({ message: err.message });
    }
}

//fetchcategory by id
const fetchCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        res.status(200).json(category)
    } catch (err) {
        console.log(err);
    res.status(404).json({ message: err.message });
    }
}



const fetchCategoryByName = async (req, res) => {
    try {
        const category = await Category.findOne({ email: req.params.name });
        res.status(200).json(category)
    } catch (err) {
        console.log(err);
    res.status(404).json({ message: err.message });
    }
}

const deleteCategoryByName = async (req, res) => {
    try {
        await Category.deleteOne({ email: req.params.name })
        res.status(200).json({ message: `delete category : ${req.params.category}` })
    } catch (err) {
        console.log(err);
    res.status(404).json({ message: err.message });

    }
}


const updateCategory = async (req, res) => {
    try {
        if (!req.body.categoryTitle || !req.body.description) {
            return res.status(404).json({ message: "please enter valid data.." })
        }
        let data;
        console.log(req.file);
        if(req.file!=undefined){
        const img = await uploadOnCloudinary(req.file.path);
        data=img.url;
        }
        else
        data=req.body.image;

        const categoryId = req.params.categoryId;
        await Category.findByIdAndUpdate(categoryId, { categoryTitle: req.body.categoryTitle, description: req.body.description,image:data}, { new: true })
        res.status(200).json({ message: "successfully updated category" })
    } catch (err) {
        console.log(err);
    res.status(404).json({ message: err.message });

    }
}

module.exports = { addCategory, fetchAllCategory, fetchCategoryByName, deleteCategoryByName, fetchCategoryById, updateCategory }