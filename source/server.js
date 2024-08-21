// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'view')));

// // Trang chủ
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'view', 'index.html')); 
// });

// // Xử lý đăng nhập
// app.post('/login', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (username === 'admin' && password === '123456') {
//     res.send('Đăng nhập thành công!');
//   } else {
//     res.send('Sai tên đăng nhập hoặc mật khẩu!');
//   }
// });

// app.listen(port, () => {
//   console.log(`Ứng dụng đang chạy tại localhost`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const config = require('./config'); // Giả sử bạn đã tạo file config.js

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'view')));

// Cấu hình template engine (ví dụ: EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Thư mục chứa các template

const con = mysql.createConnection(config.database);

con.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
    // Xử lý lỗi chi tiết hơn nếu cần
  } else {
    console.log("Kết nối cơ sở dữ liệu thành công!");
  }
});

// Trang chủ (hiển thị danh sách người dùng)
app.get('/', (req, res) => {
  con.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
      res.status(500).send('Lỗi máy chủ');
    } else {
      res.render('index', { users: results }); 
    }
  });
});

// Xử lý đăng nhập
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Trong thực tế, bạn cần sử dụng kỹ thuật mã hóa mật khẩu ở đây
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  con.query(query, [username, password], (err, results) => {
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

app.listen(config.port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${config.port}`);
});
