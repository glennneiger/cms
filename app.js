var express = require('express'), app = express();
var bodyParser = require('body-parser');
var path = require('path');

//app.sets

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//app.uses

app.use(require('./controllers'));

app.listen(3000,function(){
    console.log("Server running on port 3000");
})