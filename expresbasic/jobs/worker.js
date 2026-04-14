const Model_Kategori = require('../model/Model_Kategori');
const { kategoriQueue, produkQueue } = require('../config/middleware/queue');
const Model_Produk = require('../model/Model_Produk');

// Worker untuk kategori
kategoriQueue.process(async (job) => {
  const { action, id, Data } = job.data;
  console.log(`Memproses antrian kategori... (ID: ${job.id}, Action: ${action})`);

  if (action === 'get') {
    const hasilQuery = await Model_Kategori.getAll();
    console.log(`Antrian ID ${job.id} selesai: Data kategori diambil.`);
    return { data: hasilQuery };
  }

  if (action === 'store') {
    await Model_Kategori.Store(Data);
    return { message: 'Kategori berhasil ditambahkan' };
  }

  if (action === 'update') {
    console.log(Data);
    await Model_Kategori.Update(id, Data);
    return { message: `Kategori dengan ID ${id} berhasil diperbarui` };
  }

  if (action === 'delete') {
    await Model_Kategori.Delete(id);
    return { message: `Kategori dengan ID ${id} berhasil dihapus` };
  }
});

produkQueue.process(async (job) => {
  // (bagian ini kosong sesuai gambar)
});

console.log("Worker berjalan dan siap memproses banyak antrian...");