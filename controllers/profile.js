var express = require('express');
var router = express.Router();
var fs = require('fs');

var profileModel = require.main.require('./models/profile');
var friendsModel = require.main.require('./models/friends');
var blockModel = require.main.require('./models/block');

router.get('/profile/:id', function(req, res){

var idFromUrl = {
        id: req.params.id
    };

profileModel.get(idFromUrl,function (result) {
   if(result){
       if(req.session.loggedUser){
           var user = req.session.loggedUser;
//Check url id is logged user or not

           if(idFromUrl.id == user.id){

               profileModel.get(user,function(result){
                   profileModel.getPostById(user, function(result2){
                       profileModel.getFollowerCount(user, function(result3){
                           profileModel.getFollowingCount(user, function(result4){
                               profileModel.postCount(user, function(result5){
                                   profileModel.getFollowerList(user, function(result6){
                                       profileModel.getFollowingList(user, function(result7){
                                           blockModel.getAll(user, function(result8){
                                               res.render('profile/profile', {
                                                   user: result,
                                                   userPhoto: result2,
                                                   followers:result3,
                                                   following:result4,
                                                   postCount: result5,
                                                   followersList:result6,
                                                   followingList:result7,
                                                   blockList:result8
                                               });
                                           });
                                       });
                                   });
                               });
                           });
                       });
                   });
               });
           }else{

               blockModel.getfromUser(user,idFromUrl,function(result){


                   //Check if Block
                   blockModel.getfromBlock(user,idFromUrl,function(result2){
                       if(result[0]  || result2[0] ){
                           console.log("block");
                           res.render('profile/block',{
                               user : req.session.loggedUser
                           });


                       }else{
                           //Not Block
                           console.log("not block");
                           friendsModel.get(user, idFromUrl, function (result) {

                               //friend exist
                               if(result){


                                   profileModel.get(idFromUrl,function(result){
                                       result.friendUrl = 'remove/'+idFromUrl.id; //remove friend url
                                       result.followORfollowing = 'Following';
                                       result.class = '';
                                       profileModel.getPostById(idFromUrl, function(result2){
                                           friendsModel.getFollowerlist(idFromUrl, function(result3){
                                               friendsModel.getFollowinglist(idFromUrl, function(result4){
                                                   friendsModel.postCount(idFromUrl, function(result5){
                                                       profileModel.getFollowerList(idFromUrl, function(result6){
                                                           profileModel.getFollowingList(idFromUrl, function(result7){
                                                               res.render('profile/otherProfile', {
                                                                   loggedUser:req.session.loggedUser,
                                                                   user: result,
                                                                   userPhoto: result2,
                                                                   followers:result3,
                                                                   following:result4,
                                                                   postCount: result5,
                                                                   followersList:result6,
                                                                   followingList:result7
                                                               });
                                                           });
                                                       });
                                                   });
                                               });
                                           });
                                       });
                                   });

                               }else{

                                   profileModel.get(idFromUrl,function(result){
                                       result.friendUrl = 'add/'+idFromUrl.id; //add friend url
                                       result.followORfollowing = 'Follow';
                                       result.class = 'is-info';
                                       profileModel.getPostById(idFromUrl, function(result2){
                                           friendsModel.getFollowerlist(idFromUrl, function(result3){
                                               friendsModel.getFollowinglist(idFromUrl, function(result4){
                                                   friendsModel.postCount(idFromUrl, function(result5){
                                                       profileModel.getFollowerList(idFromUrl, function(result6){
                                                           profileModel.getFollowingList(idFromUrl, function(result7){

                                                               res.render('profile/otherProfile', {
                                                                   loggedUser:req.session.loggedUser,
                                                                   user: result,
                                                                   userPhoto: result2,
                                                                   followers:result3,
                                                                   following:result4,
                                                                   postCount: result5,
                                                                   followersList:result6,
                                                                   followingList:result7
                                                               });
                                                           });
                                                       });
                                                   });
                                               });
                                           });
                                       });
                                   });

                               }

                           });//Not Block End


                       }
                   });

               });
           }

       }
       else{
           res.redirect('/login');
       }
   }else {
       res.render('profile/block',{
           user : req.session.loggedUser
       });
   }
});



});
//Profile Picture Change Post----new 87-142
router.post('/profile/:id', function(req, res) {

        var user = req.session.loggedUser;
        var sessionID= user.id;
        var name= user.name;
        var temp=name.toString().split(" ");
        var fileName= temp[0]+"_"+user.id+"_pro_pic";

var filePath = 'public/assets/images/profile/'+fileName+'.jpg';

fs.exists('filePath', function(exists) {
  if(exists) {
    fs.unlink('./www/index.html');
  }
});
        // file move

    if (!req.files)

        return res.status(400).send('No files were uploaded.');
        var postImage = req.files.postImage;
         postImage.mv('public/assets/images/profile/'+fileName+'.jpg', function(err) {

        if (err)
            return res.status(500).send(err);

    });

         // dbupdate

    var picture = {
       
       
        userId: sessionID,
        imagePath: '/assets/images/profile/'+fileName+'.jpg',
    };

    profileModel.updateProfilePicture(picture, function(result0){
        console.log("propic change");
        res.redirect('/profile/'+sessionID);
 //        profileModel.get(user,function(result){
 //                profileModel.getPostById(user, function(result2){
 //                    profileModel.getFollowerCount(user, function(result3){
 //                        profileModel.getFollowingCount(user, function(result4){
 //                         profileModel.postCount(user, function(result5){
 //                         profileModel.getFollowerList(user, function(result6){
 //                        profileModel.getFollowingList(user, function(result7){
 //                            blockModel.getAll(user, function(result8){
 //                    res.render('profile/profile', {
 //                        user: result,
 //                        userPhoto: result2,
 //                        followers:result3,
 //                        following:result4,
 //                        postCount: result5,
 //                        followersList:result6,
 //                         followingList:result7,
 //                        blockList:result8
 //                    });
 //                        });
 //                    });
 //                        });
 //                    });
 //                 });
 //          });
 //        });
 // });
    });

});








module.exports = router;