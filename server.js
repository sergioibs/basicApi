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
})

mongoose.connect(process.env.MONGOLAB_URI|| "mongodb://example:example@ds119578.mlab.com:19578/heroku_9cwhf02h", function (error) {
    if (error) console.error(error);
    else console.log('Mongo connected');
});

var server = app.listen(port, function() {
    var port = server.address().port
    console.log("App listening at http://localhost:%s", port)
})
