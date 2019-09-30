var express = require('express');
var bodyParser = require('body-parser'); //new--arefin
var router = express.Router();

var profileModel = require.main.require('./models/profile');
var error="";


router.get('/accounts/edit', function(req, res){
    var user = req.session.loggedUser;
    res.render('profile/editProfile', {user: user});

});
//Pass Change Get--new
router.get('/accounts/passChange', function(req, res){
    var user = req.session.loggedUser;
    res.render('profile/passChange', {user: user,error:error});

});



router.post('/accounts/edit', function(req, res){
    var loguser = req.session.loggedUser;

    var user = {
        id: loguser.id,
        name: req.body.name,
        email: req.body.email,
        about: req.body.about //new
    };

    profileModel.update(user, function(result){
        profileModel.get(user, function(result2){
            console.log(result2);
            req.session.loggedUser = result2;
            res.redirect('/profile/'+result2.id);
        });
    });
});

//Pass Change Post---new 42-64
router.post('/accounts/passChange', function(req, res){
    var loguser = req.session.loggedUser;

    var user = {
        id: loguser.id,
        pass:  req.body.password,
        oldPass: req.body.oldPassword,
        newPass: req.body.newPassword,
        confirmPass: req.body.confirmPassword
    };
    console.log(user);
   profileModel.updatePaswwrod(user, function(result){
     //console.log(result);
        profileModel.get(user, function(result2){
           // console.log(result2);
            req.session.loggedUser = result2;
            res.redirect('/profile/'+result2.id);
        });
    });


});


module.exports = router;