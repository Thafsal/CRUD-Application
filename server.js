const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Product = require('./models/products')

//Middlewares 

app.use(express.json())
app.use(express.urlencoded({extended :false}))



//DB config
const MONGO_URI =
  "mongodb+srv://thafsal97:wE8ES97da6UK5l45@nodeexpressproject.1rwxihe.mongodb.net/Crud-api?retryWrites=true&w=majority";


// Routes 
app.post('/products',async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
app.get('/products', async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
           return res.status(404).json({message:`no file with an id ${id}`})
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
           return res.status(404).json({message:`no file with an id ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get("/", (req, res) => {
  res.send("Hello node JS && express ");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost/${PORT}`);
    });
    console.log("Connected to data base.....");
  })
  .catch((err) => {
    console.log(err);
  });
