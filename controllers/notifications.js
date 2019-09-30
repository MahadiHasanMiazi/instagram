var express = require('express');
var router = express.Router();

var notificationModel = require.main.require('./models/notifications');

router.get('/notification/showNotification', function (req, res){
    notificationModel.showNotifications(function (result) {
        res.send(result);
    });
});

router.get('/notification/notificationCount:user_id', function (req, res){
    notificationModel.showNotifications(function (result) {
        res.send(result);
    });
});


router.get('/notification/countNotification:user_id', function (req, res){
    notificationModel.countNotifications(function (result) {
        res.send(result);
    });
});



router.post('/notification/unreadNotifications:noti_Id', function (req, res){
    var unReadNoti =req.params.noti_Id;

    notificationModel.makeUnreadAsRead(unReadNoti,function (result) {
        res.send(result);
    });
});






router.get('/notification/fromNotiToPost/:post_id', function (req, res){
    var post_id=req.params.post_id;

    var destinationSection="#postIdToReachFromNoti"+post_id;

    res.redirect('/home/'+destinationSection);
});






module.exports = router;