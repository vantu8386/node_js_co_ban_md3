const mysql2 = require("mysql2");

let pool = mysql2.createPool({
  database: "user_manager",
  host: "localhost",
  password: "12345678",
  user: "root",
  port: 3306,
});
pool.getConnection((err, connection) => {
  if (err) {
    console.log("kết nốt thất bại");
  } else {
    console.log("kết nối thành công");
  }
});

module.exports = pool.promise();
