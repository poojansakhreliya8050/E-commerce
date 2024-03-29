const Category = require("../models/category")

const addCategory=async(req,res)=>{
    try{
        console.log(req.body);
           const category=await Category.create({category:req.body.category,description:req.body.description})
            console.log(category);

           return res.status(200).json({
            message:"successfully add category"
           })
    }
    catch(e)
    {
        console.log(e);
    }
}
const fetchAllCategory=async(req,res)=>{
    try {
        console.log("hello");
        const allCategory = await Category.find();
        res.status(200).json(allCategory)
    } catch (err) {
        console.log(err);
    }
}

const fetchCategoryByName = async (req, res) => {
    try {
        const category = await Category.findOne({ email: req.params.name });
        res.status(200).json(category)
    } catch (err) {
        console.log(err);
    }
}

const deleteCategoryByName = async (req, res) => {
    try {
        await Category.deleteOne({ email: req.params.name })
        res.status(200).json({message:`delete category : ${req.params.category}`})
    } catch (err) {
        console.log(err);
    }
}

module.exports={addCategory,fetchAllCategory,fetchCategoryByName,deleteCategoryByName}