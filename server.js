var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var measureModel = require('./models/measure.js');
var mongoose = require('mongoose');

app.get('/', function(req, res) {
    console.log("Resquest to / recieved from: " + req.header('x-forwarded-for'));
    res.send('Server running');
})

app.get('/write', function(req, res) {
    console.log("Resquest recieved from: " + req.header('x-forwarded-for'));
    console.log("params: ", req.query);
 	var measure = new measureModel( req.query );
    measure.save(function(err) {
        if (!err) {
            console.log('Measure created');
            res.status(200);
            res.send('OK');
        } else {
            console.log('ERROR: ' + err);
            res.status(500);
            res.send('ERROR');
        }
    });
    res.send('Hello World');
})

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var server = app.listen(port, function() {
    var port = server.address().port
    console.log("App listening at http://localhost:%s", port)
})
