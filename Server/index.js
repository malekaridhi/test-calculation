const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const calcRoute = require("./routes/montantEmprunte");

require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/",calcRoute)
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => console.log(`server is running on port : ${PORT}`));
