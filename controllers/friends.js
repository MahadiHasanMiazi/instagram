var express = require('express');
var bodyParser = require('body-parser'); //new--arefin
var router = express.Router();
var friendsModel = require.main.require('./models/friends');

router.get('/friends/add/:id', function(req, res){

    
    var friendId = {
        id: req.params.id,
        
    };
  
   
    if(req.session.loggedUser){

        var user = req.session.loggedUser;

            friendsModel.insert(user, friendId, function(result){
            res.redirect('http://localhost:8000/profile/'+friendId.id);
        
   });
       

    }else {
        res.redirect('/login');
    }
});

router.get('/friends/remove/:id', function(req, res){


    var friendId = {
        id: req.params.id
    };

    if(req.session.loggedUser){

        var user = req.session.loggedUser;

        friendsModel.delete(user, friendId, function(result){
            res.redirect('http://localhost:8000/profile/'+friendId.id);
        });

    }else {
        res.redirect('/login');
    }
});




module.exports = router;