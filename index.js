var express = require('express');
var api = require('./api.js')
var app = express();
const axios = require('axios');
var cors = require('cors');
var fs =require('fs');
var path = require('path');
app.use(cors({ origin: 'null' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));
port = 8001

app.listen(port);
console.log("App listining on Port => ", port)

app.get('/', function (req, res) {
    fs.readFile(__dirname + "/index.html", "utf-8", (error, pgResp) => {
        if (error) {
            res.status(500).send("Something went wrong");
        } else {
            res.status(200).send(pgResp);
        }
    //res.send("Go Home!");
    })
});

app.post('/createorg', function (req, res) {
    resp = api.createOrg(req);
    res.send(resp);
});

app.post('/verifyusers', function (req, res) {
    res.send("Verifying Users!");
});

app.post('/listusers', function (req, res) {
    res.send("Listing Users!");
});

app.post('/listorgs', function (req, res) {
    res.send("Listing Organisations");
});