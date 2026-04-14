const Queue = require('bull');

const redisConfig = {
  redis: { host: '10.251.136.250', port: 6379 }
};

const kategoriQueue = new Queue('kategoriQueue', redisConfig);
kategoriQueue.getWaiting().then(console.log);
kategoriQueue.getActive().then(console.log);
kategoriQueue.getFailed().then(console.log);

const produkQueue = new Queue('produkQueue', redisConfig);
produkQueue.getWaiting().then(console.log);
produkQueue.getActive().then(console.log);
produkQueue.getFailed().then(console.log);

module.exports = { kategoriQueue, produkQueue };
