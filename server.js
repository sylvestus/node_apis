const express = require("express");
const app = express();

const mongoose = require('mongoose')
const Product =require('./models/productModel')

const multer = require("multer");
const upload = multer(); // Create a Multer instance with default configuration

// for express to understand json  -> enable the middleware
app.use(express.json())
// to enable using urlencoded formdata -> enable the middleware
app.use(express.urlencoded({ extended :false}));
// enable form data ----
app.use(upload.any()); // Handle any number of incoming files


// route
app.get("/", function (req, res) {
  res.send("Hello World");
});
// fetch products
app.get("/products",async(req,res)=>{
    try {
            const product = await Product.find({});
            res.status(200).json(product);
        
    } catch (error) {
         console.log(error.message);
         res.status(500).json({ message: error.message });
    }
})

// fetch an individual item
app.get("/product/:id", async (req, res) => {
  try {
    const {id}=req.params
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// adding a product
app.post("/product", async(req, res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
});

// updating a product
// can use patch too to update specific parts of a file
app.put('/products/:id', async (req, res) => {
  try {
    const {id}=req.params;
    const product = await Product.findByIdAndUpdate(id,req.body);
    // cant such a product
    if(!product){
        return res.status(404).json({message:`Cannot find product with this ${id} id  `})
    }   
    const updatedProduct=await Product.findById(id);
    res.status(200).json(updatedProduct);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


// delete product
app.delete("/product/:id", async(req, res)=> {
//   res.send("Hello more and more");    
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
            if (!product) {
              return res
                .status(404)
                .json({ message: `Cannot find product with this ${id} id  ` });
            }
            product.message="deleted successfully"  
            res.status(200).json(product);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    
});


mongoose.set("strictQuery",false).
mongoose.connect(
  "mongodb+srv://silvanussigei1996:0geqMiXvdJ8sx67i@nodeapis.bhevb4k.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=nodeapis"
)
.then(()=>{
console.log("connected to mongo db")
app.listen(3000, () => {
  console.log("node is running on port 3000");
})

}).catch((error)=>{
console.log(error);
});
