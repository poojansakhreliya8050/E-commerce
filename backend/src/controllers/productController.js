const Product = require("../models/product.model")
const uploadOnCloudinary = require("../utils/cloudinaryUpload");
const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");

const { getSocket } = require("../utils/socket");


const addProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    try {
        if (!req.body.categoryId || !req.body.subCategoryId || !req.body.productName || !req.body.productDescription || !req.body.price || !req.body.quantity || !req.body.userId || req.files.length == 0) {
            return res.status(404).json({ message: "please enter valid data.." })
        }
        const imagePromises = req.files.map(async (file) => {
            const image = await uploadOnCloudinary(file.path);
            return image.url;
        })
        const imageData = await Promise.all(imagePromises);

        // const imageData = await uploadOnCloudinary(req.file.path);
        // console.log(imageData);
        const product = await Product.create({ categoryId: req.body.categoryId, subCategoryId: req.body.subCategoryId, productName: req.body.productName, productDescription: req.body.productDescription, price: req.body.price, quantity: req.body.quantity, img: imageData, userId: req.body.userId })
        console.log(product, req.body.categoryId);

        const io = getSocket();
        io.to(req.body.categoryId).emit('newProduct', product);

        return res.status(200).json({
            message: "successfully add product"
        })
    }
    catch (e) {
        console.log(e);
        return res.status(404).json({ message: "something went wrong" })
    }
}

const fetchAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.find().populate('categoryId').populate('subCategoryId');
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "something went wrong" })

    }
}

const fetchAllProductByCategoryId = async (req, res) => {
    try {
        const allProduct = await Product.find({ categoryId: req.params.categoryId });
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "something went wrong" })

    }
}

const changeProductState = async (req, res) => {
    try {
        console.log(req.params.productId);
        const product = await
            Product.findOne({ _id: req.params.productId });
        console.log(product);

        if (product == null) {
            return res.status(404).json({ message: "product not found" })
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
        return res.status(404).json({ message: "something went wrong" })
    }
}

const fetchAllProductBySubCategoryId = async (req, res) => {
    try {
        const allProduct = await Product.find({ subCategoryId: req.params.subCategoryId });
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "something went wrong" })
    }
}

const fetchProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ email: req.params.name });
        res.status(200).json(product)
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "something went wrong" })

    }
}

const deleteProductByid = async (req, res) => {
    try {
        await Product.deleteOne({ id: req.params.id })
        res.status(200).json({ message: `delete product : ${req.params.id}` })
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "something went wrong" })

    }
}

const fetchProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.productId }).populate('categoryId').populate('subCategoryId').populate('userId').populate('reviews');
        res.status(200).json(product)
    }
    catch (e) {
        console.log(e);
        return res.status(404).json({ message: "something went wrong" })

    }
}

const fetchProductByUserId = async (req, res) => {
    try {
        const allProduct = await Product.find({ userId: req.params.userId });
        res.status(200).json(allProduct)
    } catch (err) {
        console.log(err);
    }
}

//give me efficient search query to search product by name and also after append category and subcategory name wise product

// const searchProducts = async (req, res) => {
//     try {
//         let query = req.query.query;
//         const products = await Product.find({ productName: { $regex: query, $options: 'i' } });
//         //also append category and subcategory name wise product
//         const subCategoriesId = await SubCategory.find({ subCategoryTitle: { $regex: query, $options: 'i' } }, { _id: 1 });
//         const categoryId = await Category.find({ categoryTitle: { $regex: query, $options: 'i' } }, { _id: 1 });
//         const subCategoryProduct = await Product.find({ subCategoryId: { $in: subCategoriesId } });
//         const categoryProduct = await Product.find({ categoryId: { $in: categoryId } });

//         const allProduct = products.concat(subCategoryProduct).concat(categoryProduct);
//         res.status(200).json(allProduct)
//     }
//     catch (e) {
//         console.log(e);
//         res.status(404).json({ message: "product not found" })
//     }
// }

const searchProducts = async (req, res) => {
    const searchString  = req.query.query;
  
    try {
      // Create a case-insensitive search query
      const regex = new RegExp(searchString, 'i');
  
      // Find categories and subcategories that match the search string
      const categories = await Category.find({ categoryTitle: regex }).exec();
      const subCategories = await SubCategory.find({ subCategoryTitle: regex }).exec();
  
      const categoryIds = categories.map(category => category._id);
      const subCategoryIds = subCategories.map(subCategory => subCategory._id);
  
      // Find products that match the search string in name or category
      const products = await Product.find({
        $or: [
          { productName: regex },
          { categoryId: { $in: categoryIds } },
          { subCategoryId: { $in: subCategoryIds } }
        ]
      })
      .populate('categoryId')
      .populate('subCategoryId')
      .exec();
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



module.exports =
{
    addProduct,
    fetchAllProduct,
    fetchProductByName,
    deleteProductByid,
    fetchAllProductByCategoryId,
    fetchAllProductBySubCategoryId,
    changeProductState,
    fetchProductById,
    fetchProductByUserId,
    searchProducts
}