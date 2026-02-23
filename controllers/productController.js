const Product = require('../models/productModel');


//add product by admin
const addProduct = async (req, res)=>{
    try{
        const {productName, stock, price} = req.body;

        const products =  await Product.findOne({productName});
        if(products){
            res.status(403).json({
                message: " Product Already exist"
            });
        }

        const newProduct =  new Product({
            productName,
            stock,
            price
        });
        await newProduct.save();

        if(!newProduct){
            res.status(402).json({
                message: "Adding Product failed"
            });
        }

        res.status(201).json({
            success: true,
            message: "Product details added successfully"
        })

    }catch(err){
        res.status(500).json({
            message: err.message,
        })

    }
}

//edit product quantity
const updateProduct = async(req, res)=>{
    try{
        const {stock} = req.body;

        const updateProduct =  await Product.findByIdAndUpdate(
            req.params.id, 
            {stock}, 
            {new: true})
        if(!updateProduct){
            res.status(404).json({
                message: "no product found"
            });
        }

        res.status(201).json({
            message: "Product Quantity updated Successfully"
        });

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}//699cc94f8fcee18b3880a8f5

//delete product 
const deleteProduct = async (req, res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            return res.status(404).json({
                message: "product not found"
            });
        }
        res.status(201).json({
            success: true,
            message: "product deleted successfully"
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

//get all product
const getProducts = async (req, res)=>{
    try{
        const products = await Product.find({});
        if(!products){
            return res.status(404).json({
                message: "no product found"
            });
        }

        res.status(201).json({
            sucess: true,
            data: products
        })

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//get product by id
const getProductById = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message: "no product found"
            });
        }

        res.status(201).json({
            success: true,
            data: product
        })

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

//query product
const queryPagination = async (req, res)=>{
    try{
        const {page = 1, limit = 10} = req.query;

        const products = await Product.find()
        .skip((page - 1) * limit)
        .limit(Number(limit))

        const totalProducts = await Product.countDocuments();
        res.status(201).json({
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products

        })

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
    queryPagination
}