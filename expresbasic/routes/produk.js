var express = require('express');
const Model_Produk = require('../model/Model_Produk');
var router = express.Router();

const fs = require('fs');
const multer = require('multer');
const path = require('path');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const limits = { fileSize: 1 * 1024 * 1024 };
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
};
const upload = multer({storage: storage, limits, fileFilter})

// GET All - Menampilkan semua data produk
router.get('/', async function(req, res, next){
    let rows = await Model_Produk.getAll();
    cache.set('all_produk', rows, 60); // Cache data selama 60 detik
    return res.status(200).json({
        status: true,
        message: 'Data Produk (cache)',
        data: rows
    });
});

// GET By ID - Menampilkan data produk berdasarkan ID
router.get('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Produk.getId(id);
        
        if (rows.length > 0) {
            res.json({
                success: true,
                data: rows[0]
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data',
            error: error.message
        });
    }
});

// POST - Menyimpan data produk baru
router.post('/store', upload.single('gambar'), async function(req, res, next) {
    try {
        let data = {
            nama_produk: req.body.nama_produk,
            gambar_produk: req.file ? req.file.filename : null,
            kategori_id: req.body.kategori_id
        };
        
        let result = await Model_Produk.store(data);
        res.json({
            success: true,
            message: 'Produk berhasil ditambahkan',
            data: {
                id: result.insertId,
                ...data
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan produk',
            error: error.message
        });
    }
});

// PUT/PATCH - Memperbarui data produk berdasarkan ID
router.put('/:id', upload.single('gambar'), async function(req, res, next) {
    try {
        let id = req.params.id;
        let data = {
            nama_produk: req.body.nama_produk,
            kategori_id: req.body.kategori_id
        };
        
        
        if (req.file) {
            data.gambar_produk = req.file.filename;
        }
        
        let result = await Model_Produk.update(id, data);
        
        if (result.affectedRows > 0) {
            res.json({
                success: true,
                message: 'Produk berhasil diperbarui',
                data: {
                    id: id,
                    ...data
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui produk',
            error: error.message
        });
    }
});

// DELETE - Menghapus data produk berdasarkan ID
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let result = await Model_Produk.delete(id);
        
        if (result.affectedRows > 0) {
            res.json({
                success: true,
                message: 'Produk berhasil dihapus'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus produk',
            error: error.message
        });
    }
});

module.exports = router;
