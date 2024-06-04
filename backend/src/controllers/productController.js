const Product = require("../models/product")
const uploadOnCloudinary = require("../utils/cloudinaryUpload");


const addProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        if (!req.body.categoryId || !req.body.subCategoryId || !req.body.productName || !req.body.productDescription || !req.body.price || !req.body.quantity || !req.body.userId ||!req.file) {
            return res.status(404).json({ message: "please enter valid data.." })
        }
        const imageData = await uploadOnCloudinary(req.file.path);
        console.log(imageData);
        const product = await Product.create({ categoryId: req.body.categoryId, subCategoryId: req.body.subCategoryId, productName: req.body.productName, productDescription: req.body.productDescription, price: req.body.price, quantity: req.body.quantity, img: imageData.url,userId:req.body.userId})
        console.log(product);

        return res.status(200).json({
            message: "successfully add product"
        })
    }
    catch (e) {
        console.log(e);
    }
}
const fetchAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.find();
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
    }
}

const fetchAllProductByCategoryId = async (req, res) => {
    try {
        const allProduct = await Product.find({categoryId:req.params.categoryId});
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
    }
}


const changeProductState = async (req, res) => {
    try {
        console.log(req.params.productId);
        const product = await
            Product.findOne({ _id: req.params.productId });
            console.log(product);

        if(product==null)
        {
            return res.status(404).json({message:"product not found"})
        }

        if (product.status == "active") {
            product.status = "deactive";
        }
        else {
            product.status = "active";
        }
        await product.save();
        res.status(200).json(product.status)
    }
    catch (e) {
        console.log(e);
    }
}

const fetchAllProductBySubCategoryId = async (req, res) => {
    try {
        const allProduct = await Product.find({subCategoryId:req.params.subCategoryId});
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
        res.status(200).json({ message: `delete product : ${req.params.id}` })
    } catch (err) {
        console.log(err);
    }
}

const fetchProductById = async (req, res) => {
    try {
        const product = await
            Product.findOne({ _id: req.params.productId });
        res.status(200).json(product)
    }
    catch (e) {
        console.log(e);
    }
}

const fetchProductByUserId=async (req,res)=>{
    try {
        const allProduct = await Product.find({userId:req.params.userId});
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
    }
}

module.exports = 
{ addProduct, 
fetchAllProduct, 
fetchProductByName, 
deleteProductByid ,
fetchAllProductByCategoryId,
fetchAllProductBySubCategoryId,
changeProductState,
fetchProductById,
fetchProductByUserId
}