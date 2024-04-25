const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

// // Routers
// const mapRouter = require("./routes/MapRouter");

// Create an Express application
const app = express();

// Use CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse JSON bodies in incoming requests
app.use(express.json({ limit: '10mb' }));

// Middleware to parse URL-encoded bodies in incoming requests
app.use(express.urlencoded());

// // Routes
// app.use("/",mapRouter);

// Define a port for the server to listen on
const PORT = process.env.PORT || 5000

// MongoDB connection string
const DB_CONNECTION_STRING = "mongodb+srv://dbrootadmin:dbpassword@cluster0.o0ag19w.mongodb.net/PlateUpMapSeeds?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(DB_CONNECTION_STRING, {
}).then(() => {
    console.log("Successfully connected to the MongoDB Server: " + DB_CONNECTION_STRING);    
}).catch(err => {
    console.log('Could not connect to the MongoDB Server. Exiting now...', err);
    process.exit();
});

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Im in server.js')
})

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});