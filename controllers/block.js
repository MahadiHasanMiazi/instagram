var express = require('express');
var bodyParser = require('body-parser'); //new--arefin
var router = express.Router();
var blockModel = require.main.require('./models/block');
var profileModel = require.main.require('./models/profile');
var friendsModel = require.main.require('./models/friends');
module.exports = router;

router.get('/block/:id', function(req, res) {
  var user = req.session.loggedUser;

  var idFromUrl = {
        id: req.params.id
    };

if(req.session.loggedUser){
             blockModel.insert(user, idFromUrl, function(result){
   
                res.redirect('http://localhost:8000/profile/'+user.id);

    });
     }else{
     	res.redirect('/login');
     }  
   
});

router.get('/block/unblock/:id', function(req, res) {
  var user = req.session.loggedUser;

  var idFromUrl = {
        id: req.params.id
    };

if(req.session.loggedUser){
             blockModel.delete(user, idFromUrl, function(result){
   

                res.redirect('http://localhost:8000/profile/'+user.id);


    });
     }else{
        res.redirect('/login');
     }  
   
});