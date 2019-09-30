var db = require('./db');

module.exports = {
    insertComment: function(comment, callbackFromController) {
        var sql =  "INSERT INTO comments VALUES (null, ?, ?, ?, ?)";
        db.execute(sql, [comment.user_id,comment.post_id,comment.comment,comment.comment_time], function(result){
            callbackFromController(result);
        });
    },

    getUserByName: function(username, callbackFromController) {
        var sql = "SELECT * FROM users WHERE name LIKE"+ " '%"+username.name+"%' ";
        db.execute(sql, null ,function(result){
            callbackFromController(result);
    });
    },

    getLikesByPostId: function(post, callbackFromController) {
        var sql = "SELECT * FROM users INNER JOIN react ON users.id=react.user_id WHERE  react.post_id=?";
        db.execute(sql, [post.post_id] ,function(result){
            callbackFromController(result);
        });
    },
    reportSubmit: function (report, callbackFromController) {
        var sql= "INSERT INTO report VALUES (null, ?, ?, ?, ?,?)";
        db.execute(sql, [report.reported_by,report.posted_by,report.post_id,report.message,report.time] ,function(result){
            callbackFromController(result);
        });
    },

    getCommentByCommentId: function (commentEdit, callbackFromController) {
        var sql= "SELECT * FROM comments where id=?";
        db.execute(sql, [commentEdit.comment_id] ,function(result){
            callbackFromController(result);
        });
    },

    submitEditedComment: function (editedComment, callbackFromController) {
        var sql = "UPDATE comments SET comment=?, time=? WHERE id=?";
        db.execute(sql, [editedComment.comment,editedComment.time,editedComment.comment_id] ,function(result){
            callbackFromController(result);
        });
    },

    getUserAndCommentDetailsBycommentId: function (infoAboutUserComment, callbackFromController) {
        var sql = "SELECT * FROM users INNER JOIN comments ON users.id=comments.user_id WHERE comments.id=?";
        db.execute(sql, [infoAboutUserComment.comment_id] ,function(result){
            callbackFromController(result);
        });
    },
    getLastInsertedCommentAndUserDetails: function (callbackFromController) {
        var sql = " SELECT * FROM users INNER JOIN comments ON users.id=comments.user_id WHERE comments.id= (select id from comments order by id desc limit 1)";
        db.execute(sql, null ,function(result){
            callbackFromController(result);
        });
    },

    deleteCommentById: function (deleteComment,callbackFromController) {
        var sql = "DELETE  from comments WHERE id=?";
        db.execute(sql,[deleteComment.comment_id] ,function(result){
            callbackFromController(result);
        });
    },

    getUserByMail: function(user, callbackFromController) {
        var sql = "SELECT * FROM users WHERE email=?";
        db.execute(sql, [user.email] ,function(result){
            callbackFromController(result);
        });
    },

    getOnlineStatus: function (id, callbackFromController) {
        var sql = "SELECT online FROM users WHERE id=?";
        db.execute(sql, [id], function(result){
            console.log(result);
            callbackFromController(result[0]);
        });
    }


    /*
     SELECT * FROM users INNER JOIN comments ON users.id=comments.user_id WHERE comments.id= (select id from comments order by id desc limit 1)
    */
};