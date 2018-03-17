var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('superagent');
var Promise = require('promise');
var session = require('express-session');
var ActiveDirectory = require('activedirectory');

//less redundant way of generating js request-promises
var userListReqProm = require('request-promise');
var boardListReqProm = require('request-promise');
var compListReqProm = require('request-promise');

var jiraTrbTickReqProm = require('request-promise');

const hTag = "##";
const newL = "\n";

const  jiraUser = "";
const  jiraPass = "";


//this file contains all the routes for incoming ticket get/post requests

//jira requests below

router.get('/request/service/jira/newtroubleticketreq',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }

    res.render('newtroubleticket_jira')
});
router.post('/request/service/jira/newtroubleticketreq',function(req,res){
    const projId = 14674;
    const tickType = 11423;

    var payLoad = JSON.stringify({
        "fields": {
            "project": {"id": projId},
            "summary": "Trouble Ticket; " + req.body.summary,
            "issuetype": {"id": tickType},
            "description": req.body.detailDesc,
            "duedate" : req.body.dueDate,
            "customfield_10810" : req.body.wbsCode,
            "customfield_12716" : {"id": req.body.workQ}

        }
    })

    var options = {
        method: 'POST',
        uri: '',
        headers: {
            'accept': 'application/json',
            'accept-encoding': 'gzip/deflate',
            'content-Type': 'application/json',
            'User-Agent': 'Request-Promise',
            'Authorization':'Basic ' + new Buffer(jiraUser + ':' + jiraPass).toString('base64')
        },
        body : payLoad,
        rejectUnauthorized : false
    };

})

router.get('/request/service/jira/newinstallreq',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }

    res.render('newjiraticket');

});
router.post('/request/service/jira/newinstallreq',function(req,res){

    var summary = req.body.summary;

    var description = JSON.stringify(req.body);


    var payLoad = JSON.stringify({
        "fields": {
            "project": {"id": "14674"},
            "summary": "New Install Request; " + summary,
            "issuetype": {"id": "11423"},
            "description": description
        }
    })

    console.log(payLoad);

    var options = {
        method: 'POST',
        uri: '',
        headers: {
            'accept': 'application/json',
            'accept-encoding': 'gzip/deflate',
            'content-Type': 'application/json',
            'User-Agent': 'Request-Promise',
            'Authorization':'Basic ' + new Buffer(jiraUser + ':' + jiraPass).toString('base64')
        },
        body : payLoad,
        rejectUnauthorized : false
    };

    jiraTrbTickReqProm(options)
        .then(function (body) {
            console.log(JSON.stringify(body));
        })
        .catch(function (err) {
            console.log(err);
        });
});

router.get('/request/service/jira/newvmreq',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }

    res.render('newvmreq_jira')
});
router.post('/request/service/jira/newvmreq',function(req,res){});

router.get('/request/service/jira/newsimreq',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
});
router.post('/request/service/jira/newsimreq',function(req,res){});

router.get('/request/service/jira/newvmreq',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
});
router.post('/request/service/jira/newvmreq',function(req,res){});

router.get('/request/service/jira/newvpnreq',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
});
router.post('/request/service/jira/newvpnreq',function(req,res){});

router.get('/request/service/jira/newfwreq',function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
});
router.post('/request/service/jira/newfwreq',function(req,res){});

//connectwise requests below

router.get('/request/service/newfirewallreq', function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
    res.render('newfwreq');
});
router.post('/request/service/newfirewallreq', function(req,res){});

router.get('/request/service/newticketreq', function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }

    var username = '';
    var password = '';

    //promise to generate user list
    var ticketList = {
        method: 'GET',
        uri: 'https://cwtest.teluslabs.net/v4_6_release/apis/3.0/service/tickets',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization':'Basic ' + new Buffer('username' + ':' + 'key').toString('base64')
        },
        json: true // Automatically parses the JSON string in the response
    }

    //promise to generate ticket list set
    var userList = {
        uri: 'https://cwtest.teluslabs.net/v4_6_release/apis/3.0/company/contacts?fields=id,firstname,lastname,?pageSize=100',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization':'Basic ' + new Buffer('username' + ':' + 'key').toString('base64')
        },
        json: true // Automatically parses the JSON string in the response
    }

    var boardList = {
        uri: 'https://cwtest.teluslabs.net/v4_6_release/apis/3.0/service/boards?pageSize=100',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization':'Basic ' + new Buffer('username' + ':' + 'key').toString('base64')
        },
        json: true // Automatically parses the JSON string in the response
    }

    var companyList = {
        uri: 'apiuriwewantohit',
        headers: {
            'User-Agent': 'Request-Promise',
            'Authorization':'Basic ' + new Buffer('username' + ':' + 'key').toString('base64')
        },
        json: true // Automatically parses the JSON string in the response
    }


    Promise.all([userListReqProm(userList),boardListReqProm(boardList),compListReqProm(companyList)]).then(function(result){

        res.render('newticket',{
            userlist:result[0],
            //ticketlist:result[1],
            boardlist: result[1],
            companylist: result[2]
        });
    })
});
router.post('/request/service/newticketreq', function(req,res){
    var username = '';
    var password = '';
    var addTicket = new XMLHttpRequest();

    var payLoad = JSON.stringify({
        project:    {name:req.body.projectName},
        summary:    "Trouble Ticket; " + req.body.summary.toString() + " ; " + req.body.workQ.toString(),
        board:      {id: "1"},
        //requiredDate:    req.body.dueDate.toDate(),
        priority:   {name: req.body.priority},
        //detailDesc: req.body.detailDesc,
        company:    {id: req.body.company},
        contact:    {id: req.body.contact},
        initialDescription :
            (
            hTag + " Project Name:" +
            newL + req.body.projectName +
                newL +
            newL + hTag + " WBS Code: " +
            newL + req.body.wbsCode +
                newL +
            newL + hTag + " Detailed Description: " +
            newL + req.body.detailDesc
            ).toString(),
        customFields: [{id: "4",caption: "Work Queue",type: "Text",entryMethod: "List",numberOfDecimals: "0",value: req.body.workQ}]
    });

    console.log(payLoad.summary);

    addTicket.open('POST',encodeURI(''));
    addTicket.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    addTicket.setRequestHeader('Authorization','Basic ' + new Buffer('username' + ':' + 'uri').toString('base64'));
    addTicket.send(payLoad);

    addTicket.onreadystatechange = function(){

        if(addTicket.readyState == 4){
            var content = addTicket.responseText;
            //console.log(JSON.parse(content));
            res.render('newticket_complete', {
                content:JSON.parse(content)

            })
        }
    }


});

router.get('/request/service/newinstallreq', function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
    res.render('newinstall');
});
router.post('/request/service/newinstallreq', function(req,res){
    var username = '';
    var password = '';
    var addTicket = new XMLHttpRequest();

    var payLoad = JSON.stringify({
        project:    {name:req.body.projectName},
        summary:    req.body.summary.toString(),
        board:      {id: req.body.boardid},
        //requiredDate:    req.body.dueDate.toDate(),
        priority:   {name: req.body.priority},
        //detailDesc: req.body.detailDesc,
        company:    {id: req.body.company},
        contact:    {id: req.body.contact},
        customFields: [{id: "4",caption: "Work Queue",type: "Text",entryMethod: "List",numberOfDecimals: "0",value: req.body.workQ}]
    });
});

router.get('/request/service/newvmreq', function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
    res.render('newvm');
});
router.post('/request/service/newvmreq', function(req,res){});

router.get('/request/service/newsimreq', function(req,res){
    // if(!req.session.username && !req.session.password){
    //     return res.render('errors/401');
    // }
    res.render('newsim');
});
router.post('/request/service/newsimreq', function(req,res){});

router.get('/request/service/newvpnreq', function(req,res){
    if(!req.session.username && !req.session.password){
        return res.render('errors/401');
    }
    res.render('newvpn');
});
router.post('/request/service/newvpnreq', function(req,res){});


//used for testing

router.get('/request/service/getticket', function(req,res){
    res.render('getticket');
});
router.post('/request/service/getticket', function(req,res){
    var getTicket = new XMLHttpRequest();
    var ticketId = req.body.ticketid;
    var content;

    var username = '';
    var password = '';

    //call back function renders the response view
    getTicket.onreadystatechange = function(){
        if(getTicket.readyState == 4){
            //console.log(content);
            var text = '';
            var content = JSON.parse(getTicket.responseText);
            //console.log(content);
            res.render('ticketinfo',{
                content:content
            });
        }
    }

    getTicket.open('GET',encodeURI('uritohit'+ticketId), true);
    getTicket.setRequestHeader('Authorization','Basic ' + new Buffer(username + ':' + password).toString('base64'));
    getTicket.responseType = "json";
    getTicket.send();

});
router.get('/showticket', function(req,res){
    res.render('ticketinfo',{
        content:"Content"
    });
});

module.exports = router
