const express = require("express");
const app = express();

// route
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000,()=>{
    console.log("node is running on port 3000");
});
