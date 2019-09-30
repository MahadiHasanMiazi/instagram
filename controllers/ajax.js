var express = require('express');
var router = express.Router();
var fs = require('fs');

var ajaxModel = require.main.require('./models/ajaxModel');
var notificationModel = require.main.require('./models/notifications');


router.post('/ajax/commentSubmit',function (req,res) {
    var comment ={
        user_id : req.session.loggedUser.id,
        post_id : req.body.post_id,
        comment : req.body.comment,
        comment_time: new Date().toLocaleString()
    };


    var notification ={
        notified_by : req.session.loggedUser.id,
        post_id : req.body.post_id,
        subject : "commented on your post",
        info : req.body.comment,
        time: new Date().toLocaleString(),
        noti_status: 0
    };

    notificationModel.insertNotification(notification,function (result1) {
        ajaxModel.insertComment(comment,function (result2) {
            res.send(result2);
        });
    });

});


router.get('/ajax/searchByname/:username', function(req, res){

    var username ={
        name: req.params.username
    };

   console.log(username.name);
    ajaxModel.getUserByName(username,function (result) {
        res.send(result);
    });

});

router.get('/ajax/totalLikeDetails/:post_id', function(req, res){

    var post ={
        post_id: req.params.post_id
    };
    ajaxModel.getLikesByPostId(post,function (result) {
        res.send(result);
    });

});

router.post('/ajax/reportSubmit',function (req,res) {
    var report ={
        reported_by : req.session.loggedUser.id,
        posted_by : req.body.posted_by,
        post_id : req.body.post_id,
        message : req.body.postReportDetails,
        time: new Date().toLocaleString()
    };

    ajaxModel.reportSubmit(report,function (result) {
        res.send("Nothing :)");
    });
});

router.get('/ajax/getCommentByCommentId/:comment_id',function (req,res) {
    var commentEdit ={
        comment_id : req.params.comment_id
    };

    ajaxModel.getCommentByCommentId(commentEdit,function (result) {
        res.send(result);
    });
});

router.post('/ajax/submitEditedComment/:comment_id',function (req,res) {

    var editedComment ={
        comment_id : req.params.comment_id,
        user_id: req.session.loggedUser.id,
        comment: req.body.editedComment,
        time: new Date().toLocaleString()
    };


    ajaxModel.submitEditedComment(editedComment,function (result) {
        res.send(result);
    });
});


router.get('/ajax/getUserAndCommentDetailsBycommentId/:com_id',function (req,res) {
    var infoAboutUserComment ={
        comment_id : req.params.com_id
    };
    ajaxModel.getUserAndCommentDetailsBycommentId(infoAboutUserComment,function (result) {
        res.send(result);
    });
});

router.get('/ajax/getUserAndCommentDetailsBycommentId/:com_id',function (req,res) {
    var infoAboutUserComment ={
        comment_id : req.params.com_id
    };
    ajaxModel.getUserAndCommentDetailsBycommentId(infoAboutUserComment,function (result) {
        res.send(result);
    });
});

router.get('/ajax/getLastInsertedCommentAndUserDetails',function (req,res) {



    ajaxModel.getLastInsertedCommentAndUserDetails(function (result) {
        res.send(result);
    });
});

router.get('/ajax/deleteComment/:comment_id',function (req,res) {

    var deleteComment ={
        comment_id : req.params.comment_id
    };

    ajaxModel.deleteCommentById(deleteComment,function (result) {
        res.send(result);
    });
});


router.get('/ajax/getUserByMail/:mail', function(req, res){

    var user ={
        email: req.params.mail
    };

    ajaxModel.getUserByMail(user,function (result) {
       res.send(result[0]);
    });

});

router.get('/ajax/getOnlineStatus/:id', function (req, res) {
    var idFromUrl = {
        id: req.params.id
    };

    ajaxModel.getOnlineStatus(idFromUrl.id, function (result) {
        res.send(result.online);
    });
});






module.exports = router;