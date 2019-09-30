var express = require('express');
var router = express.Router();
var homeModel = require.main.require('./models/home');
var reactModel = require.main.require('./models/react');

router.get('/post/:post_id', function(req, res){

    var post_id=req.params.post_id;

    if(req.session.loggedUser){

        var user = req.session.loggedUser;

        homeModel.getAll(user, function(result){

            homeModel.getAllComment(function (result2) {

                reactModel.getReactsByUserId(user,function (result3) {

                    reactModel.getAllReact(function (result4) {

                        homeModel.getAllUsers(function (result5) {
                            res.render('post/post', {
                                post: result,
                                comment: result2,
                                react : result3,
                                user: user,
                                allReact: result4,
                                allUsers : result5,
                                post_id: post_id
                            });
                        });
                    });
                });
            });
        });

    }else{
        res.redirect('/login');
    }


});


module.exports = router;