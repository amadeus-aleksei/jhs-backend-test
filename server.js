const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");
const Property = require("./models/Property");
const https = require("https")
const fs = require("fs")

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 443; // Use HTTPS port inside the container

const sslOptions = {
  key: fs.readFileSync("/app/certificates/key.pem"),
  cert: fs.readFileSync("/app/certificates/cert.pem"),
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    // Test raw SQL query
    return sequelize.query("SELECT * FROM Properties", { type: sequelize.QueryTypes.SELECT });
  })
  .then(result => {
    console.log('Test query result:', result);
  })
  .catch(err => console.error('Connection error:', err));

// Sync models
sequelize.sync({ force: false })
  .then(() => console.log('Models synced'))
  .catch(err => console.error('Model sync error:', err));

// Routes
app.use('/api/properties', require('./routes/properties'));

// Start HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Secure HTTPS Server running on port ${PORT}`);
});