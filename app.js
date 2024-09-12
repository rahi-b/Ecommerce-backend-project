const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/Authroute");
const homeRouter= require("./routes/homeroute");
const { notfound, errorhandler } = require("./middlware/errorhandler");
const MONGOURL = process.env.MONGO_URI;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.static("public/User"));
app.use(express.static("public/admin"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(homeRouter);
app.use("/api/authroute", authRouter);

app.use(notfound), app.use(errorhandler);

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`mongodb connection succesfull`);
    app.listen(PORT, () => {
      console.log(`server is running http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
