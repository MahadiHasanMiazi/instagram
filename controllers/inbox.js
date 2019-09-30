var express = require('express');
var router = express.Router();

var friendsModel = require.main.require('./models/friends');
var profileModel = require.main.require('./models/profile');
var inboxModel = require.main.require('./models/inbox');

router.get('/inbox', function(req, res){

    if(req.session.loggedUser){

        var user = req.session.loggedUser;

        friendsModel.getAll(user, function (result) {
            // res.render('inbox/inbox', {
            //     friends: result,
            //     user: user,
            //     friend: {imagePath: ''}
            // });
            //console.log(result[0].id);
            if(result[0]){
                res.redirect('/inbox/'+result[0].id);

            }else {
                res.redirect('/home');
            }

        });

    }else {
        res.redirect('/login');
    }

});

router.get('/inbox/:id', function(req, res){

    var idFromUrl = {
        id: req.params.id
    };

    if(req.session.loggedUser){

        var user = req.session.loggedUser;

        profileModel.get(idFromUrl, function (result2) {

            friendsModel.resetNewMessage(user, result2, function (msg) {

            });

            friendsModel.getAll(user, function (result) {
                var person1 = {
                    sender: user.id,
                    receiver: idFromUrl.id
                };

                var person2 = {
                    sender: idFromUrl.id,
                    receiver: user.id
                };

                inboxModel.getConversation(person1, person2, function (result3) {
                    res.render('inbox/inbox', {
                        friends: result,
                        user: user,
                        friend: result2,
                        conversation: result3
                    });
                });
            });
        });


    }else {
        res.redirect('/login');
    }

});

module.exports = router;