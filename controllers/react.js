var express = require('express');
var router = express.Router();

var reactModel = require.main.require('./models/react');
var notificationModel = require.main.require('./models/notifications');



router.get('/react/:post_id', function(req, res){

    var react ={
        user_id: req.session.loggedUser.id,
        post_id: req.params.post_id
    }


    var notification ={
        notified_by : req.session.loggedUser.id,
        post_id : req.params.post_id,
        subject : "liked  your post",
        info: "",
        time: new Date().toLocaleString(),
        noti_status: 0
    };


    notificationModel.insertReactNotification(notification,function (result1) {
        reactModel.giveReact(react,function (result2) {
            res.redirect('/home');
        });

    });


});


module.exports = router;