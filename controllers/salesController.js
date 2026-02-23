const Sales = require('../models/salesModel');
const Product = require('../models/productModel');

//sales controller
const createSale = async (req, res)=>{
    try{
        const {productId, quantity} = req.body

        //check if product exist
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                message: "no product found"
            });
        }
        //check stock avaliablitiy
        if(product.stock < quantity){
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }

        //calculate total
        const totalPrice = product.price * quantity;

        //reduce stock in the database
        product.stock -= quantity;
        await product.save();

        //create sale
        const sale = new Sales({
            productName: product._id,
            quantity,
            totalPrice
        });
        await sale.save();
        
        const populatedSale = await sale.populate('productName', 'productName price');

        res.status(201).json({
            success: true,
            message: "Sale created successfully",
            sale: populatedSale
        });


    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//get sales with product details
const getSale = async (req, res)=>{
    try{
        const sales = await Sales.find()
        .populate("productName", "productName price");

        res.status(201).json({
            sales
        })

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createSale,
    getSale
}