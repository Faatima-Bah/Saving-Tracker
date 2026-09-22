const express = require("express");
const cors = require("cors");
require("dotenv").config();

//import the pool
const db = require("./db");

//Middleware - Starting the server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//Test route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Saving Tracker API");
});

//Test database connection
app.get ("/db-test", async(req, res) => {
    try {
        const [tables] = await db.query("SHOW TABLES")
        res.status(200).json({
            message: "Database connected successfully",
            tables: tables
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

//Start the server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});