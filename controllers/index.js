var express = require('express');
var router = express.Router();


router.use(require('./login.js'));

//all login/logout requests are directed into session.js
router.use(require('./session.js'));

//all user account information requests are directed into user.js
router.use(require('./user.js'));

router.get('/',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('login')
    // }
    res.render('dashboard');
});

router.get('/dashboard', function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.status(401).send();
    // }
    res.render('dashboard');
});

module.exports = router