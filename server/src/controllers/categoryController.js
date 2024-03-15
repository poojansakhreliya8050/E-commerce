const Category = require("../models/category")

const addCategory=async(req,res)=>{
    try{
           
    }
    catch(e)
    {
        console.log(e);
    }
}
const fetchAllCategory=async()=>{
    try{
        const allCategory = await Category.find();
        res.status(200).json(allCategory)
    }
    catch(e)
    {
        console.log(e);
    }
}

module.exports={addCategory,fetchAllCategory}