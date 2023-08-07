const express = require("express");
const routers = express.Router();
const db = require("../utils/database");

// Thêm mới usres
routers.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const data = await db.execute(
      " INSERT INTO users (name, email, age) VALUES (?,?,?)",
      [name, email, age]
    );
    return res.status(201).json({ data: req.body });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// get all
routers.get("/", async (req, res) => {
  try {
    const data = await db.execute("SELECT * FROM users");
    return res.status(200).json({
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// get one
routers.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.execute(" SELECT * FROM users WHERE users_id = ?", [
      id,
    ]);
    return res.status(201).json({
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// patch update user

routers.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const data = await db.execute(
      " UPDATE users SET name = ?, email = ?, age = ? WHERE users_id = ? ",
      [name, email, age, id]
    );
    if (data.length === 0) {
      res.json({
        message: `không tìm thấy id: ${id}`,
      });
    } else {
      res.json({
        message: `cập nhật thành công id: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

// delete user
routers.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await db.execute(" DELETE FROM users WHERE users_id = ?", [
      id,
    ]);
    console.log(data);
    if (data.affectedRows > 0) {
      return res.json({
        message: `Xóa thành công id: ${id}`,
      });
    } else {
      return res.json({
        message: `Không có id: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

module.exports = routers;
