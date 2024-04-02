var express = require('express');
var app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb+srv://thondph16247:Tho1111@cluster0.i86tkyk.mongodb.net/sinhvien';

// Hàm kết nối MongoDB
function connectWithRetry() {
    mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB Atlas:', err);
        setTimeout(connectWithRetry, 5000);
    });
}

// Kiểm tra trạng thái kết nối trước khi mở kết nối mới
if (mongoose.connection.readyState === 0) {
    connectWithRetry();
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB Atlas');
});

var apicomic = require('./Api/apiComic');  // Đã sửa thành apicomic
app.use('/api/sinhvien', apicomic);  // Đã sửa thành /api/sinhvien

app.listen(8000, function () {
    console.log("Server is running on port 8000");
});
