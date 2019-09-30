var db = require('./db');
module.exports = {
    getAll: function(callbackFromController) {
        var sql = "SELECT * FROM users";
        db.execute(sql, null ,function(result){
            callbackFromController(result);
        });
    },
    get: function(user, callbackFromController){
        var sql = "SELECT * FROM users WHERE id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result[0]);
        });
    },
    insert: function(user, callbackFromController){
        var sql = "INSERT INTO users VALUES (null, ?, ?, ?)";
        db.execute(sql, [user.name, user.email, user.password], function(result){
            callbackFromController(result);
        });
    },
    //updated method-----update user information
    update: function(user, callbackFromController) {
        //update user table
        var sql = "UPDATE users SET name=?, email=?,about=? WHERE id=?";
        db.execute(sql, [user.name, user.email,user.about, user.id], function(result){
            //update friend table
            var sql2 = "UPDATE friends SET userName=? WHERE user_id=?";
            db.execute(sql2, [user.name, user.id], function(result2){
                var sql3 = "UPDATE friends SET friendname=? WHERE friend_id=?";
                db.execute(sql3, [user.name, user.id], function(result3){
                    //update block table
                    var sql4 = "UPDATE block SET block_name=? WHERE block_id=?";
                    db.execute(sql4, [user.name,user.id], function(result4){

                        callbackFromController(result);
                    });
                });
            });


        });

    },
//New method
    getPostById: function(user, callbackFromController) {
        var sql = "SELECT * FROM posts WHERE user_id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result);
        });
    },
    //New method
    updatePaswwrod: function(user, callbackFromController) {
       
        var sql = "UPDATE users SET password=? WHERE id=?";
        db.execute(sql, [user.newPass, user.id], function(result){
            callbackFromController(result);
        });
    },
    //New method----- update profile picture
    updateProfilePicture: function(picture, callbackFromController) {

//Update friend table
        var sql2 = "UPDATE friends SET userImage=? WHERE user_id=?";
        db.execute(sql2, [picture.imagePath,  picture.userId], function(result2){
            var sql3 = "UPDATE friends SET friendImage=? WHERE user_id=?";
            db.execute(sql3, [picture.imagePath,  picture.userId], function(result3){
//update block table
                var sql4 = "UPDATE block SET block_image=? WHERE user_id=?";
                db.execute(sql4, [picture.imagePath,  picture.userId], function(result4){
//update user table
                    var sql = "UPDATE users SET imagePath=? WHERE id=?";
                    db.execute(sql, [picture.imagePath,  picture.userId], function(result){

                        callbackFromController(result);
                    });
                });
            });
        });


    },
//New method-----count Followers
     getFollowerCount: function(user, callbackFromController) {
        
       var sql = "SELECT friend_id, count(*) as count FROM friends WHERE friend_id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result);
        });
    },
   //New method----List of Followers
     getFollowerList: function(user, callbackFromController) {
        
       var sql = "SELECT * FROM friends WHERE friend_id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result);
        });
    },
   

    //New method-----Count Following person
     getFollowingCount: function(user, callbackFromController) {
        var sql = "SELECT user_id, count(*) as count FROM friends WHERE user_id=?";
        db.execute(sql, [user.id], function(result){
            callbackFromController(result);
        });
    },
    //New method----List of Following
     getFollowingList: function(user, callbackFromController) {
        var sql = "SELECT * FROM friends WHERE user_id=?";
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
    }

};