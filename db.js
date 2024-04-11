import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT)');
});

const getAllLinks = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM links', (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const addLink = (url) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO links (url) VALUES (?)', [url], (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export { getAllLinks, addLink };