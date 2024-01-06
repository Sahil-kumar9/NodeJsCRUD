const express = require('express');
const app = express();


app.get("/",(req,res)=>{
    res.get("hello");
})

app.listen(3000,()=>{
    console.log("Servere is Running on Port 3000");
})