var db = require('./db');
module.exports = {
    giveReact: function(react,callbackFromController) {

        var sql1="SELECT * FROM react WHERE user_id=? AND post_id=?";

        var sql2="DELETE  FROM react WHERE user_id=? AND post_id=?";

        var sql3="INSERT INTO react VALUES (null, ?, ?)";

        db.execute(sql1, [react.user_id,react.post_id], function(result){

            if (result.length==1){

                db.execute(sql2, [react.user_id,react.post_id], function(result3){
                    callbackFromController(result);
                });

            }else{
                db.execute(sql3, [react.user_id,react.post_id], function(result2){
                    callbackFromController(result);
                });

            }
        });
    },

    getReactsByUserId: function(user, callbackFromController) {
        var sql = "SELECT * FROM react WHERE user_id=?";
        db.execute(sql, [user.id] ,function(result){
            callbackFromController(result);
        });
    },

    getAllReact: function(callbackFromController) {
        var sql = "SELECT * FROM react";
        db.execute(sql, null ,function(result){
            callbackFromController(result);
        });
    }

};