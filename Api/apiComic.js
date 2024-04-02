var express = require('express');
var router = express.Router();
const SinhVien = require('../Model/modelComic');

router.get('/', async (req, res) => {
    try {
        const sinhvien = await SinhVien.find();
        res.json(sinhvien);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newSinhVien = new SinhVien(req.body);
        const sinhvien = await newSinhVien.save();
        res.status(201).json(sinhvien);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const sinhvienId = req.params.id;
    const updatedSinhVien = req.body;
    try {
        const sinhvien = await SinhVien.findByIdAndUpdate(sinhvienId, updatedSinhVien, { new: true });
        if (!sinhvien) {
            res.status(404).json({ error: 'Không tìm thấy sinh viên' });
            return;
        }
        res.json(sinhvien);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

router.delete('/:id', async (req, res) => {
    const sinhvienId = req.params.id;
    try {
        const deletedSinhVien = await SinhVien.findByIdAndDelete(sinhvienId);
        if (!deletedSinhVien) {
            res.status(404).json({ error: 'Không tìm thấy sinh viên' });
            return;
        }
        res.json({ message: 'Xóa sinh viên thành công' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router;
