var express = require('express');
var router = express();
var measureModel = require('../models/measure.js');
var json2xls = require('json2xls');
var fs = require('fs');

router.get('/', function(req, res) {
    console.log("Resquest to / recieved from: " + req.header('x-forwarded-for'));
    res.send('Server running');
});

router.get('/write', function(req, res) {
    //get auth
    if (req.get('Authorization') == process.env.AUTH) {
        console.log("Resquest recieved from: " + req.header('x-forwarded-for'));
        console.log("params: ", req.query);
        measureSchema = req.query;
        measureSchema.timestamp = new Date();
        console.log("measureSchema: ", measureSchema);
        var measure = new measureModel(measureSchema);
        measure.save().then(function() {
                console.log('Measure created');
                res.status(200);
                res.send('OK');
            })
            .catch(function(err) {
                // just need one of these
                console.log('error:', err);
                res.status(500);
                res.send('Error saving data on db');
            });
    } else {
        console.log("Authorization failed from: " + req.header('x-forwarded-for'));
        res.status(500);
        res.send('Authorization failed');
    }
});

router.get('/getXls', function(req, res) {
    console.log('getXls');
    measureModel.find().then(function(data) {
            var xls = json2xls(data, {
                fields: ['simId', 'temperature', 'timestamp']
            });
            fs.writeFileSync('data.xlsx', xls, 'binary');
            res.status(200);
            res.download('data.xlsx');
        })
        .catch(function(err) {
            // just need one of these
            console.log('error:', err);
            res.status(500);
        });

});

router.get('/lastPing', function(req, res) {
    console.log('lastPing');
    measureModel.findOne()
        .sort({ timestamp: -1 })
        .then(function(data) {
            console.log(data);
            res.send(data);
        })
        .catch(function(err) {
            console.log('error:', err);
            res.status(500);
        })
})

module.exports = router;
