import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post("/add-admin", (req, res) => {
    const sql = "Insert into Admin where ";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
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

  router.post("/addcustomer", async (req, res) => {
    try {
        const { name, image, email, contactnumber, totalspending, password } = req.body

        const sql = `
            INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password)
            VALUES (?, ?, ?, ?, ?, ?)
        `

        connection.query(sql, [name, image, email, contactnumber, totalspending, password], (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            if (result.affectedRows === 1) {
              console.log("Customer Added")
                res.json({ message: 'Customer added successfully!' })
            } else {
              console.log("Failed to Add Customer")
                res.status(400).json({ message: 'Failed to add customer' })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error })
    }
})

export {router as AdminPortalRouter} 