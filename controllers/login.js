var express = require('express');
var router = express.Router();




var loginModel = require.main.require('./models/login');
var friendsModel = require.main.require('./models/friends');

router.get('/login', function (req, res){

   if(req.session.loggedUser){
       res.redirect('/home');
   }else{
       res.render('login/login', {message: ''});
   }
});


router.post('/login', function (req, res){

    var user = {
        email: req.body.email,
        password: req.body.password,
        status:1
    };

    loginModel.verifyUser(user, function(valid,result){
        if(valid)
        {

            if(result[0].status==0){
                 res.render('login/login', {message: ' Sorry! This account is disable'});

            }else{


            //set cookie

            res.cookie("mail", user.email);


            user.name = result[0].name;
            user.email = result[0].email;
            user.imagePath = result[0].imagePath;
            user.about = result[0].about;
            user.id =result[0].id;

            req.session.loggedUser = user;

            friendsModel.updateOnlineStatus(user.id, "true");


            res.redirect('/home');
        }
        }
        else
        {
            res.render('login/login', {message: 'Invalid username or password'});
        }
    });

});

module.exports = router;