const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    productName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
    }
}, {timestamps: true})

module.exports = mongoose.model("Sales", saleSchema)