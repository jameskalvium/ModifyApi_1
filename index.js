const express = require('express');
const { resolve } = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const menu = require('./schema.js')


const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

const DB_URL=process.env.DB_URL;
app.get('/',(req,res)=>{
  res.sendFile(resolve(__dirname,'pages/index.html'));
})

mongoose.connect(DB_URL,{
  useNewParser:true,
  useUnifiedTopology:true,
}).then(()=>console.log("Connected to the database successfully"))
.catch((err)=>{
  console.log("Error occured")
})

app.post('/menu',(req,res)=>{
  const newMenu = new menu(req.body);
  newMenu.save()
  .then(()=>res.status(201).json({message: "item added"}))
  .catch((error)=>{
    res.status(500).json({message:"Error occured",error: error.message})
  })

})

app.get('/menu', (req, res) => {
  menu.find()
  .then((items)=>{
    res.status(500).json({message:" An error occured", error:err.message})
  })
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
