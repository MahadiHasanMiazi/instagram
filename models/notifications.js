var db = require('./db');

module.exports = {

    insertNotification: function(notification, callbackFromController){
        var sql = "INSERT INTO notifications VALUES (null, ?, ?, ?, ?,?,?)";
        db.execute(sql, [notification.notified_by,notification.post_id,notification.subject,notification.info,notification.time,notification.noti_status], function(result){
            callbackFromController(result);
        });
    },

    insertReactNotification: function(notification, callbackFromController){
        var sql1="SELECT * FROM notifications WHERE notified_by=? AND post_id=? AND subject=?";
        var sql2 = "INSERT INTO notifications VALUES (null, ?, ?, ?, ?, ?,?)";
     db.execute(sql1, [notification.notified_by,notification.post_id,notification.subject], function(result1){

            if (result1.length==0) {
                db.execute(sql2, [notification.notified_by, notification.post_id, notification.subject, notification.info, notification.time, notification.noti_status], function (result2) {
                    callbackFromController(result2);
                });
            }else {
                callbackFromController(result1);
            }

        });

    },

    showNotifications: function(callbackFromController){
        var sql="select notifications.id, notifications.notified_by, notifications.post_id, notifications.subject, notifications.info, notifications.time, notifications.status,(select users.name from users where notifications.notified_by = users.id) as name ,(select users.imagePath from users where notifications.notified_by = users.id) as image,(select posts.user_id from posts where notifications.post_id = posts.post_id) as user_id from notifications  ORDER by notifications.id DESC";
        db.execute(sql, null, function(result){
            callbackFromController(result);
        });
    },

    countNotifications: function(callbackFromController){
        var sql="select notifications.notified_by, notifications.post_id, notifications.subject, notifications.info, notifications.time, notifications.status,(select users.name from users where notifications.notified_by = users.id) as name ,(select users.imagePath from users where notifications.notified_by = users.id) as image,(select posts.user_id from posts where notifications.post_id = posts.post_id) as user_id from notifications where notifications.status=0 ORDER by notifications.id DESC";
        db.execute(sql, null, function(result){
            callbackFromController(result);
        });
    },

    makeUnreadAsRead: function(unReadNoti,callbackFromController){

            var sql= "UPDATE notifications SET status=1 WHERE id=?";

            db.execute(sql, [unReadNoti] , function(result){
                callbackFromController(result);
            });


    }

};