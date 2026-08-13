const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Routes


// Root route
app.get("/", (req, res) => {
  res.json({
    message: "My Express API is running!"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});