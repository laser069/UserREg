const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose")
const bcrypt  = require("bcrypt")
const User = require("./schema")


mongoose.connect("mongodb://localhost:27017/Auth").then(console.log("success")).catch(e=>console.log(e))

const app = express();
const port = 3010;
app.use(express.json())
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.post('/',async (req,res)=>{
  const {username,email,password} = req.body;
  if(!username||!email||!password)res.status(400).send("Error Fetching Data")
  try{
    
    const newUser = new User({username,email,password})
    await newUser.save()
    res.status(201).send("User Created Successfully")
  }catch(e){
    console.log("error",e)
  }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
