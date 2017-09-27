var config  = require('./config');
var require = require('mongoose');
var express = require('express');
var app     = express();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
mongoose.connect(config.getDbConnectionString());
app.listen(port);
