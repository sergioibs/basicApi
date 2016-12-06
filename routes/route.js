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
        });
});

router.get('/getXls', function(req, res) {
    console.log('getXls');
    measureModel.find().then(function(data) {
            var xls = json2xls(data, {
                fields: ['simId','temperature','timestamp']
            });
            fs.writeFileSync('data.xlsx', xls, 'binary');
            res.status(200);
            res.download('data.xlsx');
        })
        .catch(function(err) {
            // just need one of these
            console.log('error:', err);
        });

});

module.exports = router;
