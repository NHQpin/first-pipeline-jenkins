const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const config = require('./config'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

const pool = mysql.createPool(config.database);

// // Trang chủ (hiển thị danh sách người dùng)
// app.get('/user', (req, res) => {
//     pool.query('SELECT USER FROM NHQ', (err, results) => { 
//         if (err) {
//             console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
//             res.status(500).send('Lỗi máy chủ');
//         } else {
//             res.render('index', { users: results }); 
//         }
//     });
// });

// Xử lý đăng nhập
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = 'SELECT * FROM NHQ WHERE USER = ? AND PASS = ?';
    pool.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi máy chủ');
        } else if (results.length > 0) {
            res.send('Đăng nhập thành công!');
        } else {
            res.send('Thông tin đăng nhập không đúng'); 
        }
    });
});

// app.listen(config.port, () => {
//     console.log(`Ứng dụng đang chạy tại http://localhost:${config.port}`);
// });
app.listen(3000, () => {
    console.log(`Ứng dụng đang chạy tại http://localhost:3000`);
  });