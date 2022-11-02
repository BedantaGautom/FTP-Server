const express = require('express')
const serveIndex = require('serve-index')
const ejs=require('ejs')
const dotenv=require('dotenv')
const multer  = require('multer')
const bodyParser = require('body-parser');
dotenv.config();


const app = express()
const Storage = multer.diskStorage({
    destination: "./public/ftp/",
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  var upload = multer({
    storage: Storage,
  }).single("uploaded_file");
  
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    '/ftp',express.static('public/ftp'),
    serveIndex('public/ftp',{icons:true})
)
app.use(express.json())
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/upload',(req,res)=>{
    res.render('upload');
})
app.post('/upload',upload,(req,res)=>{
  console.log(req.file.originalname)
    res.redirect('/')
   
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>console.log('✌ server running on port 3000'))