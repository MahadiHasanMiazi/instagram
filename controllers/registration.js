var express = require('express');
var router = express.Router();

var registrationModel = require.main.require('./models/registration');

router.get('/registration', function (req, res){
    res.render('registration/registration', {message: ''});
});


router.post('/registration', function (req, res){
    var user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        status: 1
    };
    registrationModel.registerUser(user, function(valid,result){
        if(valid)
        {
            res.redirect('/login');
        }
        else
        {
            res.render('registration/registration', {message: 'Invalid username or password'});
        }
    });

});

module.exports = router;