import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
// import { customerRouter } from "./Routes/CustomerRoute.js";
import mysql2 from "mysql2";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

import con from "./utils/db.js";

import { fileURLToPath } from "url";
import { stringify } from "querystring";

// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = express.Router();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    // origin: "*";
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", adminRouter);

app.listen(3000, () => {
  console.log("Server is running");
});

app.use(cookieParser());
app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        Status: "Error",
        Message: "Internal Server Error"
    });
});


con.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

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
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
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

// app.post("/addcustomer", upload.single("image"), (req, res) => {
//   console.log("File:", req.file);
//   console.log("Body:", req.body);
  
//   const sql =
//     "INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password) VALUES (?)";
//   bcrypt.hash(req.body.Password.toString(), 10, (err, hash) => {
//     if (err) return res.json({ Error: "Error in hashing password" });

//     const values = [
//       req.body.Name,
//       req.file.filename, // Save the uploaded image's filename
//       req.body.Email,
//       req.body.ContactNumber,
//       req.body.TotalSpending,
//       hash,
//     ];

//     con.query(sql, [values], (err, result) => {
//       if (err) {
//         console.error("SQL query error:", err);
//         return res.json({ Error: "Database error" });
//       }
//       return res.json({ Status: "Success" });
//     });
//   });
// });

app.post("/customerlogin", (req, res) => {
  const sql = "SELECT * from customer Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "customer", email: email, id: result[0].CustomerID },
        "nndn",
        { expiresIn: "1d" }
      );
      res.cookie('token', token);
      res.cookie('id', String(result[0].CustomerID));
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
    }
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addcustomer', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ Error: 'Image file is required.' });
  }

  const { Name, Email, ContactNumber, TotalSpending, Password } = req.body;

  bcrypt.hash(Password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: 'Error in hashing password' });

    const sql = 'INSERT INTO customer (Name, Image, Email, ContactNumber, TotalSpending, Password) VALUES (?)';
    const values = [Name, req.file.filename, Email, ContactNumber, TotalSpending, hash];

    con.query(sql, [values], (err, result) => {
      if (err) {
        console.error('SQL query error:', err);
        return res.json({ Error: 'Database error' });
      }
      return res.json({ Status: 'Success' });
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

app.post("/addstaff", upload.single("image"), (req, res) => {
  console.log("File:", req.file);
  console.log("Body:", req.body);

  const sql =
    "INSERT INTO staff (Name, Image,  ContactDetails, Role, ShiftTiming) VALUES (?)";
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

app.post("/addmenu", upload.single("image"), (req, res) => {
  console.log("File:", req.file);
  console.log("Body:", req.body);

  const sql =
    "INSERT INTO menu (Name, Image,  Price, Category, Availability) VALUES (?)";
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
app.get("/customers/search", async (req, res) => {
  const { category, query } = req.query;

  // Validate category to prevent SQL injection
  const validCategories = ["Name", "Email", "ContactNumber"];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category selected" });
  }

  const sql = `SELECT * FROM customer WHERE ?? LIKE ?`;
  try {
    const [results] = await pool.query(sql, [category, `%${query}%`]);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// Remove a customer by ID
app.delete("/customers/:id", async (req, res) => {
  try {
    const [results] = await pool.query("DELETE FROM customer WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Customer removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove customer" });
  }
});

// app.get("/customers", (req, res) => {
//     const sql = "SELECT CustomerID, Name FROM customer";
//     con.query(sql, (err, result) => {
//       if (err) {
//         console.error("SQL query error:", err);
//         return res.status(500).json({ Error: "Database error" });
//       }
//       res.json(result);
//     });
//   });

app.get("/customers", (req, res) => {
  // const sql = "SELECT CustomerID, Name, Email, ContactNumber FROM customer";
  const sql = "SELECT * from customer";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL query error:", err);
      return res.status(500).json({ Error: "Database error" });
    }
    res.json(result);
  });
});

app.get("/customers/:id", (req, res) => {
  const customerId = req.params.id;
  const sql = "SELECT * FROM customer WHERE CustomerID = ?";

  con.query(sql, [customerId], (err, result) => {
    if (err) {
      console.error("SQL query error:", err);
      return res.status(500).json({ Error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ Error: "Customer not found" });
    }
    res.json(result[0]);
  });
});

// Backend endpoints

// Get customer orders
app.get("/customers/:id/orders", (req, res) => {
  const customerId = req.params.id;
  const sql = "SELECT * FROM orders WHERE CustomerID = ? ORDER BY OrderDate DESC";

  con.query(sql, [customerId], (err, result) => {
    if (err) {
      console.error("SQL query error:", err);
      return res.status(500).json({ Error: "Database error" });
    }
    res.json(result);
  });
});

// Get customer reservations
app.get("/customers/:id/reservations", (req, res) => {
  const customerId = req.params.id;
  const sql = "SELECT * FROM reservation WHERE CustomerID = ? ORDER BY ReservationDate DESC";

  con.query(sql, [customerId], (err, result) => {
    if (err) {
      console.error("SQL query error:", err);
      return res.status(500).json({ Error: "Database error" });
    }
    res.json(result);
  });
});

app.get("/staff", (req, res) => {
  // const sql = "SELECT CustomerID, Name, Email, ContactNumber FROM customer";
  const sql = "SELECT * from staff";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL query error:", err);
      return res.status(500).json({ Error: "Database error" });
    }
    res.json(result);
  });
});

app.get("/menu", (req, res) => {
   const sql = "SELECT * from menu";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("SQL query error:", err);
      return res.status(500).json({ Error: "Database error" });
    }
    res.json(result);
  });
});

app.get("/allorder", (req, res) => {
  const sql = "SELECT * from orders natural join customer";
 con.query(sql, (err, result) => {
   if (err) {
     console.error("SQL query error:", err);
     return res.status(500).json({ Error: "Database error" });
   }
   res.json(result);
 });
});

router.put("/updateCustomer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const sql = `UPDATE customer 
                    SET Name = ?, Email = ?, ContactNumber = ?, TotalSpending = ? 
                    WHERE Customerid = ?`;

    con.query(
      sql,
      [
        updatedData.Name,
        updatedData.Email,
        updatedData.ContactNumber,
        updatedData.TotalSpending,
        id,
      ],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ Status: "Error", Message: err.message });
        }
        res.json({
          Status: "Success",
          Message: "Customer updated successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ Status: "Error", Message: error.message });
  }
});


app.delete("/deleteCustomer/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  const sql = "DELETE FROM customer WHERE CustomerID = ?";

  con.query(sql, [customerId], (err, result) => {
    if (err) {
      console.error("SQL query error:", err);
      return res.json({ Error: "Database error" });
    }
    res.json({ Status: "Success" });
  });
});

app.delete("/api/staff/:staffId", (req, res) => {
    const staffId = req.params.staffId;

    // Validate staffId
    if (!staffId) {
        return res.status(400).json({
            Status: "Error",
            Message: "Staff ID is required"
        });
    }

    // Delete query
    const sql = "DELETE FROM staff WHERE StaffID = ?";
    
    con.query(sql, [staffId], (err, result) => {
        if (err) {
            console.error("Delete error:", err);
            return res.status(500).json({
                Status: "Error",
                Message: "Database error while deleting staff"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                Status: "Error",
                Message: "Staff not found"
            });
        }

        res.json({
            Status: "Success",
            Message: "Staff deleted successfully"
        });
    });
});

//   // Add this near your other routes
//   app.get('/api/customers/:id', (req, res) => {
//     const customerId = req.params.id;
//     const sql = "SELECT * FROM customer WHERE CustomerID = ?";

//     con.query(sql, [customerId], (err, result) => {
//         if (err) {
//             return res.status(500).json({
//                 Status: "Error",
//                 Message: "Database error"
//             });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({
//                 Status: "Error",
//                 Message: "Customer not found"
//             });
//         }
//         res.json(result[0]);
//     });
// });

// Update customer
// app.put('/api/customers/:id', (req, res) => {
//     const customerId = req.params.id;
//     const { Name, Email, ContactNumber, TotalSpending } = req.body;

//     const sql = `UPDATE customer
//                 SET Name = ?,
//                     Email = ?,
//                     ContactNumber = ?,
//                     TotalSpending = ?
//                 WHERE Customerid = ?`;

//     con.query(sql, [Name, Email, ContactNumber, TotalSpending, customerId], (err, result) => {
//         if (err) {
//             console.error("Update error:", err);
//             return res.status(500).json({
//                 Status: "Error",
//                 Message: "Failed to update customer"
//             });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({
//                 Status: "Error",
//                 Message: "Customer not found"
//             });
//         }

//         res.json({
//             Status: "Success",
//             Message: "Customer updated successfully"
//         });
//     });
// });

app.put("/api/customers/:id", upload.single("Image"), (req, res) => {
  const customerId = req.params.id;
  const { Name, Email, ContactNumber, TotalSpending } = req.body;
  const Image = req.file ? req.file.filename : null;

  let sql = `UPDATE customer 
               SET Name = ?, 
                   Email = ?, 
                   ContactNumber = ?, 
                   TotalSpending = ?`;
  let params = [Name, Email, ContactNumber, TotalSpending];

  if (Image) {
    sql += `, Image = ?`;
    params.push(Image);
  }

  sql += ` WHERE CustomerID = ?`;
  params.push(customerId);

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Failed to update customer",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Status: "Error",
        Message: "Customer not found",
      });
    }

    res.json({
      Status: "Success",
      Message: "Customer updated successfully",
    });
  });
});


app.put("/api/staff/:id", upload.single("Image"), (req, res) => {
    const StaffId = req.params.id;
    const { Name, ContactDetails, Role, ShiftTiming } = req.body;
    const Image = req.file ? req.file.filename : null;
  
    let sql = `UPDATE staff
                 SET Name = ?, 
                     ContactDetails = ?, 
                     Role = ?, 
                     ShiftTiming = ?`;
    let params = [Name, ContactDetails, Role, ShiftTiming];
  
    if (Image) {
      sql += `, Image = ?`;
      params.push(Image);
    }
  
    sql += ` WHERE StaffID = ?`;
    params.push(StaffId);
  
    con.query(sql, params, (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({
          Status: "Error",
          Message: "Failed to update Staff",
        });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: "Staff not found",
        });
      }
  
      res.json({
        Status: "Success",
        Message: "Staff updated successfully",
      });
    });
  });
  
  app.put("/api/menu/:id", upload.single("Image"), (req, res) => {
    const MenuId = req.params.id;
    const { Name, Category, Price, Availability,TimesOrdered } = req.body;
    const Image = req.file ? req.file.filename : null;
  
    let sql = `UPDATE Menu
                 SET Name = ?, 
                     Category = ?, 
                     Price = ?, 
                     Availability = ?,
                     TimesOrdered = ?`;
    let params = [Name, Category, Price, Availability,TimesOrdered];
  
    if (Image) {
      sql += `, Image = ?`;
      params.push(Image);
    }
  
    sql += ` WHERE MenuID = ?`;
    params.push(MenuId);
  
    con.query(sql, params, (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({
          Status: "Error",
          Message: "Failed to update Menu",
        });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: "Menu not found",
        });
      }
  
      res.json({
        Status: "Success",
        Message: "Menu updated successfully",
      });
    });
  });
  
  app.get("/api/order/:id", (req, res) => {
    const orderId = req.params.id;
  
    const sql = `
      SELECT 
        o.OrderID,
        c.Name AS CustomerName,
        m.Name AS MenuItemName,
        od.Quantity,
        od.Price AS ItemPrice,
        o.TotalAmount
      FROM 
        orders o
      JOIN 
        customer c ON o.CustomerID = c.CustomerID
      JOIN 
        orderdetails od ON o.OrderID = od.OrderID
      JOIN 
        menu m ON od.MenuID = m.MenuID
      WHERE 
        o.OrderID = ?;
    `;
  
    con.query(sql, [orderId], (err, results) => {
      if (err) {
        console.error("Query error:", err);
        return res.status(500).json({
          Status: "Error",
          Message: "Failed to fetch order details",
        });
      }
  
      if (results.length === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: "Order not found",
        });
      }
  
      // Structure the result for a more readable response
      const orderDetails = {
        OrderID: results[0].OrderID,
        CustomerName: results[0].CustomerName,
        TotalAmount: results[0].TotalAmount,
        Items: results.map(row => ({
          MenuItemName: row.MenuItemName,
          Quantity: row.Quantity,
          ItemPrice: row.ItemPrice,
        })),
      };
  
      res.json({
        Status: "Success",
        OrderDetails: orderDetails,
      });
    });
  });
  

//   app.post('/orders', (req, res) => {
//     const { CustomerID, OrderDate, TotalAmount, OrderType, Status } = req.body;

//     // Insert order details into the orders table
//     const sql = `INSERT INTO orders (CustomerID, OrderDate, TotalAmount, OrderType, Status) VALUES (?, ?, ?, ?, ?)`;
//     const values = [CustomerID, OrderDate, TotalAmount, OrderType, Status];

//     con.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error inserting into orders:', err);
//             return res.status(500).json({ error: 'Failed to add order' });
//         }

//         const orderID = result.insertId; // Get the last inserted OrderID
//         console.log("Received orderID == ", orderID);
        
//         res.json({ status: 'Success', orderID });
//     });
// });

app.post('/orders', (req, res) => {
  // Log request body
  console.log('Request body:', req.body);

  const { CustomerID, OrderDate, TotalAmount, OrderType, Status } = req.body;

  // Validate required fields
  if (!CustomerID || !OrderDate || !TotalAmount || !OrderType || !Status) {
      return res.status(400).json({ 
          error: 'Missing required fields',
          receivedData: req.body 
      });
  }

  const sql = `INSERT INTO orders (CustomerID, OrderDate, TotalAmount, OrderType, Status) 
               VALUES (?, ?, ?, ?, ?)`;
  const values = [CustomerID, OrderDate, TotalAmount, OrderType, Status];

  // Log SQL and values
  console.log('SQL:', sql);
  console.log('Values:', values);

  con.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error inserting into orders:', err);
          return res.status(500).json({ error: 'Failed to add order' });
      }

      // Log entire result object
      console.log('Query result:', result);

      if (!result.insertId) {
          return res.status(500).json({ 
              error: 'No OrderID generated',
              queryResult: result 
          });
      }

      const orderID = result.insertId;
      console.log("Generated OrderID:", orderID);
      
      res.status(200).json({ 
          status: 'Success', 
          OrderID: orderID,  // Changed to match case
          message: 'Order created successfully' 
      });
  });
});

app.post('/orderdetails', (req, res) => {
  console.log("Received body:", req.body); // Log the body
  const { details, OrderID } = req.body; // Include OrderID in the request body

  if (!Array.isArray(details) || details.length === 0 || !OrderID) {
    return res.status(400).json({ error: 'Order details must include valid OrderID and at least one item' });
  }

  // Prepare the query for bulk insert into `orderdetails`
  const insertDetailsSql = 'INSERT INTO orderdetails (OrderID, MenuID, Quantity, Price) VALUES ?';
  const values = details.map(detail => [OrderID, detail.MenuID, detail.Quantity, detail.Price]);

  con.query(insertDetailsSql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting into orderdetails:', err);
      return res.status(500).json({ error: 'Failed to add order details' });
    }

    res.json({ status: 'Success', orderID: OrderID, affectedRows: result.affectedRows });
  });
});


app.post('/placeorder', (req, res) => {
  const { CustomerID, OrderID, OrderType, Status } = req.body;

  // Calculate the total amount from `orderdetails` for the given `OrderID`
  const calculateTotalSql = 'SELECT SUM(Quantity * Price) AS TotalAmount FROM orderdetails WHERE OrderID = ?';

  con.query(calculateTotalSql, [OrderID], (err, result) => {
      if (err) {
          console.error('Error calculating total amount:', err);
          return res.status(500).json({ error: 'Failed to calculate total amount' });
      }

      const TotalAmount = result[0].TotalAmount || 0;

      // Insert the order into the `orders` table
      const insertOrderSql = 'INSERT INTO orders (OrderID, CustomerID, OrderDate, TotalAmount, OrderType, Status) VALUES (?, ?, NOW(), ?, ?, ?)';
      const values = [OrderID, CustomerID, TotalAmount, OrderType, Status];

      con.query(insertOrderSql, values, (err, result) => {
          if (err) {
              console.error('Error inserting into orders:', err);
              return res.status(500).json({ error: 'Failed to place order' });
          }

          res.json({ status: 'Success', message: 'Order placed successfully', orderID: OrderID, totalAmount: TotalAmount });
      });
  });
});


app.delete("/api/order/:id", (req, res) => {
  const { id } = req.params;

  // Delete order items first
  const deleteItemsSql = "DELETE FROM OrderDetails WHERE OrderID = ?";
  con.query(deleteItemsSql, [id], (err, result) => {
    if (err) {
      console.error("Delete order items error:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Failed to delete order items",
      });
    }

    // Delete the order itself
    const deleteOrderSql = "DELETE FROM Orders WHERE OrderID = ?";
    con.query(deleteOrderSql, [id], (err, result) => {
      if (err) {
        console.error("Delete order error:", err);
        return res.status(500).json({
          Status: "Error",
          Message: "Failed to delete the order",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          Status: "Error",
          Message: "Order not found",
        });
      }

      res.json({
        Status: "Success",
        Message: "Order deleted successfully",
      });
    });
  });
});


app.post("/api/reservation", (req, res) => {
  const { CustomerID, ReservationDate, ReservationTime, StaffID, Status } = req.body;

  const sql = `
    INSERT INTO reservation (CustomerID, ReservationDate, ReservationTime, StaffID, Status)
    VALUES (?, ?, ?, ?, ?)`;

  const params = [CustomerID, ReservationDate, ReservationTime, StaffID, Status];

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error inserting reservation:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Failed to add reservation",
      });
    }

    res.status(201).json({
      Status: "Success",
      Message: "Reservation added successfully",
      ReservationID: result.insertId,
    });
  });
});

app.post("/reservation", (req, res) => {
  const { CustomerID, ReservationDate, ReservationTime, Status } = req.body;

  const sql = `
    INSERT INTO reservation (CustomerID, ReservationDate, ReservationTime, Status)
    VALUES (?, ?, ?, ?)`;

  const params = [CustomerID, ReservationDate, ReservationTime, Status];

  con.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error inserting reservation:", err);
      return res.status(500).json({
        Status: "Error",
        Message: "Failed to add reservation",
      });
    }

    res.status(201).json({
      Status: "Success",
      Message: "Reservation added successfully",
      ReservationID: result.insertId,
    });
  });
});

// 1. Statistics Endpoint - Total counts and revenue
app.get('/api/statistics', (req, res) => {
  const statisticsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM orders) as TotalOrders,
      (SELECT COUNT(*) FROM customer) as TotalCustomers,
      (SELECT COUNT(*) FROM reservation) as TotalReservations,
      (SELECT COALESCE(SUM(TotalAmount), 0) FROM orders) as TotalRevenue
  `;

  con.query(statisticsQuery, (err, result) => {
    if (err) {
      console.error('Error fetching statistics:', err);
      return res.status(500).json({ error: 'Failed to fetch statistics' });
    }
    res.json({
      Status: "Success",
      Statistics: result[0]
    });
  });
});

// 2. Recent Orders with Customer Details
app.get('/api/complex-orders', (req, res) => {
  const recentOrdersQuery =  `SELECT o.OrderID, c.Name as CustomerName, COUNT(od.MenuID) as ItemCount,
   o.TotalAmount, o.Status, o.OrderDate 
   FROM orders o 
   JOIN customer c ON
   o.CustomerID = c.CustomerID
   LEFT JOIN orderdetails od ON o.OrderID = od.OrderID
    GROUP BY o.OrderID, c.Name, o.TotalAmount, o.Status, o.OrderDate
     ORDER BY o.OrderDate DESC LIMIT 10` ;
  
  con.query(recentOrdersQuery, (err, result) => {
  if (err) {
  console.error('Error fetching recent orders:', err);
  return res.status(500).json({ error: 'Failed to fetch recent orders' });
  }
  res.json(result);
  });
  });

// 3. High Value Customers
app.get('/api/high-value-customers', (req, res) => {
  const highValueQuery =  `SELECT c.CustomerID, c.Name, c.TotalSpending,
   COUNT(o.OrderID) as OrderCount 
   FROM customer c 
   LEFT JOIN orders o 
   ON c.CustomerID = o.CustomerID
   GROUP BY c.CustomerID, c.Name 
   HAVING c.TotalSpending > 500 
   ORDER BY c.TotalSpending DESC LIMIT 5` ;
  
  con.query(highValueQuery, (err, result) => {
  if (err) {
  console.error('Error fetching high value customers:', err);
  return res.status(500).json({ error: 'Failed to fetch customer data' });
  }
  res.json(result);
  });
  });

// 4. Detailed Order Statistics
app.get('/api/order-statistics', (req, res) => {
  const orderStatsQuery =  `SELECT COUNT(*) as TotalOrders,
   COALESCE(AVG(TotalAmount), 0) as AverageOrderValue,
    COALESCE(MAX(TotalAmount), 0) as HighestOrder,
     COALESCE(MIN(TotalAmount), 0) as LowestOrder,
      COALESCE(SUM(TotalAmount), 0) as TotalRevenue
       FROM orders WHERE Status = 'Completed' `;
  
  con.query(orderStatsQuery, (err, result) => {
  if (err) {
  console.error('Error fetching order statistics:', err);
  return res.status(500).json({ error: 'Failed to fetch order statistics' });
  }
  res.json({
  Status: "Success",
  Statistics: result[0]
  });
  });
  });

// 5. Reservation Count
app.get('/api/reservation-count', (req, res) => {
  const reservationQuery = `
    SELECT COUNT(*) as TotalReservations
    FROM reservation
    WHERE Status = 'Confirmed'
  `;

  con.query(reservationQuery, (err, result) => {
    if (err) {
      console.error('Error fetching reservation count:', err);
      return res.status(500).json({ error: 'Failed to fetch reservation count' });
    }
    res.json({
      Status: "Success",
      Count: result[0].TotalReservations
    });
  });
});

// 6. Today's Orders
app.get('/api/today-orders', (req, res) => {
  const todayOrdersQuery = `
    SELECT 
      COUNT(*) as TodayOrderCount,
      COALESCE(SUM(TotalAmount), 0) as TodayRevenue
    FROM orders
    WHERE DATE(OrderDate) = CURDATE()
  `;

  con.query(todayOrdersQuery, (err, result) => {
    if (err) {
      console.error('Error fetching today\'s orders:', err);
      return res.status(500).json({ error: 'Failed to fetch today\'s orders' });
    }
    res.json({
      Status: "Success",
      Statistics: result[0]
    });
  });
});