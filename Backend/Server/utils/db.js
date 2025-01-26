import mysql2 from 'mysql2'; 

const con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "ROOT#passw0rd",
    database: "restaurant",
});

con.connect(function(err) {
    if (err) {
        console.log("Database Connection Error", err.message);
    } else {
        console.log("Connected to Database Successfully");
    }
});

export default con;