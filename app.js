const express = require("express");
const path = require("path");
const partRoutes = require("./partRoutes");

// Create express application
const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use("/public", express.static("public"));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(partRoutes);

app.listen(3000, () => {
  console.log("Server started and listening at http://localhost:3000");
});
