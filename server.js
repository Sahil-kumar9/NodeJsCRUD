const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productsSchema");

app.use(express.json());

// For Insering 
app.post("/api/v1/products",async(req,res)=>{
    try{
            const product = await Product.create(req.body);
            res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

// For Getting all Products
app.get("/api/v1/products",async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// For Getting Single Product
app.get("/api/v1/products/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// For Updating Products
app.put("/api/v1/products/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message:`Id ${id} not Found in DataBase`});
        }
        res.status(200).json({message:"Updated Successfull"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// For Deleting Product
app.delete("/api/v1/products/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:`Id ${id} not Found!!!`});
        }
        res.status(200).json({message:`Product Deleted SuccessFully ${id}`});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
mongoose.connect("mongodb+srv://root:root@nodejscrud.uu6jiwi.mongodb.net/NodeJsCrud?retryWrites=true&w=majority")
.then(()=>{
    console.log("DataBase Connected SuccessFully");
    app.listen(3000,()=>{
        console.log("Servere is Running on Port 3000");
    })
})
.catch((err)=>{
    console.log(err);
})