var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./routes/route');
var mongoose = require('mongoose');

// Add routes 
app.use('/', routes);

mongoose.connect(process.env.MONGOLAB_URI|| "mongodb://example:example@ds119578.mlab.com:19578/heroku_9cwhf02h", function (error) {
    if (error) console.error(error);
    else console.log('Mongo connected');
});

var server = app.listen(port, function() {
    var port = server.address().port
    console.log("App listening at http://localhost:%s", port)
})
