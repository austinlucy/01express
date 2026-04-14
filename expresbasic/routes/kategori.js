var express = require('express');
const Model_Kategori = require('../model/Model_Kategori');
var router = express.Router();
const cacheMiddleware = require('../config/middleware/cacheMiddleware');

router.get('/', cacheMiddleware, async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    return res.status(200).json({
        status: true,
        message: 'Data Kategori',
        data: rows
    })
})

//Router untuk Store
router.post('/store', async function(req, res, next){
    try {
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }

        await Model_Kategori.Store(Data);

        return res.status(201).json({
            status: true,
            message: 'Data kategori berhasil di tambahkan'
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi kesalahan pada router'
        })
    }
})

//Router untuk Update
router.patch('/update/:id', async function(req, res, next){
    try {
        let id = req.params.id;
        let {nama_kategori} = req.body;

        let Data = {
            nama_kategori
        }

        await Model_Kategori.Update(id, Data);

        return res.status(201).json({
            status: true,
            message: 'Data kategori berhasil di perbarui'
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi kesalahan pada router'
        })
    }
})

//router untuk delete
router.delete('/delete/(:id)', async function(req, res, next){
    try {
        let id = req.params.id;

        await Model_Kategori.Delete(id);

        return res.status(201).json({
            status: true,
            message: 'Data berhasil di hapus'
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi kesalahan pada router'
        })
    }
})

module.exports = router;