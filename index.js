
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const port = 3000;

mongoose.connect('mongodb://localhost/taraminego');
mongoose.Promise = global.Promise;



app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});
// upload multiples images 
app.post('/multiple-upload', upload.array("images",3), (req,res)=> {
console.log(req.files);
res.json({
  message:  "multiples files upload success"});
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));