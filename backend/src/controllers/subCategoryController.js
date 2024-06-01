const mongoose=require("mongoose");
const SubCategory = require("../models/subCategory")
const uploadOnCloudinary=require("../utils/cloudinaryUpload")

const addSubCategory=async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body.categoryId || !req.body.subCategoryTitle  || !req.body.description || !req.file)
        {
            return res.status(404).json({message:"please enter valid data.."})
        }
        const data=await uploadOnCloudinary(req.file.path);
        console.log(data);
           const subCategory=await SubCategory.create({categoryId:req.body.categoryId,subCategoryTitle:req.body.subCategoryTitle,description:req.body.description,image:data.url})
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
        const allSubCategory = await SubCategory.find();
        res.status(200).json(allSubCategory)
    } catch (err) {
        console.log(err);
    }
}

const fetchSubCategoryById=async(req,res)=>{
    try {
        const subCategory = await SubCategory.findOne({ _id: req.params.id });
        res.status(200).json(subCategory)
    } catch (err) {
        console.log(err);
    }
}

const fetchSubCategoryByCateroryId = async (req, res) => {
    try {
        const subCategory = await SubCategory.find({categoryId:req.params.categoryId});
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

module.exports={addSubCategory,fetchAllSubCategory,fetchSubCategoryByCateroryId,deleteSubCategoryByName,fetchSubCategoryById}