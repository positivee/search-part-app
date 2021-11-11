// Load modules
const express = require("express");
const path = require("path");
const partRoutes = require("./partRoutes");

// Create express application
const app = express();
app.use(express.urlencoded());
app.use(express.json());

// Listen on port 3000 for connections
app.listen(3000, () => {
  console.log("Server started and listening at http://localhost:3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(partRoutes);
