var db = require('./db');

module.exports = {

    insert: function(post, callbackFromController){
        var sql = "INSERT INTO posts VALUES (null, ?, ?, ?, ?)";
        db.execute(sql, [post.userId, post.caption, post.image, post.postTime], function(result){
            callbackFromController(result);
        });
    },

    getAll: function(user, callbackFromController) {
        // var sql = "SELECT * FROM posts WHERE user_id=? ORDER BY post_id DESC";
        var sql = "SELECT * FROM posts WHERE user_id=? or user_id IN (SELECT friend_id FROM friends WHERE user_id=?) order by posts.post_id DESC";

        db.execute(sql, [user.id,user.id] ,function(result){
            callbackFromController(result);
        });
    },
    updatePost: function(editPost, callbackFromController) {
        var sql = "UPDATE posts SET caption=?, upload_time=? WHERE post_id=?";
        db.execute(sql, [editPost.post_caption,  editPost.post_time, editPost.post_id], function(result){
            callbackFromController(result);
        });
    },
    deletePost: function(postDelete, callbackFromController) {
        var sql = "DELETE FROM posts WHERE post_id=?";
        db.execute(sql, [postDelete.post_id], function(result){
            callbackFromController(result);
        });
    },
    getAllComment: function(callbackFromController) {
        var sql =  "SELECT * FROM users INNER JOIN comments ON users.id=comments.user_id order by comments.id ASC";
        db.execute(sql, null, function(result){
            callbackFromController(result);
        });
    },
    getAllUsers: function(callbackFromController) {
        var sql =  "SELECT * FROM users";
        db.execute(sql, null, function(result){
            callbackFromController(result);
        });
    },

};