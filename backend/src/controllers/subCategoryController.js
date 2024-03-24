const SubCategory = require("../models/subCategory")

const addSubCategory=async(req,res)=>{
    try{
        console.log(req.body);
           const subCategory=await SubCategory.create({categoryId:req.body.categoryId,subCategory:req.body.subCategory,description:req.body.description})
            console.log(subCategory);

           return res.status(200).json({
            message:"successfully add subCategory"
           })
    }
    catch(e)
    {
        console.log(e);
    }
}
const fetchAllSubCategory=async(req,res)=>{
    try {
        console.log("hello");
        const allSubCategory = await SubCategory.find();
        res.status(200).json(allSubCategory)
    } catch (err) {
        console.log(err);
    }
}

const fetchSubCategoryByName = async (req, res) => {
    try {
        const subCategory = await SubCategory.findOne({ email: req.params.name });
        res.status(200).json(subCategory)
    } catch (err) {
        console.log(err);
    }
}

const deleteSubCategoryByName = async (req, res) => {
    try {
        await SubCategory.deleteOne({ email: req.params.name })
        res.status(200).json({message:`delete subCategory : ${req.params.subCategory}`})
    } catch (err) {
        console.log(err);
    }
}

module.exports={addSubCategory,fetchAllSubCategory,fetchSubCategoryByName,deleteSubCategoryByName}