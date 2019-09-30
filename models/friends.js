var db = require('./db');
module.exports = {
    getAll: function(user, callbackFromController) {
        var sql = "SELECT * FROM `friends` INNER JOIN users ON friends.friend_id = users.id WHERE user_id=?";
        db.execute(sql, [user.id] ,function(result){
            callbackFromController(result);
        });
    },

    updateOnlineStatus: function(id, status) {
        var sql = "UPDATE users SET online=? WHERE id=?";
        db.execute(sql, [status, id], function(result){

        });
    },

    getDetails: function(friendId, callbackFromController){
        var sql = "SELECT * FROM users WHERE id=?";
        db.execute(sql, [friendId.id], function(result){
            
            callbackFromController(result[0]);

        });
    },
    get: function(user, friend, callbackFromController){
        var sql = "SELECT * FROM friends WHERE user_id=? AND friend_id=?";
        db.execute(sql, [user.id, friend.id], function(result){
            callbackFromController(result[0]);
        });
    },
    insert: function(user, friendId, callbackFromController){
        var sql = "SELECT * FROM users WHERE id=?";
        db.execute(sql, [friendId.id], function(result){
        var sql = "INSERT INTO friends VALUES (null,?,?,null, null,null,null,?,?,?,?)";
        db.execute(sql, [user.id, friendId.id,user.name,result[0].name,user.imagePath,
            result[0].imagePath], function(result2){
            callbackFromController(result2);
        });
        });
    },

    delete: function(user, friend, callbackFromController) {
        var sql = "DELETE FROM friends WHERE user_id=? AND friend_id=?";
        db.execute(sql, [user.id, friend.id], function(result){
            callbackFromController(result);
        });
    },
       getFollowerlist: function(user, callbackFromController) {
        
       var sql = "SELECT friend_id, count(*) as count FROM friends WHERE friend_id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result);
        });
    },
    //New method
      updateProfilePicture: function(picture, callbackFromController) {
        var sql = "UPDATE users SET imagePath=? WHERE id=?";
        db.execute(sql, [picture.imagePath,  picture.userId], function(result){
            callbackFromController(result);
        });
    },
    //New method
     getFollowinglist: function(user, callbackFromController) {
        var sql = "SELECT user_id, count(*) as count FROM friends WHERE user_id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result);
        });
    },
    //New method
postCount: function(user, callbackFromController) {
        var sql = "SELECT post_id, count(*) as count FROM posts WHERE user_id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result);
        });
    },
    setMiniText: function(msg, from, to, datetime, callbackFromController){
        var sql = "UPDATE `friends` SET `miniText`=?, `senderId`=?, `miniTextTime`=? WHERE user_id=? AND friend_id=?";
        db.execute(sql, [msg, from, datetime, from, to ], function (result){
            callbackFromController(result);
        });
    },
    setMiniText2: function(msg, to, from, datetime, callbackFromController) {
        var sql = "UPDATE `friends` SET `miniText`=?, `senderId`=?, `miniTextTime`=?, `newMessage`='true' WHERE user_id=? AND friend_id=?";
        db.execute(sql, [msg, from, datetime, to, from], function (result) {
            callbackFromController(result);
        });
    },
    resetNewMessage: function(user, friend, callbackFromController) {
        var sql = "UPDATE `friends` SET `newMessage`='' WHERE user_id=? AND friend_id=?";
        db.execute(sql, [user.id, friend.id], function (result) {
            callbackFromController(result);
        });
    }

};