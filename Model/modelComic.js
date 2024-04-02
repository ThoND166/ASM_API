const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
    tenSv: {
        type: String,
        required: true
    },
    tuoi: {
        type: Number,
        required: true
    },
    diemTb: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,

    },
    image: {
        type: String,
        required: true
    }
});

const Comic = mongoose.model('sinhvien', ComicSchema);
module.exports = Comic;
