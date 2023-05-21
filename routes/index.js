const express = require("express");
const app = express.Router();

const userpage = require("./userpage.router");
const dampak = require("./dampak");
const pencegahan = require("./pencegahan");
const auth = require("./auth.routes");
const userprofile = require("./userprofile");

app.use("/", userpage);
// app.use("/", dampak)
// app.use("/", pencegahan)
app.use("/", auth);
app.use("/", userprofile);

module.exports = app;
