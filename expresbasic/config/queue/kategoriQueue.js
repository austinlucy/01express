const Queue = require('bull');
const Model_Kategori = require('../../model/Model_Kategori');

const kategoriQueue = new Queue('kategori', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

// Process job untuk get data
kategoriQueue.process('get', async (job) => {
  return await Model_Kategori.getAll();
});

// Process job untuk store data
kategoriQueue.process('store', async (job) => {
  return await Model_Kategori.Store(job.data);
});

// Process job untuk update data
kategoriQueue.process('update', async (job) => {
  return await Model_Kategori.Update(job.data.id, job.data);
});

// Process job untuk delete data
kategoriQueue.process('delete', async (job) => {
  return await Model_Kategori.Delete(job.data.id);
});

module.exports = kategoriQueue;
