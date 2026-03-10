const connection = require('../config/database');

class Model_Produk {

    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk ORDER BY id DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO produk SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE produk SET ? WHERE id = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM produk WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Model_Produk;