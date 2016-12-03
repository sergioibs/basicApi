var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
	console.log("Resquest recieved from: "+ req.header('x-forwarded-for'));
	console.log("params: ", req.query);
   res.send('Hello World');
})

var server = app.listen(port, function () {
   var port = server.address().port
   
   console.log("Example app listening at http://localhost:%s", host, port)
})