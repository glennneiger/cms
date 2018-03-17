var express = require('express');
var router = express.Router();

router.post('/user/login',function(req,res){

    // var config = { url: 'ldap://209.20.8.253',
    //     baseDN: 'dc=TLABS,dc=ca',
    //     username: 't927709@TLABS.ca',
    //     password: '' }
    //
    // var ad = new ActiveDirectory(config);
    //
    // var username = req.body.username;
    // var password = req.body.password;
    //
    // ad.authenticate(username+"@tlabs.ca",password,function(err, auth) {
    //     if (err) {
    //         console.log('ERROR: '+JSON.stringify(err));
    //         return;
    //     }
    //
    //     if (auth) {
    //         console.log(username + ' has been authenticated.');
    //         req.session.username = username;
    //         req.session.password = password
    //         console.log(req.session);
    res.render('dashboard',{
        title:"Index",
    });
    //        }
    //     else {
    //         console.log('Authentication failed!');
    //     }
    // });
})

router.get('/logout', function(req,res){
    //req.session.destroy();

    //res.render('login');
})

module.exports = router