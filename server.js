require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))

const PORT = 3000



//routes
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/sales', require('./routes/saleRoute'));
app.use('/api/auth', require('./routes/authRoute'));


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })  
}).catch((err)=>{
    console.error("Failed to connect to the database", err);
})
