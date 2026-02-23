
🧼 Soap Factory API
A RESTful API for managing a Soap Factory system built with Node.js, Express, and MongoDB.
This API handles product management, sales processing, staff management.

🚀 Features
✅ Product Management (Create, Read, Update, Delete)
✅ Sales Processing with Product Reference
✅ Stock Management
✅ Staff Management (Admin controlled)
✅ Image Upload (e.g., staff passport)
✅ Pagination & Search
✅ Error Handling
✅ Secure Environment Variables


🛠️ Tech Stack
Node.js
Express.js
MongoDB
Mongoose
Multer (File uploads)
JWT (Authentication )
Dotenv

📁 Project Structure
soap-factory-api/
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── salesController.js
│
├── models/
│   ├── productModel.js
│   ├── saleModel.js
│   ├── staffModel.js
│   ├── userModel.js
│
├── routes/
│   ├── productRoutes.js
│   ├── saleRoutes.js
│   ├── authRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── loginLimiterMiddleware.js
│   ├── adminMiddleware.js
│   ├── uploadMiddleware.js
│
├── uploads/
│
├── .env
├── server.js
└── package.json

⚙️ Installation
1️⃣ Clone the repository:
Bash
git clone https://github.com/yourusername/soap-factory-api.git
2️⃣ Install dependencies:
Bash
npm install
3️⃣ Create a .env file:
JWT_SECRET=your_secret_key
4️⃣ Run the server:
Bash
npm run dev
🌐 API Base URL
http://localhost:3000/api

Example Product Schema
JSON
{
  "name": "Medicated Soap",
  "price": 1500,
  "stock": 50
}

Example Sales Schema
JSON
{
  "product": "productId_here",
  "quantity": 2,
  "totalPrice": 3000
}
Sales uses Mongoose .populate() to return the product name instead of only product ID.


🔎 Pagination Example
GET /products?page=1&limit=10

🔐 Authentication (If Enabled)
Register
Login
JWT Protected Routes
Limited Login Attempts (Account Lock System)

🧪 Testing
Use:
Postman
Thunder Client

📌 Error Handling
Centralized error middleware handles:
Validation errors
Cast errors (ObjectId)
Authentication errors
Server errors

🛡️ Security Best Practices
.env added to .gitignore
Password hashing (bcrypt)
JWT token expiration
Input validation

👨‍💻 Author
Azuama Odinaka Maximus

📄 License
This project is licensed under the MIT License.
