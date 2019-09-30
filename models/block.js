var db = require('./db');
module.exports = {
    insert: function(user, friendId, callbackFromController){
        
var sql = "SELECT * FROM users WHERE id=?";
        db.execute(sql, [friendId.id], function(result){
            var sql2 = "INSERT INTO block VALUES (null,?,?,?,?)";
        db.execute(sql2, [user.id, friendId.id,result[0].name,result[0].imagePath],
            function(result2){
        var sql3 = "DELETE FROM friends WHERE user_id=? AND friend_id=?";
        db.execute(sql3, [user.id, friendId.id], function(result){
             var sql4 = "DELETE FROM friends WHERE user_id=? AND friend_id=?";
        db.execute(sql4, [friendId.id, user.id], function(result){
        });
        });
       
            callbackFromController(result2);
        });
        });


       
        
    },
    
    delete: function(user, friend, callbackFromController) {
        var sql = "DELETE FROM block WHERE user_id=? AND block_id=?";
        db.execute(sql, [user.id, friend.id], function(result){
            callbackFromController(result);
        });
    },
    getfromUser: function(user, friend, callbackFromController) {
        var sql = "SELECT * FROM block WHERE user_id=? AND block_id=?";
        db.execute(sql, [user.id, friend.id], function(result){
            console.log(result);
            callbackFromController(result);
        });


    },
getfromBlock: function(user, friend, callbackFromController) {
        var sql = "SELECT * FROM block WHERE user_id=? AND block_id=?";
        db.execute(sql, [friend.id, user.id], function(result){
            console.log(result);
            callbackFromController(result);
        });


    },

getAll: function(user, callbackFromController) {
        var sql = "SELECT * FROM block WHERE user_id=?";
        db.execute(sql, [user.id], function(result){
           // console.log(result);
            callbackFromController(result);
        });
    },


       

};