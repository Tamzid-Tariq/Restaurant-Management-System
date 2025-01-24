import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";

import mysql2 from 'mysql2'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import con from './utils/db.js'

const app = express()
app.use(cors({
    origin:["http://localhost:5173"],
    // origin: "*";
    methods: ['GET','POST','PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/auth',adminRouter)

app.listen(3000,() =>{
    console.log("Server is running")
})

app.use(cookieParser());
app.use(express.static('public'));


con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

// const upload = multer({
//     storage: storage
// })

// const { name, email, contactNumber, totalSpending, password } = req.body
//       const image = req.file ? req.file.filename : null

//       const sql = `INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password) 
//                   VALUES (?, ?, ?, ?, ?, ?)`

//       connection.query(sql, [name, image, email, contactNumber, totalSpending, password], (err, result) => {

    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            // Optional: Add file type validation
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed!'), false);
            }
        },
    });
    app.use((err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ Error: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(500).json({ Error: err.message });
        }
        next();
    });
    
    app.post('/addcustomer', upload.single('image'), (req, res) => {
        console.log("File:", req.file);
        console.log("Body:", req.body);
    
        const sql = "INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password) VALUES (?)";
        bcrypt.hash(req.body.Password.toString(), 10, (err, hash) => {
            if (err) return res.json({ Error: "Error in hashing password" });
    
            const values = [
                req.body.Name,
                req.file.filename, // Save the uploaded image's filename
                req.body.Email,
                req.body.ContactNumber,
                req.body.TotalSpending,
                hash,
            ];
    
            con.query(sql, [values], (err, result) => {
                if (err) {
                    console.error("SQL query error:", err);
                    return res.json({ Error: "Database error" });
                }
                return res.json({ Status: "Success" });
            });
        });
    });
    
    

// app.post('/addcustomer',upload.single('image'), (req, res) => {
//     const sql = "INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password) VALUES (?)";
//     bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
//         if(err) return res.json({Error: "Error in hashing password"});
//         const values = [
//             req.body.Name,
//             null,
//             // req.file.filename,
//             req.body.Email,
//             req.body.ContactNumber,
//             req.body.TotalSpending,
//             hash,
//             // req.body.address,
//             // req.body.salary,
//         ]
//         con.query(sql, [values], (err, result) => {
//             if(err) return res.json({Error: "Inside singup query"});
//             return res.json({Status: "Success"});
//         })
//     } )
// })

app.post('/addstaff', upload.single('image'), (req, res) => {
    console.log("File:", req.file);
    console.log("Body:", req.body);

    const sql = "INSERT INTO staff (Name, Image,  ContactDetails, Role, ShiftTiming) VALUES (?)";
    // bcrypt.hash(req.body.Password.toString(), 10, (err, hash) => {
    //     if (err) return res.json({ Error: "Error in hashing password" });

        const values = [
            req.body.Name,
            req.file.filename, // Save the uploaded image's filename
            req.body.ContactDetails,
            req.body.Role,
            req.body.ShiftTiming,
        ];

        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
                return res.json({ Error: "Database error" });
            }
            return res.json({ Status: "Success" });
        });
    });
// });



    app.post('/addmenu', upload.single('image'), (req, res) => {
        console.log("File:", req.file);
        console.log("Body:", req.body);
    
        const sql = "INSERT INTO menu (Name, Image,  Price, Category, Availability) VALUES (?)";
        // bcrypt.hash(req.body.Password.toString(), 10, (err, hash) => {
        //     if (err) return res.json({ Error: "Error in hashing password" });
    
            const values = [
                req.body.Name,
                req.file.filename, // Save the uploaded image's filename
                req.body.Price,
                req.body.Category,
                req.body.Availability,
            ];
    
            con.query(sql, [values], (err, result) => {
                if (err) {
                    console.error("SQL query error:", err);
                    return res.json({ Error: "Database error" });
                }
                return res.json({ Status: "Success" });
            });
        });

//         app.get('/customers/search', async (req, res) => {
//             const { category, query } = req.query;
          
//             // Validate category
//             const allowedCategories = ['Name', 'Email', 'ContactNumber'];
//             if (!allowedCategories.includes(category)) {
//               return res.status(400).json({ error: 'Invalid search category' });
//             }
          
//             const sql = `SELECT * FROM customer WHERE ${category} LIKE ?`;
          
//             try {
//               const results = await connection.query(sql, [`%${query}%`]);
//               res.json(results);
//             } catch (error) {
//               console.error('Database Error:', error); // Log the actual error
//               res.status(500).json({ error: 'Failed to fetch customers' });
//             }
//           });
          
//           app.delete('/customers/:id', async (req, res) => {
//   try {
//     await connection.query('DELETE FROM customer WHERE id = ?', [req.params.id]);
//     res.json({ message: 'Customer removed successfully' });
//   } catch (error) {
//     console.error('Database Error:', error); // Log error details
//     res.status(500).json({ error: 'Failed to remove customer' });
//   }
// });

// Fetch customers based on category and query
app.get('/customers/search', async (req, res) => {
    const { category, query } = req.query;

    // Validate category to prevent SQL injection
    const validCategories = ['Name', 'Email', 'ContactNumber'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category selected' });
    }

    const sql = `SELECT * FROM customer WHERE ?? LIKE ?`;
    try {
        const [results] = await pool.query(sql, [category, `%${query}%`]);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

// Remove a customer by ID
app.delete('/customers/:id', async (req, res) => {
    try {
        const [results] = await pool.query('DELETE FROM customer WHERE id = ?', [req.params.id]);
        res.json({ message: 'Customer removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove customer' });
    }
});