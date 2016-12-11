var express = require('express');
var AllowCrossDomain = require('./allowCrossDomain');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./routes/route');
var mongoose = require('mongoose');

//Allow cors
app.use(AllowCrossDomain.allowCrossDomain);

// Add routes 
app.use('/', routes);

mongoose.connect(process.env.MONGODB_URI, function (error) {
    if (error) console.error(error);
    else console.log('Mongo connected');
});

var server = app.listen(port, function() {
    var port = server.address().port
    console.log("App listening at http://localhost:%s", port)
})
