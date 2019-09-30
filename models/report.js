var db = require('./db');
module.exports = {
    getAllFromReport: function(callbackFromController){
        var sql="select DISTINCT report.posted_by post_by,(SELECT COUNT(*) FROM report WHERE report.posted_by=post_by) as totalReport,(select users.name from users where report.posted_by = users.id) as name,  (select users.imagePath from users where report.posted_by = users.id) as image, (select users.status from users where report.posted_by = users.id) as status from report order by totalReport DESC";
        db.execute(sql, null, function (result){
                callbackFromController(result);
        });
    },

    reportDetails: function(reportedUserId,callbackFromController){
        var sql="select report.posted_by, (select users.name from users where report.posted_by = users.id) as postedUserName,(select users.imagePath from users where report.posted_by = users.id) as postedUserImage, report.post_id, (select posts.caption from posts where report.post_id = posts.post_id) as postCaption, (select posts.image from posts where report.post_id = posts.post_id) as postImage, report.message as reportMessage, report.reported_by, (select users.name from users where report.reported_by = users.id) as postReportedUserName, (select users.imagePath from users where report.reported_by = users.id) as postReporterImage, report.time from report WHERE report.posted_by=?";
        db.execute(sql, [reportedUserId], function (result){
            callbackFromController(result);
        });
    },

    enableDisableUser: function(user_id,callbackFromController){
        var sql="UPDATE users SET status = CASE status WHEN 0 THEN 1 WHEN 1 THEN 0 ELSE status END where id=?";
        db.execute(sql, [user_id], function (result){
            callbackFromController(result);
        });
    },




};