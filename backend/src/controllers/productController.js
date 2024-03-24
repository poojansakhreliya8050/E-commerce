const Product = require("../models/product")

const addProduct=async(req,res)=>{
    try{
           const product=await Product.create({name:req.body.name,price:req.body.price,subCategoryId:req.body.subCategoryId})
            console.log(product);

           return res.status(200).json({
            message:"successfully add product"
           })
    }
    catch(e)
    {
        console.log(e);
    }
}
const fetchAllProduct=async(req,res)=>{
    try {
        const allProduct = await Product.find();
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
    }
}

const fetchProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ email: req.params.name });
        res.status(200).json(product)
    } catch (err) {
        console.log(err);
    }
}

const deleteProductByid = async (req, res) => {
    try {
        await Product.deleteOne({ id: req.params.id })
        res.status(200).json({message:`delete product : ${req.params.id}`})
    } catch (err) {
        console.log(err);
    }
}

module.exports={addProduct,fetchAllProduct,fetchProductByName,deleteProductByid}