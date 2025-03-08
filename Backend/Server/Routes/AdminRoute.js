import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })
// router.get("/addcustomer", async (req, res) => {
//   try {
//       const { name, image, email, contactnumber, totalspending, password } = req.body

//       const sql = `
//           INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password)
//           VALUES (?, ?, ?, ?, ?, ?)
//       `

//       connection.query(sql, [name, image, email, contactnumber, totalspending, password], (err, result) => {
//           if (err) {
//               return res.status(500).send(err)
//           }
//           if (result.affectedRows === 1) {
//             console.log("Customer Added")
//               res.json({ message: 'Customer added successfully!' })
//           } else {
//             console.log("Failed to Add Customer")
//               res.status(400).json({ message: 'Failed to add customer' })
//           }
//       })
//   } catch (error) {
//       console.log(error)
//       res.status(500).json({ message: 'Server error', error })
//   }
// })

router.get("/addcustomer", upload.single('image'), (req, res) => {
  try {
      const { name, email, contactNumber, totalSpending, password } = req.body
      const image = req.file ? req.file.filename : null

      const sql = `INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password) 
                  VALUES (?, ?, ?, ?, ?, ?)`

      connection.query(sql, [name, image, email, contactNumber, totalSpending, password], (err, result) => {
          if (err) {
              console.error(err)
              return res.status(500).json({ message: 'Database error' })
          }
          res.status(200).json({ message: 'Customer added successfully' })
      })
  } catch (error) {
      res.status(500).json({ message: 'Server error' })
  }
})

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
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

 

export {router as adminRouter} 