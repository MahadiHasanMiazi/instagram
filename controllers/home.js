var express = require('express');
var router = express.Router();
var fs = require('fs');
const translate = require('translate-api');
var homeModel = require.main.require('./models/home');
var reactModel = require.main.require('./models/react');



router.get('/home', function(req, res){

    if(req.session.loggedUser){

        var user = req.session.loggedUser;

        homeModel.getAll(user, function(result){

            homeModel.getAllComment(function (result2) {

                reactModel.getReactsByUserId(user,function (result3) {

                    reactModel.getAllReact(function (result4) {

                        homeModel.getAllUsers(function (result5) {
                            res.render('home/home', {
                                post: result,
                                comment: result2,
                                react : result3,
                                user: user,
                                allReact: result4,
                                allUsers : result5
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


router.post('/home', function(req, res) {

        var user = req.session.loggedUser;
        var sessionID= user.id;
        var fileName= new Date().getTime() + Math.random();


        // file move

    if (!req.files)

        return res.status(400).send('No files were uploaded.');
        var postImage = req.files.postImage;
         postImage.mv('public/assets/images/post/'+fileName+'.jpg', function(err) {

        if (err)
            return res.status(500).send(err);

    });

         // dbupdate

    var post = {
        postTime: new Date().toLocaleString(),
        caption: req.body.caption,
        userId: sessionID,
        image: '/assets/images/post/'+fileName+'.jpg',
    };

    homeModel.insert(post, function(result){
        res.redirect('/home');
    });

});

router.post('/home/postEdit',function (req ,res) {
   var editPost = {
       post_caption: req.body.editedCaption,
       post_time: new Date().toLocaleString(),
       post_id: req.body.post_id

   };

   homeModel.updatePost(editPost,function (result) {
       res.redirect('/home');
   });

});

router.post('/home/deletePost/',function (req ,res) {

        var postDelete ={
            post_id: req.body.post_id
        };

        fs.unlink('./public/'+req.body.image_id,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
        });


        homeModel.deletePost(postDelete,function (result) {
            res.redirect('/home');
        });

});


router.get('/home/translate/:caption', function(req, res){
       var caption = req.params.caption;

    translate.getText(caption,{to: 'en'}).then(function(text){
        res.send(text.text);
    });
});


module.exports = router;