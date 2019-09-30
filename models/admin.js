var db = require('./db');
module.exports = {
    verifyAdmin: function(admin, callbackFromController){
        var sql = "SELECT * FROM admin WHERE email=? AND password=?";

        db.execute(sql, [admin.email, admin.password], function (result){

            if(result.length == 1)
            {
                callbackFromController(true,result);
            }
            else
            {
                callbackFromController(false);
            }
        });

        //connection.end();
    },
    registerAdmin: function(admin, callbackFromController){
        var sql = "INSERT INTO admin VALUES (null, ?, ?, ?, ? ,' ')";
        db.execute(sql, [admin.name, admin.email, admin.password,admin.image], function(result){
            callbackFromController(result);
        });

    },

     getAdminInfoById: function(admin, callbackFromController){
        var sql = "SELECT * FROM admin WHERE id=?";
        db.execute(sql, [admin.id], function(result){
            callbackFromController(result);
        });

    },

    updateAdminProfile: function(admin, callbackFromController) {
        var sql = "UPDATE admin SET name=? , email=? , about=? WHERE id=?";
        db.execute(sql, [admin.name,  admin.email, admin.about,admin.id], function(result){
            callbackFromController(result);
        });
    },

    updatePaswwrod: function(admin, callbackFromController) {
       
        var sql = "UPDATE admin SET password=? WHERE id=?";
        db.execute(sql, [admin.newPass, admin.id], function(result){
            callbackFromController(result);
        });
    },

     get: function(admin, callbackFromController){
        var sql = "SELECT * FROM admin WHERE id=?";
        db.execute(sql, [admin.id], function(result){
            callbackFromController(result[0]);
        });
    },

    getAllUser:function(callbackFromController){
        var sql="SELECT * FROM users";
        db.execute(sql,null,function(result){
            callbackFromController(result);
        });
    },

    getAllAdmin:function(callbackFromController){
        var sql="SELECT * FROM admin";
        db.execute(sql,null,function(result){
            callbackFromController(result);
        });
    }

};