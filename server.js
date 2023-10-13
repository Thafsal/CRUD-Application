require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute  = require('./routes/productRoute')
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/products',productRoute)


app.get("/", (req, res) => {
  res.send("Hello node JS && express ");
});

mongoose.set("strictQuery",false)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost/${PORT}`);
    });
    console.log("Connected to data base.....");
  })
  .catch((err) => {
    console.log(err);
  });
