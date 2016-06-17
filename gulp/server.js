var express = require('express');
var app = express();
var gulp = require('gulp');
var path = require('path');

gulp.task('default', function(arg) {

});

app.set('views', 'app');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join('./', 'app')));
// set the view engine to ejs
app.set('view engine', 'html');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('app/buy');
});


app.listen(8000);