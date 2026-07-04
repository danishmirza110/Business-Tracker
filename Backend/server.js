const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./db/db");


const productRoutes=require('./routes/productRoutes');
const orderRoutes=require('./routes/orderRoutes');
const expenseRoutes=require('./routes/expenseRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes');
const authRoutes=require('./routes/authRoutes')


const app = express();
app.use(express.json());

connectDB();
app.use(cors());


app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/expenses",expenseRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/auth",authRoutes);


const PORT=process.env.PORT
app.listen(PORT, () => {
  console.log("Server started");
});