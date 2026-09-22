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

// Get all savings goals
app.get ("/goals", async(req,res) =>{
    try {
        const [goals] = await db.query(
            "SELECT * FROM savings_goals"
        );
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error fetching goals:", error);

        res.status(500).json({
            message: "Unable to fetch savings goals"
        });
    }
});

// Create a new user
app.post("/users", async(req,res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }
    try {
        const [result] = await db.query(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [name,email]
        );
        res.status(201).json({
            message: "User created successfully",
            user: {
                user_id: result.insertId,
                name: name,
                email: email
            }
        });
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({
            message: "Unable to create user"
        });
    }
});

//Create a saving goal
app.post("/goals", async(req,res) => {
    const { user_id, goal_name, target_amount, deadline } = req.body;
    if (!user_id || !goal_name || !target_amount) {
        return res.status(400).json({
            message: "User ID, goal name and target amount are required"
        });
    }
    try {
        const [result] = await db.query(
            `INSERT INTO savings_goals
            (user_id, goal_name, target_amount, deadline)
            VALUES (?, ?, ?, ?)`,
            [user_id, goal_name, target_amount, deadline]
        );
        res.status(201).json({
            message: "Savings goal created successfully",
            goal: {
                goal_id: result.insertId,
                user_id,
                goal_name,
                target_amount,
                deadline,
                status: "In Progress"
            }
        });
    } catch(error) {
        console.error("Error creating savings goal:", error);
        res.status(500).json({
            message: "Unable to create savings goal"
        });
    }
});

//Start the server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});