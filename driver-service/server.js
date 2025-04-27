const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const driverRoutes = require("./routes/driverRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
  res.send("Driver API is Running");
});

//driver start server route
app.use("/driver", driverRoutes);

const PORT = process.env.PORT || 5010;
app.listen(PORT, console.log(`Driver Server Started on port ${PORT}..`));
