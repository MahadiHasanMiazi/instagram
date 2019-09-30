var db = require('./db');
module.exports = {
    verifyUser: function(user, callbackFromController){
        var sql = "SELECT * FROM users WHERE email=? AND password=?";

        db.execute(sql, [user.email, user.password], function (result){
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
    }
};