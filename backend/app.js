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
})

//Start the server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});