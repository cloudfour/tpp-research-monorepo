var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/public')); // ← adjust
app.listen(3000, function() { console.log('listening'); });
