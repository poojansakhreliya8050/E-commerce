const cart=require('../models/cart.model')
const product=require('../models/product.model')


//also increse or decrese quantity in  product model

const addToCart=async(req,res)=>{
    try{
        const {userId,productId}=req.body
        const productExist=await product.findById(productId)
        if(!productExist){
            return res.status(404).json({message:"product not found"})
        }
        let cartExist=await cart.findOne({userId:userId})
        if(!cartExist){
            cartExist=await cart.create({userId:userId,items:[{item:productId}]})
        }
        else{
            let itemExist=cartExist.items.find(item=>item.item==productId)
            if(itemExist){
                itemExist.quantity+=1
            }
            else{
                cartExist.items.push({item:productId})
            }
            cartExist=await cartExist.save()
        }
        cartExist=await cart.findOne({userId:userId}).populate("items.item")
        return res.status(200).json(cartExist)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

const getCart=async(req,res)=>{
    try{
        const userId=req.params.userId
        const cartExist=await cart.findOne({userId:userId}).populate("items.item")
        return res.status(200).json(cartExist)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

const removeFromCart=async(req,res)=>{
    try{
        console.log(req.body);
        const {userId,productId}=req.body
        let cartExist=await cart.findOne({userId:userId})
        if(!cartExist){
            return res.status(404).json({message:"cart not found"})
        }
        let itemExist=cartExist.items.find(item=>item.item==productId)
        if(!itemExist){
            return res.status(404).json({message:"item not found"})
        }
        if(itemExist.quantity>1){
            itemExist.quantity-=1
        }
        else{
            cartExist.items=cartExist.items.filter(item=>item.item!=productId)
        }
        cartExist=await cartExist.save()
        cartExist=await cart.findOne({userId:userId}).populate("items.item")
        return res.status(200).json(cartExist)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

const emptyCart=async(req,res)=>{
    try{
        const userId=req.params.userId
        let cartExist=await cart.findOne({userId:userId})
        if(!cartExist){
            return res.status(404).json({message:"cart not found"})
        }       
        cartExist.items=[]
        cartExist=await cartExist.save()
        return res.status(200).json(cartExist)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

const removeItemFromCart=async(req,res)=>{
    try{
        const {userId,productId}=req.body
        let cartExist=await cart.findOne({userId:userId})
        if(!cartExist){
            return res.status(404).json({message:"cart not found"})
        }
        cartExist.items=cartExist.items.filter(item=>item.item!=productId)
        cartExist=await cartExist.save()
        cartExist=await cart.findOne({userId:userId}).populate("items.item")
        return res.status(200).json(cartExist)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}



module.exports={addToCart,getCart,removeFromCart,emptyCart,removeItemFromCart}
    