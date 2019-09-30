var db = require('./db');
module.exports = {
    registerUser: function(user, callbackFromController){
        var sql = "INSERT INTO users VALUES (null, ?, ?, ?,' ',' ', ?)";
        db.execute(sql, [user.name, user.email, user.password,user.status], function(result){
            callbackFromController(result);
        });

    }
};