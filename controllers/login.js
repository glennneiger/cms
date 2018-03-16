var express = require('express');
var router = express.Router();

router.post('/user/login',function(req,res){

    res.render('dashboard',{
        title:"Index",
    });

})

router.get('/logout', function(req,res){

    res.render('login');
})

module.exports = router