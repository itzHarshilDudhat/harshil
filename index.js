require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const allRoutes = require("./routes/index");
app.use(express.json());

//DB connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("Database connected");
});
//All the routes
app.use("/", allRoutes);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on\nhttp://localhost:${PORT}`);
});
