var express = require('express'), app = express();
var path = require('path');

//app.sets

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app.gets

app.get('/',function(req,res){
    res.render('index');
})

//app.uses

app.use(require('./controllers/controller'));

app.listen(3000,function(){
    console.log("Server running on port 3000");
})