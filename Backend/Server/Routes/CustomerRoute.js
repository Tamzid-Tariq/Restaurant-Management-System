import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'

const router = express.Router();



router.post("/customerlogin", (req, res) => {
    const sql = "SELECT * from customer Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "customer", email: email, id: result[0].id },
          "tbt",
          { expiresIn: "1d" }
        );
        res.cookie('token', token)
        return res.json({ loginStatus: true });
      } else {
          return res.json({ loginStatus: false, Error:"Wrong Email or Password" });
      }
    });
  });

export {router as customerRouter};


