const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const uploadRoute = require("./routes/uploadFile");
const getFileRoute = require("./routes/getFile");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/uploadFile", uploadRoute);
app.use("/api/getFile", getFileRoute);

module.exports = app;
